using System.ComponentModel.DataAnnotations;

namespace info.sarins.services.vault.Models
{
    public class CaseFile
    {

        public string Identifier { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public required string Name { get; set; }

        public string? Description { get; set; }

        public Status CaseStatus { get; set; } = Status.Open;

        public Content[]? Contents { get; set; }

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