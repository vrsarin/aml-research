using Minio.DataModel.Tags;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace info.sarins.services.shared.http.requests.models
{
    public class Content
    {
        [Required]
        public required string ContentId { get; set; }

        [Required]
        //[JsonConverter(typeof(JsonStringEnumConverter))]
        public required SourceType Source { get; set; }

        //[JsonConverter(typeof(JsonStringEnumConverter))]
        public StageTypes Stage { get; set; } = StageTypes.Pending;

        public string? Path { get; set; } 

        public bool InitiateWebCrawling { get; set; } = false;

        public bool GetUploadUrl { get; set; } = false;

        public string? Description { get; set; }

        public string? FileName { get; set; }

        public string? Website { get; set; }

        public string? Body { get; set; }

        public string? ContentType { get; set; }

        public List<Tag>? Tags { get; set; }
    }
}
