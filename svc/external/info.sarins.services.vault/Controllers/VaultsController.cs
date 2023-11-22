using info.sarins.services.shared.data;
using info.sarins.services.shared.http.requests.models;
using Microsoft.AspNetCore.Mvc;

namespace info.sarins.services.vault.Controllers
{
    [Route("")]
    [ApiController]
    public class VaultsController : ControllerBase
    {
        private readonly ILogger<VaultsController> logger;
        private readonly IVaultDataService vaultService;

        public VaultsController(ILogger<VaultsController> logger, IVaultDataService vaultService)
        {
            this.logger = logger;
            this.vaultService = vaultService;
        }

        [HttpGet]
        [Tags("Vault")]
        public async Task<IActionResult> GetActive()
        {
            return Ok(await vaultService.GetVaultAsync());
        }

        [HttpGet("{vaultId}")]
        [Tags("Vault")]
        public async Task<IActionResult> GetCase([FromRoute] string vaultId)
        {
            return Ok(await vaultService.GetVaultAsync(vaultId));
        }

        [HttpPost]
        [Tags("Vault")]
        public async Task<IActionResult> Add(Vault vault)
        {
            if (string.IsNullOrEmpty(vault.VaultId))
                vault.VaultId = Guid.NewGuid().ToString();
            await vaultService.AddVault(vault);
            return Ok();
        }

        [HttpPut]
        [Tags("Vault")]
        public async Task<IActionResult> Update(string vaultId, Vault vault)
        {
            return Ok(await vaultService.UpdateVault(vaultId, vault));

        }

        [HttpPatch()]
        [Tags("Vault")]
        public async Task<IActionResult> Archive(string vaultId, Vault vault)
        {
            return Ok(await vaultService.ArchiveVault(vaultId));

        }

        [HttpDelete("{vaultId}")]
        [Tags("Vault")]
        public async Task<IActionResult> Delete([FromRoute] string vaultId)
        {
            await vaultService.DeleteVaultAsync(vaultId);
            return Ok();
        }
    }
}
