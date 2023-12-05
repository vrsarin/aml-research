using info.sarins.services.knowledge.Data;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace info.sarins.services.knowledge.Controllers
{
    [Route("{vaultId}/graph")]
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

        [HttpGet("nodes")]
        [Tags("Nodes")]
        public async Task<IActionResult> GetNodes(string vaultId,bool includeProperties=false)
        {
            var labels = await neo4JDB.GetNodes(includeProperties);
            return Ok(labels);
        }

        [HttpGet("nodes/{nodeid}")]
        [Tags("Nodes")]
        public async Task<IActionResult> GetNodes(string vaultId, string nodeid)
        {
            throw new NotImplementedException();
        }

        [HttpGet("nodes/{nodeid}/relations")]
        [Tags("Nodes")]
        public async Task<IActionResult> GetNodeRelations(string vaultId, string nodeid, bool includeRelations = true, int depth = 1)
        {
            throw new NotImplementedException();
        }

        [HttpGet("labels")]
        [Tags("Labels")]
        public async Task<IActionResult> GetAllLabels(string vaultId)
        {

            var labels = await this.neo4JDB.GetNodeLabels();
            return Ok(labels);
        }

       

        [HttpGet("labels/{label}/nodes")]
        [Tags("Labels")]
        public async Task<IActionResult> GetLabelNodes(string vaultId, string label)
        {
            var labels = await neo4JDB.GetNodesWithProperties(label);
            return Ok(labels);
        }

        [HttpGet("labels/{label}/nodes/{nodeid}/relations")]
        [Tags("Labels")]
        public async Task<IActionResult> GetEntityRelations(string vaultId, string label, string nodeid, bool includeRelations=true,int depth=1)
        {
            var labels = await neo4JDB.GetRelations(label, nodeid, includeRelations, depth);
            return Ok(labels);
        }        
    }
}
