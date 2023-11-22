using info.sarins.services.shared.http.requests.models;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace info.sarins.services.shared
{

    public static class Extensions
    {
        public static string ToJson<T>(this T content)
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new JsonStringEnumConverter());
            return JsonSerializer.Serialize(content, options);
        }

        public static T? FromJson<T>(this string content)
        {
            var options = new JsonSerializerOptions();
            options.Converters.Add(new JsonStringEnumConverter());
            return JsonSerializer.Deserialize<T>(content, options);
        }


        public static Content Patch(this Content modified, Content original)
        {
            // TODO: FIx the update issue
            return original;
        }
    }
}

