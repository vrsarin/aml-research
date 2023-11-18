using info.sarins.services.knowledge.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace info.sarins.services.knowledge.Controllers
{
    [Route("case-files/{identifier}/knowledge/types")]
    [ApiController]
    public class LabelsController : ControllerBase
    {
        [HttpGet]
        [SwaggerOperation(Summary = "Get all case files",
           Description = "Requires admin privileges",
           OperationId = "GetAllCases",
           Tags = new[] { "Knowledge" }
           )]
        public async Task<IActionResult> GetActive(long identifier)
        {
            var neo4Jdb = new Neo4JDB();
            var labels = await neo4Jdb.GetNodeLabels();
            return Ok(labels);
        }
    }
}
