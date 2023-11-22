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

        public Worker(ILogger<Worker> logger, IConfiguration configuration, IVaultDataService vaultService)
        {
            _logger = logger;
            this.vaultService = vaultService;
            kafkaConfig = new ConsumerConfig()
            {
                BootstrapServers = configuration.GetValue<string>("kafka:hosts"),
                GroupId = "documentloader",
                AutoOffsetReset = AutoOffsetReset.Earliest,
                EnableAutoCommit = false
            };
            kafkaTopics = configuration.GetValue<string>("kafka:topics")?.Split(",");
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            using var consumer = new ConsumerBuilder<Ignore, string>(kafkaConfig).Build();

            consumer.Subscribe(kafkaTopics);

            while (!stoppingToken.IsCancellationRequested)
            {
                var consumeResult = consumer.Consume(stoppingToken);
                try
                {
                    var message = consumeResult.Message;
                    _logger.LogInformation($"Recieved message with key={message.Key}");
                    var eventDetails = JsonConvert.DeserializeObject<MinioEventDetails>(message.Value);
                    /* Update Vault Information
                     * Decision: Should we call Vault or Simply update DB? currently updating DB directly for speed.                     
                     */
                    foreach (var item in eventDetails?.Records ?? new List<MinioRecord>())
                    {
                        var vault = await vaultService.GetVaultAsync(item.s3.Bucket.Name);
                        if (vault != null)
                        {
                            var content = vault.Contents?.Where(c => c.ContentId.Equals(item.s3.Object.key)).First();
                            if (content != null)
                            {
                                content.Stage = services.shared.StageTypes.Uploaded;
                                await vaultService.UpdateVault(vault.VaultId, vault);
                                _logger.LogInformation($"Vault ({vault.VaultId}) has uploaded content {content.Description}");
                            }
                        }
                    }


                    /* Send it for ingestion
                     * Should it be another queue for workers or simple a api call
                     * Try c# to call openAI
                     */

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
