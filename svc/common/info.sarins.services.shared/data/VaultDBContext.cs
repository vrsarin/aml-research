using info.sarins.services.shared.data.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace info.sarins.services.shared.data
{
    public class VaultDBContext : DbContext
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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasPostgresEnum<StageTypes>();
            modelBuilder.HasPostgresEnum<StatusTypes>();
            modelBuilder.HasPostgresEnum<SourceType>();
            modelBuilder.HasPostgresEnum<StageTypes>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<VaultRecord> Vaults { get; set; }
    }
}
