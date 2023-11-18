using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace info.sarins.services.knowledge.Controllers
{
    [Route("case-files/{identifier}/knowledge/entities/{entity_id}/relations")]
    [ApiController]
    public class RelationsController : ControllerBase
    {
        [HttpGet]
        [SwaggerOperation(Summary = "Get all relationship of an entity",
           Description = "Requires admin privileges",
           OperationId = "GetAllCases",
           Tags = new[] { "Knowledge" }
           )]
        public async Task<IActionResult> GetActive(long identifier,long entity_id)
        {
            return Ok();
        }
    }
}
