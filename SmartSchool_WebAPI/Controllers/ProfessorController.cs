using Microsoft.AspNetCore.Mvc;

namespace SmartSchool_WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
   
   public class ProfessorController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAction(){
            return Ok("Thales2");
        }
    }
}