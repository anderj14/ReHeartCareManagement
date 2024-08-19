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
    /// Controller for managing arrhythmia events. Provides endpoints for creating, retrieving, updating, and deleting arrhythmia events.
    /// </summary>
    public class ArrhythmiaEventsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="ArrhythmiaEventsController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public ArrhythmiaEventsController(IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager)
            : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves an arrhythmia event by its ID.
        /// </summary>
        /// <param name="id">ID of the arrhythmia event.</param>
        /// <returns>The requested arrhythmia event.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<ArrhythmiaEventDto>> GetArrhythmiaEvent(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Create and apply a specification to retrieve the arrhythmia event by its ID.
                var spec = new ArrhythmiaEventSpecification(id);
                var arrhythmiaEvent = await _unitOfWork.Repository<ArrhythmiaEvent>().GetEntityWithSpec(spec);

                // If the arrhythmia event is not found, return a 404 Not Found response.
                if (arrhythmiaEvent == null)
                {
                    return NotFound(new ApiResponse(404, "Arrhythmia event not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudySpec = new HolterStudySpecification(arrhythmiaEvent.HolterStudyId);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(holterStudySpec);

                // If the HolterStudy is not found or the user is not authorized, return a 404 Not Found response.
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found or not authorized"));
                }

                var arrhythmiaEventDto = _mapper.Map<ArrhythmiaEventDto>(arrhythmiaEvent);

                return Ok(arrhythmiaEventDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Handles the creation of a new arrhythmia event by mapping the provided data transfer object 
        /// to the corresponding entity and saving it to the database.
        /// </summary>
        /// <param name="arrhythmiaEventCreateDto">Data transfer object containing the details of the arrhythmia event to be created.</param>
        /// <returns>The created arrhythmia event.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ArrhythmiaEventDto>> CreateArrhythmiaEvent([FromBody] ArrhythmiaEventCreateDto arrhythmiaEventCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                var newArrhythmiaEvent = _mapper.Map<ArrhythmiaEventCreateDto, ArrhythmiaEvent>(arrhythmiaEventCreateDto);

                _unitOfWork.Repository<ArrhythmiaEvent>().Add(newArrhythmiaEvent);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating arrhythmia event"));

                var arrhythmiaEventDto = _mapper.Map<ArrhythmiaEventDto>(newArrhythmiaEvent);

                return CreatedAtAction(
                    nameof(GetArrhythmiaEvent),
                    new { id = newArrhythmiaEvent.Id },
                    arrhythmiaEventDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        /// <summary>
        /// Updates an existing arrhythmia event by applying the changes from the provided data transfer object.
        /// </summary>
        /// <param name="id">ID of the arrhythmia event to be updated.</param>
        /// <param name="arrhythmiaEventUpdateDto">Data transfer object containing the updated details of the arrhythmia event.</param>
        /// <returns>The updated arrhythmia event.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<ArrhythmiaEventDto>> UpdateArrhythmiaEvent(int id, ArrhythmiaEventCreateDto arrhythmiaEventUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Fetch the existing arrhythmia event using its ID.
                var spec = new ArrhythmiaEventSpecification(id);
                var arrhythmiaEvent = await _unitOfWork.Repository<ArrhythmiaEvent>().GetEntityWithSpec(spec);

                if (arrhythmiaEvent == null)
                {
                    return NotFound(new ApiResponse(404, "Arrhythmia event not found"));
                }

                // Ensure the authenticated user is authorized to update the arrhythmia event.
                var holterStudy = arrhythmiaEvent.HolterStudy;
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Arrhythmia event not found or not authorized"));
                }

                // Validate that the provided HolterStudyId in the DTO matches the arrhythmia event HolterStudyId
                if (arrhythmiaEvent.HolterStudyId != arrhythmiaEventUpdateDto.HolterStudyId)
                {
                    return NotFound(new ApiResponse(404, "Arrhythmia event does not belong to the specified holter study"));
                }

                // Map the updated DTO data to the existing arrhythmia event entity.
                _mapper.Map(arrhythmiaEventUpdateDto, arrhythmiaEvent);

                _unitOfWork.Repository<ArrhythmiaEvent>().Update(arrhythmiaEvent);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating arrhythmia event information"));
                }

                var updatedArrhythmiaEventDto = _mapper.Map<ArrhythmiaEventDto>(arrhythmiaEvent);

                return Ok(updatedArrhythmiaEventDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing arrhythmia event from the system.
        /// </summary>
        /// <param name="id">ID of the arrhythmia event to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteArrhythmiaEvent(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Fetch the arrhythmia event using the specified ID.
                var spec = new ArrhythmiaEventSpecification(id);
                var arrhythmiaEvent = await _unitOfWork.Repository<ArrhythmiaEvent>().GetEntityWithSpec(spec);

                if (arrhythmiaEvent == null)
                {
                    return NotFound(new ApiResponse(404, "Arrhythmia event not found"));
                }

                // Ensure the authenticated user is authorized to delete the arrhythmia event.
                var holterStudy = arrhythmiaEvent.HolterStudy.Patient;
                if (holterStudy == null || holterStudy.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Arrhythmia event not found or not authorized"));
                }

                // Delete the arrhythmia event from the repository.
                _unitOfWork.Repository<ArrhythmiaEvent>().Delete(arrhythmiaEvent);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting arrhythmia event information"));
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