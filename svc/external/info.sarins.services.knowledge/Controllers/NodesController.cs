using info.sarins.services.knowledge.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace info.sarins.services.knowledge.Controllers
{
    [Route("case-files/{identifier}/knowledge/entities")]
    [ApiController]
    public class NodesController : ControllerBase
    {
        [HttpGet("{type}")]
        [SwaggerOperation(Summary = "Get all entities",
           Description = "Requires admin privileges",
           OperationId = "GetAllCases",
           Tags = new[] { "Knowledge" }
           )]       
        public async Task<IActionResult> GetNodes(long identifier, string type)
        {
            using var neo4Jdb = new Neo4JDB();
            var labels = await neo4Jdb.GetNodesWithProperties(type);

            return Ok(labels);
        }
    }
}
