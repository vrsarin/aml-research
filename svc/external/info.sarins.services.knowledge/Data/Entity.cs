using System.ComponentModel.DataAnnotations;

namespace info.sarins.services.knowledge.Data
{
    public class Entity
    {
        [Key]
        public string Id { get; set; } = string.Empty;

        public List<string> Types { get; set; } = new List<string>();

        public List<KeyValuePair<string, object>>? Attributes { get; set; } = new List<KeyValuePair<string, object>>();
    }
}