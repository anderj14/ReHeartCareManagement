using API.Errors;
using AutoMapper;
using Core.Dtos.CreateDto;
using Core.Dtos.HolterStudyDtos;
using Core.Entities.HolterStudyInfo;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages operations related to Additional Test Results for Holter Studies.
    /// Provides endpoints to retrieve, create, update, and delete additional test results.
    /// </summary>
    public class AdditionalTestResultController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public AdditionalTestResultController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            IUnitOfWork unitOfWork
        ) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves an additional test result by its ID.
        /// </summary>
        /// <param name="id">ID of the additional test result to retrieve.</param>
        /// <returns>The additional test result if found, otherwise a 404 Not Found response.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<AdditionalTestResultDto>> GetAdditionalTestResult(int id)
        {
            try
            {
                // Get the authenticated user
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Define the specification to retrieve the additional test result by ID
                var spec = new AdditionalTestResultSpecification(id);
                var additionalTestResult = await _unitOfWork.Repository<AdditionalTestResult>().GetEntityWithSpec(spec);

                // Check if the additional test result exists
                if (additionalTestResult == null)
                {
                    return NotFound(new ApiResponse(404, "Additional test result not found"));
                }

                // Check if the HolterStudy associated with the additional test result belongs to the authenticated user
                var holterStudySpec = new HolterStudySpecification(additionalTestResult.HolterStudyId);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(holterStudySpec);

                // If the HolterStudy does not exist or the user is not authorized, return a 404 Not Found response
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found or not authorized"));
                }

                // Map to DTO
                var additionalTestResultDto = _mapper.Map<AdditionalTestResultDto>(additionalTestResult);

                return Ok(additionalTestResultDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new additional test result.
        /// </summary>
        /// <param name="additionalTestResultCreateDto">DTO containing the details of the additional test result to create.</param>
        /// <returns>The created additional test result.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AdditionalTestResultDto>> CreateAdditionalTestResult([FromBody] AdditionalTestResultCreateDto additionalTestResultCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Get the authenticated user
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Map the DTO to the entity
                var newAdditionalTestResult = _mapper.Map<AdditionalTestResultCreateDto, AdditionalTestResult>(additionalTestResultCreateDto);

                // Add the new additional test result to the repository
                _unitOfWork.Repository<AdditionalTestResult>().Add(newAdditionalTestResult);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating additional test result"));

                // Map to DTO for response
                var additionalTestResultDto = _mapper.Map<AdditionalTestResultDto>(newAdditionalTestResult);

                return CreatedAtAction(
                    nameof(GetAdditionalTestResult),
                    new { id = newAdditionalTestResult.Id },
                    additionalTestResultDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing additional test result.
        /// </summary>
        /// <param name="id">ID of the additional test result to update.</param>
        /// <param name="additionalTestResultUpdateDto">DTO containing the updated details of the additional test result.</param>
        /// <returns>The updated additional test result.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<AdditionalTestResultDto>> UpdateAdditionalTestResult(int id, AdditionalTestResultCreateDto additionalTestResultUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Get the authenticated user
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Retrieve the additional test result by ID
                var spec = new AdditionalTestResultSpecification(id);
                var additionalTestResult = await _unitOfWork.Repository<AdditionalTestResult>().GetEntityWithSpec(spec);

                // Check if the additional test result exists
                if (additionalTestResult == null)
                {
                    return NotFound(new ApiResponse(404, "Additional test result not found"));
                }

                // Ensure the HolterStudy associated with the additional test result belongs to the authenticated user
                var holterStudy = additionalTestResult.HolterStudy;
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Additional test result not found or not authorized"));
                }

                // Validate that the provided HolterStudyId in the DTO matches the appointment HolterStudyId
                if (additionalTestResult.HolterStudyId != additionalTestResultUpdateDto.HolterStudyId)
                {
                    return NotFound(new ApiResponse(404, "Additional test result does not belong to the specified holter study"));
                }

                // Map the updated details to the entity
                _mapper.Map(additionalTestResultUpdateDto, additionalTestResult);

                // Update the additional test result in the repository
                _unitOfWork.Repository<AdditionalTestResult>().Update(additionalTestResult);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating additional test result information"));
                }

                // Map to DTO for response
                var additionalTestResultDto = _mapper.Map<AdditionalTestResultDto>(additionalTestResult);

                return Ok(additionalTestResultDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing additional test result.
        /// </summary>
        /// <param name="id">ID of the additional test result to delete.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAdditionalTestResult(int id)
        {
            try
            {
                // Get the authenticated user
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Retrieve the additional test result by ID
                var spec = new AdditionalTestResultSpecification(id);
                var additionalTestResult = await _unitOfWork.Repository<AdditionalTestResult>().GetEntityWithSpec(spec);

                // Check if the additional test result exists
                if (additionalTestResult == null)
                {
                    return NotFound(new ApiResponse(404, "Additional test result not found"));
                }

                // Ensure the HolterStudy associated with the additional test result belongs to the authenticated user
                var holterStudy = additionalTestResult.HolterStudy.Patient;
                if (holterStudy == null || holterStudy.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Additional test result not found or not authorized"));
                }

                // Delete the additional test result from the repository
                _unitOfWork.Repository<AdditionalTestResult>().Delete(additionalTestResult);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting additional test result information"));
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
