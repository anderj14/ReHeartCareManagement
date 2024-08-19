using API.Errors;
using Core.Entities.Identity;
using Infraestructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Controller for testing different error scenarios
    public class BuggyController : BaseApiController
    {
        private readonly ManagementContext _context;

        public BuggyController(ManagementContext context, UserManager<AppUser> userManager) : base(userManager)
        {
            _context = context;
        }

        // Returns a secret text if the user is authorized
        [HttpGet("testauth")]
        [Authorize]
        public ActionResult<string> GetSecretText()
        {
            return "secret stuff";
        }

        // Returns a 404 Not Found response
        [HttpGet("notfound")]
        public ActionResult GetNotFoundRequest()
        {
            var thing = _context.Patients.Find(43);

            if (thing == null) return NotFound(new ApiResponse(404));

            return Ok();
        }

        // Returns a 500 Internal Server Error response
        [HttpGet("servererror")]
        public ActionResult GetServerError()
        {
            try
            {
                var thing = _context.Patients.Find(42);
                var thingToReturn = thing.ToString(); // This will throw an exception if thing is null

                return Ok(thingToReturn);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new ApiResponse(500, ex.Message));
            }
        }

        // Returns a 400 Bad Request response
        [HttpGet("badrequest")]
        public ActionResult GetBadRequest()
        {
            return BadRequest(new ApiResponse(400));
        }

        // Returns a 400 Bad Request response for a specific ID
        [HttpGet("badrequest/{id}")]
        public ActionResult GetBadRequest(int id)
        {
            return Ok();
        }

        // Returns a 401 Unauthorized response
        [HttpGet("unauthorized")]
        public ActionResult GetUnauthorized()
        {
            return Unauthorized(new ApiResponse(401));
        }
    }
}