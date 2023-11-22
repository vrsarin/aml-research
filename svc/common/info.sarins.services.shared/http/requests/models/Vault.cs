using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace info.sarins.services.shared.http.requests.models
{
    public class Vault
    {
        public string VaultId { get; set; } = Guid.NewGuid().ToString();

        [Required]
        public required string Name { get; set; }

        public string? Description { get; set; }

        [JsonConverter(typeof(JsonStringEnumConverter))]
        public StatusTypes Status { get; set; } = StatusTypes.Open;

        public List<Content>? Contents { get; set; }
    }
}
