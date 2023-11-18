using info.sarins.services.vault.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace info.sarins.services.vault.Data.Models
{
    [PrimaryKey(nameof(Id))]
    public class CaseFiles
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public long Id { get; set; }

        
        public string? DisplayName { get; set; }

        public Status Status { get; set; }

        [Required]
        public required string CaseFile { get; set; }
    }
}
