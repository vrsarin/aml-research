using System.ComponentModel.DataAnnotations;

namespace info.sarins.services.vault.Models
{
    public class CaseFile
    {
        
        public long Identifier { get; set; }

        [Required]
        public required string Name { get; set; }

        public string? Description { get; set; }

        public Status CaseStatus { get; set; } = Status.Open;

        public Dictionary<string,Uri> CaseUrls { get; set; }= new Dictionary<string,Uri>();

        public Dictionary<string, Uri> Documents { get; set; } = new Dictionary<string, Uri>();

        public Dictionary<string, string> Notes { get; set; } = new Dictionary<string, string>();
    }

    
    public enum Status
    {
        Open,     
        DataGathering,
        Analyzing,
        ReportGeneration,
        Closed,
        Archived
    }
}