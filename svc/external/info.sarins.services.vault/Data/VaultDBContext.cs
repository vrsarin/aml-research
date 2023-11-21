using info.sarins.services.vault.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace info.sarins.services.vault.Data
{
    public sealed class VaultDBContext : DbContext
    {
        private readonly IConfiguration configuration;

        public VaultDBContext(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(configuration.GetConnectionString("VaultDatabase"));
        }

        public DbSet<CaseFiles> CaseFiles { get; set; }

      

    }
}
