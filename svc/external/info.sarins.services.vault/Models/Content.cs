namespace info.sarins.services.vault.Models
{
    public class Content
    {
        public string FileName { get; set; }

        public string Description { get; set; }

        public FileTypes ContentType { get; set; }

        public IngestionStages CurrentStage { get; set; }
    }
}
