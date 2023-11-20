using info.sarins.services.knowledge.Data;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace info.sarins.services.knowledge.Controllers
{
    [Route("case-files/{identifier}/knowledge/graph")]
    [ApiController]
    public class NodesController : ControllerBase
    {
        private readonly ILogger<NodesController> logger;
        private readonly INeo4JDB neo4JDB;

        public NodesController(ILogger<NodesController> logger, INeo4JDB neo4JDB)
        {
            this.logger = logger;
            this.neo4JDB = neo4JDB;
        }


        [HttpGet]
        [SwaggerOperation(Summary = "Get all nodes",
          Description = "Requires admin privileges",
          OperationId = "GetAllCases",
          Tags = new[] { "Nodes" }
          )]
        public async Task<IActionResult> GetAllNodes(long identifier)
        {
            var labels = await neo4JDB.GetNodesWithProperties();

            return Ok(labels);
        }

        [HttpGet("labels")]
        [SwaggerOperation(Summary = "Get all labels",
          Description = "Requires admin privileges",
          OperationId = "GetAllCases",
          Tags = new[] { "Labels" }
          )]
        public async Task<IActionResult> GetAllLabels(long identifier)
        {

            var labels = await this.neo4JDB.GetNodeLabels();
            return Ok(labels);
        }

        [HttpGet("{label}")]
        [SwaggerOperation(Summary = "Get all nodes for a given label",
           Description = "Requires admin privileges",
           OperationId = "GetAllCases",
           Tags = new[] { "Nodes" }
           )]
        public async Task<IActionResult> GetNodes(long identifier, string label)
        {
            var labels = await neo4JDB.GetNodesWithProperties(label);
            return Ok(labels);
        }

        [HttpGet("entities/{entityId}/relations")]
        [SwaggerOperation(Summary = "Get all relationship of a given entity",
           Description = "Requires admin privileges",
           OperationId = "GetAllCases",
           Tags = new[] { "Nodes" }
           )]
        public IActionResult GetEntityRelations(long identifier, long entity_id)
        {
            return Ok();
        }
        [HttpGet("relations")]
        [SwaggerOperation(Summary = "Get all relationship of an entity",
           Description = "Requires admin privileges",
           OperationId = "GetAllCases",
           Tags = new[] { "Relations" }
           )]
        public IActionResult GetAllRelations(long identifier)
        {
            return Ok();
        }



    }
}
