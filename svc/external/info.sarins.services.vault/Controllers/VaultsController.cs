using info.sarins.services.shared.data;
using info.sarins.services.shared.http.requests.models;
using info.sarins.services.shared.storage;
using Microsoft.AspNetCore.Mvc;
using Minio.Exceptions;

namespace info.sarins.services.vault.Controllers
{
    [Route("")]
    [ApiController]
    public class VaultsController : ControllerBase
    {
        private readonly ILogger<VaultsController> logger;
        private readonly IVaultDataService vaultService;
        private readonly IStorageRespository storageRespository;

        public VaultsController(ILogger<VaultsController> logger, IVaultDataService vaultService, IStorageRespository storageRespository)
        {
            this.logger = logger;
            this.vaultService = vaultService;
            this.storageRespository = storageRespository;
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

            if (!await vaultService.AddVault(vault))
            {
                return StatusCode(500, new { Message = "Unable to initialize database record." });
            }

            if (!await storageRespository.CreateBucketAsync(vault.VaultId))
            {
                return StatusCode(500, new { Message = "Failed to initialize storage." });
            }
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
            if (!await vaultService.DeleteVaultAsync(vaultId))
            {
                return NoContent();
            }
            return Ok();
        }
    }
}
