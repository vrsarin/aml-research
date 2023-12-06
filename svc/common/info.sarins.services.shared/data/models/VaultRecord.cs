using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace info.sarins.services.shared.data.models
{
    [PrimaryKey(nameof(Id))]
    public class VaultRecord
    {
        [Key]
        public required string Id { get; set; }

        public string? DisplayName { get; set; }

        //[JsonConverter(typeof(JsonStringEnumConverter))]
        public StatusTypes Status { get; set; }

        public required string Content { get; set; }
    }
}
