using System.Linq.Expressions;
using API.Errors;
using API.Extensions;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Core.Specification.CardiologySurgerySpec;
using Core.Specification.SurgeryFollowUpSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages surgery follow-up records. Provides endpoints for creating, retrieving, updating, and deleting follow-ups.
    /// </summary>
    public class SurgeryFollowUpController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="SurgeryFollowUpController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public SurgeryFollowUpController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves follow-ups for a specific cardiology surgery.
        /// </summary>
        /// <param name="cardiologySurgeryId">ID of the cardiology surgery.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        /// <returns>A list of follow-ups.</returns>
        [HttpGet("cardiologySurgery/{cardiologySurgeryId}/followUps")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<SurgeryFollowUpDto>>> GetFollowUpsByCardiologySurgeryId(
            int cardiologySurgeryId, [FromQuery] BaseSpecParams baseSpecParams)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Define specification to get the cardiology surgery with all related data
                var cardiologySurgerySpec = new CardiologySurgerySpecification(cardiologySurgeryId);
                var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(cardiologySurgerySpec);

                // Check if the cardiology surgery exists and if the authenticated user is authorized
                if (cardiologySurgery == null || cardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Cardiology surgery not found or not authorized"));
                }

                // Define specification to get the follow-ups for the cardiology surgery with pagination and sorting
                var spec = new SurgeryFollowUpSpecification(cardiologySurgeryId, baseSpecParams);

                // Define a filter for follow-ups based on the cardiology surgery ID
                Expression<Func<SurgeryFollowUp, bool>> filter = (followUp) => followUp.CardiologySurgeryId == cardiologySurgeryId;

                // Get the total count of follow-ups matching the filter
                var totalItems = await _unitOfWork.Repository<SurgeryFollowUp>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<SurgeryFollowUpDto>(new List<SurgeryFollowUpDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }

                // Get the list of follow-ups for the cardiology surgery with pagination
                var followUps = await _unitOfWork.Repository<SurgeryFollowUp>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);

                // Map the list of follow-ups to DTOs
                var followUpsDtos = _mapper.Map<IReadOnlyList<SurgeryFollowUpDto>>(followUps);

                // Create a paginated list of follow-up DTOs
                var paginatedFollowUps = new PagedList<SurgeryFollowUpDto>(
                    followUpsDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedFollowUps.MetaData);
                return Ok(followUpsDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific follow-up for a cardiology surgery by its ID.
        /// </summary>
        /// <param name="cardiologySurgeryId">ID of the cardiology surgery.</param>
        /// <param name="followUpId">ID of the follow-up.</param>
        /// <returns>The requested follow-up.</returns>
        [HttpGet("cardiologySurgery/{cardiologySurgeryId}/followUps/{followUpId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<SurgeryFollowUpDto>> GetFollowUpByCardiologySurgeryId(int cardiologySurgeryId, int followUpId)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Define specification to get the cardiology surgery with all related data
                var cardiologySurgerySpec = new CardiologySurgerySpecification(cardiologySurgeryId);
                var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(cardiologySurgerySpec);

                // Check if the cardiology surgery exists and if the authenticated user is authorized
                if (cardiologySurgery == null || cardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Cardiology surgery not found or not authorized"));
                }

                // Define specification to get the follow-up by cardiology surgery ID and follow-up ID
                var spec = new SurgeryFollowUpSpecification(cardiologySurgeryId, followUpId);
                var followUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);

                // Check if the follow-up exists
                if (followUp == null)
                    return NotFound(new ApiResponse(404, "Follow-up not found"));

                // Map the follow-up to a DTO
                var followUpDto = _mapper.Map<SurgeryFollowUpDto>(followUp);

                return Ok(followUpDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new follow-up record.
        /// </summary>
        /// <param name="surgeryFollowUpCreateDto">Data transfer object containing the details of the follow-up to be created.</param>
        /// <returns>The created follow-up record.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<SurgeryFollowUpDto>> CreateFollowUp(SurgeryFollowUpsCreateDto surgeryFollowUpCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Map the DTO to a new follow-up entity
                var newFollowUp = _mapper.Map<SurgeryFollowUpsCreateDto, SurgeryFollowUp>(surgeryFollowUpCreateDto);

                // Add the new follow-up to the repository
                _unitOfWork.Repository<SurgeryFollowUp>().Add(newFollowUp);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating follow-up"));

                // Map the new follow-up to a DTO
                var followUpDto = _mapper.Map<SurgeryFollowUpDto>(newFollowUp);

                return CreatedAtAction(
                    nameof(GetFollowUpByCardiologySurgeryId),
                    new { cardiologySurgeryId = newFollowUp.CardiologySurgeryId, followUpId = newFollowUp.Id },
                    followUpDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing follow-up record.
        /// </summary>
        /// <param name="id">ID of the follow-up to be updated.</param>
        /// <param name="surgeryFollowUpUpdateDto">Data transfer object containing the updated details of the follow-up.</param>
        /// <returns>No content if successful.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<SurgeryFollowUpDto>> UpdateFollowUp(int id, SurgeryFollowUpsCreateDto surgeryFollowUpUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Define specification to get the follow-up by ID
                var spec = new SurgeryFollowUpSpecification(id);
                var followUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);

                // Check if the follow-up exists
                if (followUp == null)
                    return NotFound(new ApiResponse(404, "Follow-up not found"));

                var cardiologySurgery = followUp.CardiologySurgery;
                if (cardiologySurgery == null || cardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Cardiology surgery not found or not authorized"));
                }
                if (followUp.CardiologySurgeryId != surgeryFollowUpUpdateDto.CardiologySurgeryId)
                {
                    return NotFound(new ApiResponse(404, "Cardiology surgery does not belong to the specified Patient"));
                }

                // Update the follow-up entity with new values
                _mapper.Map(surgeryFollowUpUpdateDto, followUp);

                // Mark the entity as modified and save changes
                _unitOfWork.Repository<SurgeryFollowUp>().Update(followUp);
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating follow-up"));

                var surgeryFollowUpDto = _mapper.Map<SurgeryFollowUpDto>(followUp);

                return Ok(surgeryFollowUpDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a specific follow-up record.
        /// </summary>
        /// <param name="id">ID of the follow-up to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteFollowUp(int id)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Define specification to get the follow-up by ID
                var spec = new SurgeryFollowUpSpecification(id);
                var followUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);

                // Check if the follow-up exists
                if (followUp == null)
                {
                    return NotFound(new ApiResponse(404, "Follow-up not found"));
                }

                var cardiologySurgery = followUp.CardiologySurgery;
                if (cardiologySurgery == null || cardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Cardiology surgery not found or not authorized"));
                }

                // Delete the follow-up entity
                _unitOfWork.Repository<SurgeryFollowUp>().Delete(followUp);
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting follow-up"));

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
