namespace info.sarins.services.vault
{
    public enum IngestionStages
    {
        Uploaded,
        Acquired,
        Queued,
        Processing,
        Processed,
        Error,        
        Archiving,
        Archived
    }
}