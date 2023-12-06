namespace info.sarins.services.shared.storage.models
{
    public class MinioEventDetails
    {
        public string? EventName { get; set; }

        public string? Key { get; set; }

        public List<MinioRecord>? Records { get; set; }
    }
}
