using System.ComponentModel.DataAnnotations;

namespace info.sarins.services.knowledge.Data
{
    public class Entity
    {
        [Key]
        public required string ElementId  { get; set; }

        [Key]
        public string Id { get; set; } = string.Empty;

        public List<string> Labels { get; set; } = new List<string>();

        public List<KeyValuePair<string, object>>? Attributes { get; set; } = new List<KeyValuePair<string, object>>();
    }
}