using Newtonsoft.Json;

namespace info.sarins.services.shared.queues.models
{
    public class ParserKafkaMessage
    {
        [JsonProperty("bucket_name")]
        public string BucketName { get; set; }

        [JsonProperty("file_name")]
        public string FileName { get; set; }

        [JsonProperty("content_type")]
        public string ContentType { get; set; }

        [JsonIgnore]
        public bool IsIngestionReady
        {
            get
            {
                return ContentType.ToLowerInvariant() == "text/plain";
            }
        }
    }
}