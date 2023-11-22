using info.sarins.services.shared.data;

namespace info.sarins.workers.documents.loader
{
    public class Program
    {
        public static void Main(string[] args)
        {
            IHost host = Host.CreateDefaultBuilder(args)
                .ConfigureServices(services =>
                {
                    services.AddHostedService<Worker>();
                    services.AddDbContext<VaultDBContext>();
                    services.AddTransient<IVaultDataService, VaultDataService>();
                })
                .Build();

            host.Run();
        }
    }
}