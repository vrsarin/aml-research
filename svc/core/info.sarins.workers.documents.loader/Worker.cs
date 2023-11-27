using Confluent.Kafka;
using info.sarins.services.shared.data;
using info.sarins.services.shared.storage.models;
using Newtonsoft.Json;

namespace info.sarins.workers.documents.loader
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IVaultDataService vaultService;
        private readonly ConsumerConfig kafkaConfig;
        private readonly string[]? kafkaTopics;

        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
            _logger = logger;
            this.vaultService = new VaultDataService(default, new VaultDBContext(configuration));
            kafkaConfig = new ConsumerConfig()
            {
                BootstrapServers = configuration.GetValue<string>("kafka:hosts"),
                GroupId = "document-loaders",
                AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false
            };
            kafkaTopics = configuration.GetValue<string>("kafka:topics")?.Split(",");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var consumer = new ConsumerBuilder<Ignore, string>(kafkaConfig).Build();

            consumer.Subscribe(kafkaTopics);
            _logger.LogInformation("Starting Kafka Consumer");
            while (!stoppingToken.IsCancellationRequested)
            {
                try
                {
                    var consumeResult = consumer.Consume(stoppingToken);
                    var message = consumeResult.Message;
                    _logger.LogInformation($"Recieved message with key={message.Key}");
                    var eventDetails = JsonConvert.DeserializeObject<MinioEventDetails>(message.Value);
                    /* Update Vault Information
                     * Decision: Should we call Vault or Simply update DB? currently updating DB directly for speed of implementation.                    
                     */
                    foreach (var item in eventDetails?.Records ?? new List<MinioRecord>())
                    {
                        var vault = await vaultService.GetVaultAsync(item.s3.Bucket.Name);
                        if (vault != null)
                        {
                            var content = vault.Contents?.Where(c => c.ContentId.Equals(item.s3.Object.key)).First();
                            // Currently only ingest added files deleted files should be ignored.
                            if (content != null)
                            {
                                content.Stage = services.shared.StageTypes.Uploaded;
                                await vaultService.UpdateVault(vault.VaultId, vault);
                                _logger.LogInformation($"Vault ({vault.VaultId}) has uploaded content {content.Description}");
                            }
                            else
                            {
                                if (vault.Contents == null)
                                    vault.Contents = new List<services.shared.http.requests.models.Content>();
                                vault.Contents.Add(new services.shared.http.requests.models.Content()
                                {
                                    ContentId = Guid.NewGuid().ToString(),
                                    FileName = item.s3.Object.key,
                                    Source = services.shared.SourceType.File,
                                    ContentType = item.s3.Object.contentType,
                                    Stage = services.shared.StageTypes.Uploaded,

                                });
                                await vaultService.UpdateVault(vault.VaultId, vault);
                                _logger.LogInformation($"Updated content information for vault");
                            }
                        }
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
