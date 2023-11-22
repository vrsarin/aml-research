using info.sarins.services.shared.http.requests.models;

namespace info.sarins.services.shared.data
{
    public interface IVaultDataService
    {
        Task AddVault(Vault vault);
        Task<Vault?> ArchiveVault(string vaultId);
        Task DeleteVaultAsync(string vaultId);
        Task<List<Vault>> GetVaultAsync();
        Task<Vault?> GetVaultAsync(string vaultId);
        Task<Vault?> UpdateVault(string vaultId, Vault vault);
    }
}