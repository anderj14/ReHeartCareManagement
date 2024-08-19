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
    /// <summary>
    /// Handles account-related operations such as login, registration, and profile management.
    /// </summary>
    public class AccountController : BaseApiController
    {
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IPhotoService _photoService;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="AccountController"/> class.
        /// </summary>
        /// <param name="userManager">The user manager to manage user accounts.</param>
        /// <param name="signInManager">The sign-in manager to handle user sign-ins.</param>
        /// <param name="tokenService">The token service to generate authentication tokens.</param>
        /// <param name="photoService">The photo service to handle photo operations.</param>
        /// <param name="unitOfWork">The unit of work to manage repository transactions.</param>
        /// <param name="mapper">The mapper to handle object-to-object mapping.</param>

        public AccountController(UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager,
        ITokenService tokenService,
        IPhotoService photoService,
        IUnitOfWork unitOfWork,
        IMapper mapper) : base(userManager)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _photoService = photoService;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Logs in a user by validating their credentials and generating a JWT token.
        /// </summary>
        /// <param name="loginDto">The login details provided by the user.</param>
        /// <returns>A UserDto containing user information and JWT token.</returns>
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Find user by username
            var user = await _userManager.FindByNameAsync(loginDto.Username);

            if (user == null || !await _userManager.CheckPasswordAsync(user, loginDto.Password))
                return Unauthorized();

            // Check if password is correct
            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

            return new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Registers a new user account.
        /// </summary>
        /// <param name="registerDto">The registration details provided by the user.</param>
        /// <returns>A UserDto containing user information and JWT token.</returns>
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register([FromBody] RegisterDto registerDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                // Check if email is already in use
                if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
                {
                    return new BadRequestObjectResult(new ApiValidationErrorResponse
                    { Errors = new[] { "Email address is in use", registerDto.Email } });
                }

                // Create new user
                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email,
                };

                var result = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (!result.Succeeded) return BadRequest(new ApiResponse(400));

                // Assign user role
                var roleAddResult = await _userManager.AddToRoleAsync(appUser, "USER");

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

        /// <summary>
        /// Checks if an email address is already registered.
        /// </summary>
        /// <param name="email">The email address to check.</param>
        /// <returns>A boolean indicating whether the email is already in use.</returns>
        [HttpGet("emailexists")]
        public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
        {
            return await _userManager.FindByEmailAsync(email) != null;
        }

        /// <summary>
        /// Gets the current authenticated user's information.
        /// </summary>
        /// <returns>A UserDto containing user information and JWT token.</returns>
        [HttpGet("currentUser")]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var userName = User.Identity.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            // Find user by username
            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(401, "User not found"));

            return new UserDto()
            {
                UserName = user.UserName,
                Email = user.Email,
                Token = await _tokenService.CreateToken(user)
            };
        }

        /// <summary>
        /// Gets a list of all registered users. Only accessible by Admins.
        /// </summary>
        /// <returns>A collection of UserDto objects representing all users.</returns>
        [HttpGet("users")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<ICollection<UserDto>>> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();

            var userDtos = _mapper.Map<IEnumerable<AppUser>, IEnumerable<UserDto>>(users);

            return Ok(userDtos);
        }

        /// <summary>
        /// Deletes a user account by ID. Only accessible by Admins.
        /// </summary>
        /// <param name="id">The ID of the user to delete.</param>
        /// <returns>An ActionResult indicating success or failure.</returns>
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

        /// <summary>
        /// Gets the current authenticated user's profile, including photos.
        /// </summary>
        /// <returns>A UserDto containing user information and associated photos.</returns>
        [HttpGet("profile")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUserProfile()
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
            }

            // Get user's photos
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

        /// <summary>
        /// Uploads a photo for the currently authenticated user.
        /// </summary>
        /// <param name="file">The photo file to upload.</param>
        /// <returns>A PhotoDto representing the uploaded photo, or an error response if the upload fails.</returns>
        [HttpPost("uploadPhoto")]
        [Authorize]
        public async Task<ActionResult<PhotoDto>> UploadPhoto(IFormFile file)
        {
            // Retrieve the currently authenticated user
            var user = await GetAuthenticatedUserAsync();

            // Check if the user is authenticated
            if (user == null)
            {
                // Return an unauthorized response if the user is not found
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
            }

            // Attempt to upload the photo using the photo service
            var uploadResult = await _photoService.AddPhotoAsync(file);

            // Check if there was an error during the upload
            if (uploadResult.Error != null)
            {
                // Return a bad request response if there was an error
                return BadRequest(new ApiResponse(400, uploadResult.Error.Message));
            }

            // Get existing photos of the user to determine if this photo should be set as the main photo
            var spec = new UserPhotoSpecification(user.Id);
            var userPhotos = await _unitOfWork.Repository<Photo>().ListAsync(spec);
            // Set this photo as the main photo if the user does not already have one
            var isMain = !userPhotos.Any(p => p.IsMain);

            // Create a new Photo entity with the upload result and user information
            var photo = new Photo
            {
                Url = uploadResult.SecureUrl.AbsoluteUri,
                PublicId = uploadResult.PublicId,
                AppUserId = user.Id,
                IsMain = isMain
            };

            // Add the new photo to the database
            _unitOfWork.Repository<Photo>().Add(photo);

            // Save changes to the database
            if (await _unitOfWork.Complete() > 0)
            {
                // Return the photo details if the save operation is successful
                var photoDto = new PhotoDto
                {
                    Id = photo.Id,
                    PictureUrl = photo.Url,
                    FileName = file.FileName,
                    IsMain = photo.IsMain
                };

                return Ok(photoDto);
            }

            // Return a bad request response if there was a problem saving the photo
            return BadRequest(new ApiResponse(400, "Problem saving photo"));
        }

    }
}
