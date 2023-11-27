using info.sarins.services.shared.data;
using info.sarins.services.shared.storage;
using Minio;

namespace info.sarins.workers.documents.loader
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = Host.CreateDefaultBuilder(args);
            IHost host = builder
                .ConfigureServices(services =>
                {
                    services.AddHostedService<Worker>();
                })
                .Build();
            host.Run();
        }
    }
}