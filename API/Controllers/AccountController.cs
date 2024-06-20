using API.Errors;
using Core.Dtos.Identity;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService
        )
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //finding a user
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            // Success or not
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }


        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse
                    { Errors = new[] { "Email address is in use", registerDto.Email } });
                }


                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };

                var result = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!result.Succeeded) return BadRequest(new ApiResponse(400));

                var roleAddResult = await _userManager.AddToRoleAsync(appUser, "USER");
                // var roleAddResult = await _userManager.AddToRolesAsync(appUser, new[] { "USER", "ADMIN" });

                if (!roleAddResult.Succeeded) return BadRequest("Failed to add to role");

                return new UserDto
                {
                    UserName = appUser.UserName,
                    Token = await _tokenService.CreateToken(appUser),
                    Email = appUser.Email
                };
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }


        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userName = User.Identity.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            // var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName.ToLower());
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(401, "User not found"));

            return new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user),
            };
        }
    }
}
