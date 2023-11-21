using info.sarins.services.vault.Data.Services;
using info.sarins.services.vault.Models;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace info.sarins.services.vault.Controllers
{
    [Route("case-files")]
    [ApiController]
    public class CasesController : ControllerBase
    {
        private readonly ILogger<CasesController> logger;
        private readonly ICasefileDataService casefiles;

        public CasesController(ILogger<CasesController> logger, ICasefileDataService casefiles)
        {
            this.logger = logger;
            this.casefiles = casefiles;
        }

        [HttpGet]
        [SwaggerOperation(Summary = "Get all case files",
            Description = "Requires admin privileges",
            OperationId = "GetAllCases",
            Tags = new[] { "Case Files" }
            )]
        public async Task<IActionResult> GetActive()
        {
            return Ok(await casefiles.GetCaseFilesAsync());
        }

        [HttpGet("{identifier}")]
        [SwaggerOperation(Summary = "Get all case files",
            Description = "Requires admin privileges",
            OperationId = "GetAllCases",
            Tags = new[] { "Case Files" })]
        public async Task<IActionResult> GetCase([FromRoute] string identifier)
        {
            return Ok(await casefiles.GetCaseFileAsync(identifier));
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Start new case files",
            Description = "Requires admin privileges",
            OperationId = "CreateCases",
            Tags = new[] { "Case Files" }
            )]
        public async Task<IActionResult> Add(CaseFile caseFile)
        {
            
            await casefiles.AddNewCaseFile(caseFile);
            return Ok();
        }

        [HttpPut]
        [SwaggerOperation(Summary = "Update existing case files",
            Description = "Requires admin privileges",
            OperationId = "UpdateCases",
            Tags = new[] { "Case Files" }
            )]
        public async Task<IActionResult> Update(string identifier, CaseFile caseFile)
        {
            return Ok(await casefiles.UpdateCaseFile(identifier, caseFile));

        }

        [HttpPut("archive")]
        [SwaggerOperation(Summary = "Archive case files",
            Description = "Requires admin privileges",
            OperationId = "ArchiveCase",
            Tags = new[] { "Case Files" }
            )]
        public async Task<IActionResult> Archive(string identifier)
        {
            return Ok(await casefiles.ArchiveCaseFile(identifier));

        }
        [HttpDelete("{identifier}")]
        [SwaggerOperation(Summary = "Archive case files",
           Description = "Requires admin privileges",
           OperationId = "ArchiveCase",
           Tags = new[] { "Case Files" }
           )]
        public async Task<IActionResult> Delete([FromRoute]string identifier)
        {
            await casefiles.DeleteCaseFileAsync(identifier);
            return Ok();
        }
    }
}
