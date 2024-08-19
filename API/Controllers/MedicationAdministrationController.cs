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
    /// Manages medication administration records for holter studies. Provides endpoints for creating, retrieving, updating, and deleting medication administration.
    /// </summary>
    public class MedicationAdministrationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicationAdministrationController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public MedicationAdministrationController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            IUnitOfWork unitOfWork
            )
            : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves a medication administration by its ID.
        /// </summary>
        /// <param name="id">The ID of the medication administration to retrieve.</param>
        /// <returns>The medication administration details.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<MedicationAdministrationDto>> GetMedicationAdministration(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Create and apply a specification to retrieve the medication administration by its ID.
                var spec = new MedicationAdministrationSpecification(id);
                var medicationAdministration = await _unitOfWork.Repository<MedicationAdministration>().GetEntityWithSpec(spec);

                // If the medication administration is not found, return a 404 Not Found response.
                if (medicationAdministration == null)
                {
                    return NotFound(new ApiResponse(404, "Medication administration not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudySpec = new HolterStudySpecification(medicationAdministration.HolterStudyId);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(holterStudySpec);

                // If the HolterStudy is not found or the user is not authorized, return a 404 Not Found response.
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found or not authorized"));
                }

                var medicationAdministrationDto = _mapper.Map<MedicationAdministrationDto>(medicationAdministration);

                return Ok(medicationAdministrationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new medication administration entry.
        /// </summary>
        /// <param name="medicationAdministrationCreateDto">Data transfer object containing the details of the medication administration to be created.</param>
        /// <returns>The created medication administration.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MedicationAdministrationDto>> CreateMedicationAdministration([FromBody] MedicationAdministrationCreateDto medicationAdministrationCreateDto)
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

                var newMedicationAdmin = _mapper.Map<MedicationAdministrationCreateDto, MedicationAdministration>(medicationAdministrationCreateDto);

                _unitOfWork.Repository<MedicationAdministration>().Add(newMedicationAdmin);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating medication administration"));
                var medicationAdminDto = _mapper.Map<MedicationAdministrationDto>(newMedicationAdmin);

                return CreatedAtAction(
                    nameof(GetMedicationAdministration),
                    new { id = newMedicationAdmin.Id },
                    medicationAdminDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing medication administration entry.
        /// </summary>
        /// <param name="id">ID of the medication administration to be updated.</param>
        /// <param name="medicationAdministrationUpdateDto">Data transfer object containing the updated details of the medication administration.</param>
        /// <returns>The updated medication administration details.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateMedicationAdministration(int id, MedicationAdministrationCreateDto medicationAdministrationUpdateDto)
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

                // Create and apply a specification to retrieve the medication administration by its ID.
                var spec = new MedicationAdministrationSpecification(id);
                var medicationAdmin = await _unitOfWork.Repository<MedicationAdministration>().GetEntityWithSpec(spec);

                // If the medication administration is not found, return a 404 Not Found response.
                if (medicationAdmin == null)
                {
                    return NotFound(new ApiResponse(404, "Medication administration not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudy = medicationAdmin.HolterStudy;
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Medication administration not found or not authorized"));
                }

                // Validate that the provided HolterStudyId in the DTO matches the medication administration HolterStudyId
                if (medicationAdmin.HolterStudyId != medicationAdministrationUpdateDto.HolterStudyId)
                {
                    return NotFound(new ApiResponse(404, "Medication administration does not belong to the specified holter study"));
                }

                // Map the update DTO to the existing medication administration entity.
                _mapper.Map(medicationAdministrationUpdateDto, medicationAdmin);

                _unitOfWork.Repository<MedicationAdministration>().Update(medicationAdmin);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating medication administration information"));
                }

                var medicationAdministrationDto = _mapper.Map<MedicationAdministrationDto>(medicationAdmin);

                return Ok(medicationAdministrationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing medication administration entry.
        /// </summary>
        /// <param name="id">ID of the medication administration to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteMedicationAdministration(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Create and apply a specification to retrieve the medication administration by its ID.
                var spec = new MedicationAdministrationSpecification(id);
                var medicationAdmin = await _unitOfWork.Repository<MedicationAdministration>().GetEntityWithSpec(spec);

                // If the medication administration is not found, return a 404 Not Found response.
                if (medicationAdmin == null)
                {
                    return NotFound(new ApiResponse(404, "Medication administration not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to delete it.
                var holterStudy = medicationAdmin.HolterStudy.Patient;
                if (holterStudy == null || holterStudy.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Medication administration not found or not authorized"));
                }

                // Delete the medication administration from the repository.
                _unitOfWork.Repository<MedicationAdministration>().Delete(medicationAdmin);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting medication administration information"));
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
