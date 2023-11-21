using info.sarins.services.vault.Models;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace info.sarins.services.vault.Data.Models
{
    [PrimaryKey(nameof(Id))]
    public class CaseFiles
    {
        [Key]
        public string Id { get; set; } 

        public string? DisplayName { get; set; }

        public Status Status { get; set; }

        public string CaseFile { get; set; }      

    }
}
