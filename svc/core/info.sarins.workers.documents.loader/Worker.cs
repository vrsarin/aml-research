using Confluent.Kafka;
using info.sarins.services.shared;
using info.sarins.services.shared.data;
using info.sarins.services.shared.queues.models;
using info.sarins.services.shared.storage.models;
using Newtonsoft.Json;
using Confluent.SchemaRegistry;
using Confluent.SchemaRegistry.Serdes;


namespace info.sarins.workers.documents.loader
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IVaultDataService vaultService;
        private readonly ConsumerConfig kafkaConsumerConfig;
        private readonly string[]? kafkaConsumerTopics;
        private readonly ProducerConfig kafkaProducerConfig;
        private readonly string kafkaProducerTopic;

        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
            _logger = logger;

            this.vaultService = new VaultDataService(default, new VaultDBContext(configuration));

            kafkaConsumerConfig = new ConsumerConfig()
            {
                BootstrapServers = configuration.GetValue<string>("kafka:hosts"),
                GroupId = "document-loaders",
                AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false
            };

            kafkaProducerConfig = new ProducerConfig
            {
                BootstrapServers = configuration.GetValue<string>("kafka:hosts")

            };

            kafkaConsumerTopics = configuration.GetValue<string>("kafka:consumer:topics")?.Split(",");
            kafkaProducerTopic = configuration.GetValue<string>("kafka:producer:topics") ?? "";
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var jsonSerializerConfig = new JsonSerializerConfig
            {
                BufferBytes = 100
            };

            var schemaRegistryConfig = new SchemaRegistryConfig
            {
                Url = "http://host.docker.internal:8081",
            };

            using var consumer = new ConsumerBuilder<Ignore, string>(kafkaConsumerConfig).Build();
            using var schemaRegistry = new CachedSchemaRegistryClient(schemaRegistryConfig);
            using var producer = new ProducerBuilder<string, ParserKafkaMessage>(kafkaProducerConfig).SetValueSerializer(new JsonSerializer<ParserKafkaMessage>(schemaRegistry, jsonSerializerConfig)).Build();

            consumer.Subscribe(kafkaConsumerTopics);
            _logger.LogInformation("Starting Kafka Consumer");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var consumeResult = consumer.Consume(200);
                    if (consumeResult == null || consumeResult.IsPartitionEOF)
                    {
                        _logger.LogInformation("waiting...");
                        continue;
                    }
                    var message = consumeResult.Message;
                    var eventDetails = JsonConvert.DeserializeObject<MinioEventDetails>(message.Value);
                    /* Update Vault Information
                     * Decision: Should we call Vault or Simply update DB? currently updating DB directly for speed of implementation.                    
                     */
                    foreach (var item in eventDetails?.Records ?? new List<MinioRecord>())
                    {
                        _logger.LogInformation($"Recieved message for filename '{item.s3.Object.key}' from bucket '{item.s3.Bucket.Name}'.");
                        var vault = await vaultService.GetVaultAsync(item.s3.Bucket.Name);
                        if (vault != null)
                        {
                            if (vault.Contents == null)
                                vault.Contents = new List<services.shared.http.requests.models.Content>();

                            // Currently only ingest added files deleted files should be ignored.
                            if (vault.Contents.Any(c => c.FileName.Equals(item.s3.Object.key)))
                            {
                                var content = vault.Contents?.Where(c => c.FileName.Equals(item.s3.Object.key)).First();
                                content.Stage = StageTypes.Uploaded;
                                await vaultService.UpdateVault(vault.VaultId, vault);
                                _logger.LogInformation($"Vault ({vault.VaultId}) has uploaded content {content.Description}");
                            }
                            else
                            {
                                vault.Contents.Add(new services.shared.http.requests.models.Content()
                                {
                                    ContentId = Guid.NewGuid().ToString(),
                                    FileName = item.s3.Object.key,
                                    Source = SourceType.File,
                                    ContentType = item.s3.Object.contentType,
                                    Stage = StageTypes.Uploaded,

                                });
                                await vaultService.UpdateVault(vault.VaultId, vault);
                                _logger.LogInformation($"Updated content information for vault");
                            }
                        }

                        // Simple extraction from here on
                        var producerMessage = new ParserKafkaMessage
                        {
                            BucketName = item.s3.Bucket.Name,
                            FileName = item.s3.Object.key,
                            ContentType = item.s3.Object.contentType
                        };
                        try
                        {
                            if (producerMessage.IsIngestionReady)
                            {
                                // Sending message for parser to parse file
                                await producer.ProduceAsync("ai", new Message<string, ParserKafkaMessage>
                                {
                                    Key = producerMessage.BucketName,
                                    Value = producerMessage,
                                });
                            }
                            //else
                            //{
                            //    await producer.ProduceAsync(kafkaProducerTopic, new Message<string, ParserKafkaMessage>
                            //    {
                            //        Key = producerMessage.BucketName,
                            //        Value = producerMessage,
                            //    });
                            //}
                        }
                        catch (Exception ex)
                        {
                            _logger.LogError(new EventId(), ex, ex.Message);
                           
                        }


                        _logger.LogInformation($"Sent message to parsers");
                    }
                    consumer.Commit(consumeResult);
                }
                catch (KafkaException e)
                {
                    Console.WriteLine($"Commit error: {e.Error.Reason}");
                }
            }
            consumer.Close();
        }
    }
}
