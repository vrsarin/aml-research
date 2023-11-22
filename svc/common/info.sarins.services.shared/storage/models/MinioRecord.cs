namespace info.sarins.services.shared.storage.models
{
    public class MinioRecord
    {
        public string EventVersion { get; set; }

        public string EventSource { get; set; }

        public string AWSRegion { get; set; }

        public DateTime EventTime { get; set; }

        public string EventName { get; set; }

        public MinioS3 s3 { get; set; }
    }
}
