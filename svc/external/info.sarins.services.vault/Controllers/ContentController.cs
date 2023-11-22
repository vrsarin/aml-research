using info.sarins.services.shared;
using info.sarins.services.shared.data;
using info.sarins.services.shared.http.requests.models;
using info.sarins.services.shared.storage;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace info.sarins.services.vault.Controllers
{
    [Route("{vaultid}/content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly ILogger<ContentController> logger;
        private readonly IVaultDataService vaultService;
        private readonly IStorageRespository storageRespository;

        public ContentController(ILogger<ContentController> logger,
            IVaultDataService vaultService,
            IStorageRespository storageRespository)
        {
            this.logger = logger;
            this.vaultService = vaultService;
            this.storageRespository = storageRespository;
        }

        //[HttpGet("upload-url")]
        //[Tags("Content")]
        //public async Task<IActionResult> GetUrl(string case_id, string fileName)
        //{
        //    var caseFile = await casefiles.GetCaseFileAsync(case_id);
        //    return Ok(await storageRespository.GetFilePutUrl(caseFile.case_id, fileName));
        //}

        [HttpGet("{fileName}")]
        [Tags("Vault Content")]
        [ProducesResponseType(typeof(Uri), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> GetDownloadUrl(string vaultid, string fileName)
        {
            var vault = await this.vaultService.GetVaultAsync(vaultid);
            return Ok(await storageRespository.GetFileUrl(vault.VaultId, fileName));
        }

        [HttpPost]
        [Tags("Vault Content")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Uri), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddContent(string vaultid, Content content)
        {

            var vault = await this.vaultService.GetVaultAsync(vaultid);

            if (vault == null) return NotFound($"No vault found with id: {vaultid}");

            if (vault.Contents == null)
                vault.Contents = new List<Content>();

            vault.Contents.Add(content);

            await vaultService.UpdateVault(vault.VaultId, vault);
            return Ok();
        }

        [HttpPut("{contentid}")]
        [Tags("Vault Content")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Uri), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> UpdateContent(string vaultid, string contentId, Content content)
        {

            var vault = await vaultService.GetVaultAsync(vaultid);

            if (vault == null) return NotFound($"No vault found with id: {vaultid}");

            if (vault.Contents == null) return NoContent();

            var contents = vault.Contents.Where(c => c.ContentId.Equals(contentId));
            if (contents.Any())
            {
                contents.ToList().ForEach(c => vault.Contents.Remove(c));
            }
            vault.Contents.Add(content);

            await vaultService.UpdateVault(vault.VaultId, vault);
            return Ok();
        }

        [HttpPatch]
        [Tags("Vault Content")]
        [ProducesResponseType((int)HttpStatusCode.OK)]
        [ProducesResponseType(typeof(Uri), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> PatchContent(string vaultid, Content content) // check how to use JsonPatchDocument in controller. 
        {

            var vault = await this.vaultService.GetVaultAsync(vaultid);

            if (vault == null) return NotFound($"No vault found with id: {vaultid}");


            if (vault.Contents == null)
                vault.Contents = new List<Content>();

            var contents = vault.Contents.Where(c => c.ContentId.Equals(content.ContentId));
            if (contents.Any())
            {
                if (contents.Count() > 1)
                {
                    throw new ApplicationException($"Duplicate content found, which is not expected behaviour.");
                }
                vault.Contents.Add(content.Patch(contents.First()));
            }
            else
            {
                vault.Contents.Add(content);
            }

            await vaultService.UpdateVault(vault.VaultId, vault);

            return Ok();
        }
    }
}