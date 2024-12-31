using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Core.Specification.SurgeryFollowUpSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages medications records for surgery follow ups. Provides endpoints for creating, retrieving, updating, and deleting medications.
    /// </summary>
    public class MedicationsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicationController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public MedicationsController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
            ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a medication by its ID.
        /// </summary>
        /// <param name="id">The ID of the medication to retrieve.</param>
        /// <returns>The medication details.</returns>
        /// 
        /// <summary>
        /// Retrieves a specific medication for a surgery follow up by its ID.
        /// </summary>
        /// <param name="followUpId">ID of the cardiology surgery.</param>
        /// <returns>The requested medication.</returns>
        [HttpGet("followup/{followUpId}/medications")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<MedicationDto>>> GetMedicationsByFollowUpId(int followUpId)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                var followUpSpec = new SurgeryFollowUpSpecification(followUpId);
                var followUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(followUpSpec);


                if (followUp == null || followUp.CardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Surgery follow up not found or not authorized"));
                }

                // Create and apply a specification to retrieve the medication by its ID.
                var spec = new MedicationSpecification(followUpId);
                var medication = await _unitOfWork.Repository<Medication>().ListAsync(spec);

                var medicationDto = _mapper.Map<IReadOnlyList<MedicationDto>>(medication);

                return Ok(medicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific medication for a follow up by its ID.
        /// </summary>
        /// <param name="cardiologySurgeryId">ID of the follow up.</param>
        /// <param name="followUpId">ID of the medication.</param>
        /// <returns>The requested medication.</returns>
        [HttpGet("followup/{followUpId}/medications/{medicationId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<MedicationDto>> GetMedicationByFollowUpId(int followUpId, int medicationId)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                var followUpSpec = new SurgeryFollowUpSpecification(followUpId);
                var followUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(followUpSpec);


                if (followUp == null || followUp.CardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Surgery follow up not found or not authorized"));
                }

                // Create and apply a specification to retrieve the medication by its ID.
                var spec = new MedicationSpecification(followUpId, medicationId);
                var medication = await _unitOfWork.Repository<Medication>().GetEntityWithSpec(spec);

                // If the medication is not found, return a 404 Not Found response.
                if (medication == null)
                {
                    return NotFound(new ApiResponse(404, "Medication not found"));
                }

                var medicationDto = _mapper.Map<MedicationDto>(medication);

                return Ok(medicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new medication entry.
        /// </summary>
        /// <param name="medicationCreateDto">Data transfer object containing the details of the medication to be created.</param>
        /// <returns>The created medication.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MedicationDto>> CreateMedication([FromBody] MedicationCreateDto medicationCreateDto)
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

                var newMedication = _mapper.Map<MedicationCreateDto, Medication>(medicationCreateDto);

                _unitOfWork.Repository<Medication>().Add(newMedication);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating medication"));
                var medicationDto = _mapper.Map<MedicationDto>(newMedication);

                // return CreatedAtAction(
                //     nameof(GetMedicationByFollowUpId),
                //     new { surgeryFollowUpId = newMedication.SurgeryFollowUpId ,id = newMedication.Id },
                //     medicationDto
                // );
                return Ok(medicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing medication entry.
        /// </summary>
        /// <param name="id">ID of the medication to be updated.</param>
        /// <param name="medicationUpdateDto">Data transfer object containing the updated details of the medication.</param>
        /// <returns>The updated medication details.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateMedication(int id, MedicationCreateDto medicationUpdateDto)
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

                // Create and apply a specification to retrieve the medication by its ID.
                var spec = new MedicationSpecification(id);
                var medication = await _unitOfWork.Repository<Medication>().GetEntityWithSpec(spec);

                // If the medication is not found, return a 404 Not Found response.
                if (medication == null)
                {
                    return NotFound(new ApiResponse(404, "Medication not found"));
                }

                // Retrieve the associated SurgeryFollowUp to check if the authenticated user is authorized to access it.
                var surgeryFollowUp = medication.SurgeryFollowUp;
                if (surgeryFollowUp == null || surgeryFollowUp.CardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Surgery follow-up not found or not authorized"));
                }

                // Validate that the provided SurgeryFollowUpId in the DTO matches the medication SurgeryFollowUpId
                if (medication.SurgeryFollowUpId != medicationUpdateDto.SurgeryFollowUpId)
                {
                    return NotFound(new ApiResponse(404, "Medication does not belong to the specified surgery follow up"));
                }

                // Map the update DTO to the existing medication entity.
                _mapper.Map(medicationUpdateDto, medication);

                _unitOfWork.Repository<Medication>().Update(medication);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating medication information"));
                }

                var medicationDto = _mapper.Map<MedicationDto>(medication);

                return Ok(medicationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing medication entry.
        /// </summary>
        /// <param name="id">ID of the medication to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteMedication(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Create and apply a specification to retrieve the medication by its ID.
                var spec = new MedicationSpecification(id);
                var medication = await _unitOfWork.Repository<Medication>().GetEntityWithSpec(spec);

                // If the medication is not found, return a 404 Not Found response.
                if (medication == null)
                {
                    return NotFound(new ApiResponse(404, "Medication not found"));
                }

                // Retrieve the associated SurgeryFollowUp to check if the authenticated user is authorized to delete it.
                var surgeryFollowUp = medication.SurgeryFollowUp;
                if (surgeryFollowUp == null || surgeryFollowUp.CardiologySurgery.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Surgery follow-up not found or not authorized"));
                }

                _unitOfWork.Repository<Medication>().Delete(medication);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting medication information"));
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
