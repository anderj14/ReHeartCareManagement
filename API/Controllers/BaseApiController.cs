
using API.Extensions;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class BaseApiController : ControllerBase
    {
        protected readonly UserManager<AppUser>? _userManager;

        public BaseApiController(UserManager<AppUser>? userManager = null)
        {
            _userManager = userManager;
        }
        
        // Retrieves the currently authenticated user based on the username from the claims
        protected async Task<AppUser> GetAuthenticatedUserAsync()
        {
            if (_userManager == null)
            {
                return null; // Return null if UserManager is not provided
            }
            
            var userName = User.GetUserName();

            if (string.IsNullOrEmpty(userName))
            {
                return null; // Return null if no username is found
            }

            var user = await _userManager.FindByNameAsync(userName);
            return user; // Fetch the user details from the UserManager
        }
    }
}