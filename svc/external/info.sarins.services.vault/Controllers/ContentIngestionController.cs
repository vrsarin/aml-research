using info.sarins.services.vault.Data.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace info.sarins.services.vault.Controllers
{
    [Route("case-files/{identifier}/files")]
    [ApiController]
    public class ContentIngestionController : ControllerBase
    {
        private readonly ILogger<ContentIngestionController> logger;
        private readonly ICasefileDataService casefiles;

        public ContentIngestionController(ILogger<ContentIngestionController> logger, ICasefileDataService casefiles)
        {
            this.logger = logger;
            this.casefiles = casefiles;
        }

        [HttpPost]    
        [ValidateAntiForgeryToken]
        public IActionResult UploadFile()
        {
            return Ok();
        }
    }
}
