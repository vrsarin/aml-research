using info.sarins.services.vault.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace info.sarins.services.vault.Controllers
{
    [Route("case-files/{identifier}/content")]
    [ApiController]
    public class ContentController : ControllerBase
    {
        private readonly ILogger<ContentController> logger;
        private readonly ICasefileDataService casefiles;
        private readonly IStorageRespository storageRespository;

        public ContentController(ILogger<ContentController> logger, ICasefileDataService casefiles, IStorageRespository storageRespository)
        {
            this.logger = logger;
            this.casefiles = casefiles;
            this.storageRespository = storageRespository;
        }

        [HttpGet("upload-url")]
        [Tags("Content")]
        public async Task<IActionResult> GetUrl(string identifier, string fileName)
        {
            var caseFile = await casefiles.GetCaseFileAsync(identifier);
            return Ok(await storageRespository.GetFilePutUrl(caseFile.Identifier, fileName));
        }

        [HttpGet("{fileName}")]
        [Tags("Content")]
        public async Task<IActionResult> GetDownloadUrl(string identifier, string fileName)
        {
            var caseFile = await casefiles.GetCaseFileAsync(identifier);
            return Ok(await storageRespository.GetFileUrl(caseFile.Identifier, fileName));
        }
    }
}