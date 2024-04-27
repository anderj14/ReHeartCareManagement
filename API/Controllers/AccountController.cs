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
            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

            if (user == null) return Unauthorized(new ApiResponse(401));

            // Success or not
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = _tokenService.CreateToken(user)
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

                // if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
                // {
                //     return new BadRequestObjectResult(
                //         new ApiValidationErrorResponse
                //         {
                //             Errors = new[] { "Email address is in use" }
                //         }
                //     );
                // }

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };

                var result = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!result.Succeeded) return BadRequest(new ApiResponse(400));

                var roleAddResult = await _userManager.AddToRoleAsync(appUser, "User");

                if (!roleAddResult.Succeeded) return BadRequest("Failed to add to role");

                return new UserDto
                {
                    UserName = appUser.UserName,
                    Token = _tokenService.CreateToken(appUser),
                    Email = appUser.Email
                };
            }
            catch (Exception e)
            {
                return StatusCode(500, e);
            }
        }

        // [Authorize]
        // [HttpGet]
        // public async Task<ActionResult<UserDto>> GetCurrentUser()
        // {
        //     var email = User.FindFirstValue(ClaimTypes.Email);

        //     var user = await _userManager.FindByEmailAsync(email);

        //     return new UserDto()
        //     {

        //         Email = user.Email,
        //         Token = _tokenService.CreateToken(user),
        //         DisplayName = user.DisplayName
        //         // Notes = user.Notes
        //     };
        // }

        // [HttpGet("emailexists")]
        // public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        // {
        //     return await _userManager.FindByEmailAsync(email) != null;
        // }

        // [HttpGet("userId")]
        // public async Task<ActionResult<string>> GetUserId()
        // {
        //     // Obtener el email del claim del usuario autenticado
        //     var userEmail = User.FindFirstValue(ClaimTypes.Email);

        //     // Obtener el usuario basado en el email
        //     var user = await _userManager.FindByEmailAsync(userEmail);

        //     // Verificar si el usuario existe
        //     if (user == null)
        //     {
        //         // Devolver un error si el usuario no existe
        //         return BadRequest("Usuario no encontrado");
        //     }

        //     // Crear el token para el usuario actual
        //     // var token = await _tokenService.CreateToken(user);

        //     // Devolver el ID del usuario
        //     return Ok(new { UserId = user.Id });
        // }
    }
}