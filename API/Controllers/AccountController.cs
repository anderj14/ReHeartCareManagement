using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.Identity;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
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
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        IPhotoService photoService,
        IUnitOfWork unitOfWork,
        IMapper mapper
        )
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        private async Task<AppUser> GetAuthenticatedUserAsync()
        {
            var userName = User.Identity.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return null; // Return null if no username is found
            }

            var user = await _userManager.FindByNameAsync(userName);
            return user; // Fetch the user details from the UserManager
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
                Email = user.Email
            };
        }

        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<UserDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDtos = _mapper.Map<IEnumerable<AppUser>, IEnumerable<UserDto>>(users);

            return Ok(userDtos);
        }

        [HttpDelete("delete/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);

            if (user == null)
            {
                return NotFound(new ApiResponse(404));
            }

            var result = await _userManager.DeleteAsync(user);

            if (!result.Succeeded)
            {
                return BadRequest(new ApiResponse(400));
            }

            return Ok();
        }

        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUserProfile()
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
            }

            var spec = new UserPhotoSpecification(user.Id);
            var photos = await _unitOfWork.Repository<Photo>().ListAsync(spec);

            var userProfile = new UserDto
            {
                UserName = user.UserName,
                Email = user.Email,
                Photos = photos.Select(photo => new PhotoDto
                {
                    Id = photo.Id,
                    PictureUrl = photo.Url,
                    IsMain = photo.IsMain
                }).ToList()
            };

            return Ok(userProfile);
        }

        [HttpPost("uploadPhoto")]
        [Authorize]
        public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile file)
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
            }

            var uploadResult = await _photoService.AddPhotoAsync(file);

            if (uploadResult.Error != null)
            {
                return BadRequest(new ApiResponse(400, uploadResult.Error.Message));
            }

            // Check if the user already has a main photo
            var spec = new UserPhotoSpecification(user.Id);
            var userPhotos = await _unitOfWork.Repository<Photo>().ListAsync(spec);
            var isMain = !userPhotos.Any(p => p.IsMain);

            var photo = new Photo
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
                AppUserId = user.Id,
                IsMain = isMain
            };

            _unitOfWork.Repository<Photo>().Add(photo);

            if (await _unitOfWork.Complete() > 0)
            {
                var photoDto = new PhotoDto
                {
                    Id = photo.Id,
                    PictureUrl = photo.Url,
                    FileName = file.FileName,
                    IsMain = photo.IsMain
                };

                return Ok(photoDto);
            }

            return BadRequest(new ApiResponse(400, "Problem saving photo"));
        }
    }
}
