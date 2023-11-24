using info.sarins.services.shared.data.models;
using info.sarins.services.shared.http.requests.models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace info.sarins.services.shared.data
{
    public class VaultDataService : IVaultDataService
    {
        private readonly ILogger<VaultDataService> logger;
        private readonly VaultDBContext context;

        public VaultDataService(ILogger<VaultDataService> logger, VaultDBContext dBContext)
        {
            this.logger = logger;
            this.context = dBContext;

        }

        public async Task<List<Vault>> GetVaultAsync()
        {
            List<Vault> vaults = new();
            foreach (var item in await context.Vaults.ToArrayAsync())
            {
                var file = item.Content.FromJson<Vault?>();
                if (file != null)
                    vaults.Add(file);
            }
            return vaults;
        }

        public async Task<bool> AddVault(Vault vault)
        {
            VaultRecord dbFile = new()
            {
                Id = vault.VaultId,
                DisplayName = vault.Name,
                Content = vault.ToJson(),
            };

            await context.Vaults.AddAsync(dbFile);
            await context.SaveChangesAsync();
            return true;
        }

        public async Task<Vault?> UpdateVault(string vaultId, Vault vault)
        {
            var dbFile = await context.Vaults.Where(f => f.Id.Equals(vaultId)).FirstAsync();
            dbFile.Content = dbFile.ToJson();
            await context.SaveChangesAsync();
            return vault;
        }

        public async Task<Vault?> ArchiveVault(string vaultId)
        {
            var dbFile = await context.Vaults.Where(f => f.Id.Equals(vaultId)).FirstAsync();
            Vault? vault = dbFile.Content?.FromJson<Vault>();
            if (vault != null)
            {
                vault.Status = StatusTypes.Archived;
                dbFile.Content = vault.ToJson();
                await context.SaveChangesAsync();
            }
            return vault;
        }

        public async Task<Vault?> GetVaultAsync(string vaultId)
        {
            var dbFile = await context.Vaults.Where(f => f.Id.Equals(vaultId)).FirstAsync();
            return dbFile.Content?.FromJson<Vault?>();
        }

        public async Task<bool> DeleteVaultAsync(string vaultId)
        {
            var dbFile = await context.Vaults.Where(f => f.Id.Equals(vaultId)).FirstAsync();
            context.Vaults.Remove(dbFile);
            await context.SaveChangesAsync();
            return true;
        }
    }
}
