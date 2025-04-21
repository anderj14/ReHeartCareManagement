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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages physical examinations records for patients. Provides endpoints for creating, retrieving, updating, and deleting physical examinations.
    /// </summary>
    public class PhysicalExaminationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Constructor for the PhysicalExaminationController.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for accessing the database.</param>
        /// <param name="mapper">Mapper for converting between entities and DTOs.</param>
        /// <param name="userManager">User manager for managing user authentication.</param>
        public PhysicalExaminationController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of physical examinations for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Specification parameters for pagination and filtering.</param>
        /// <returns>A list of physical examinations.</returns>
        [HttpGet("patient/{patientId}/physical-examinations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<PhysicalExaminationDto>>> GetPhysicalExaminationsByPatientId(
            int patientId, [FromQuery] BaseSpecParams baseSpecParams)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(400, "User not found"));

                // Fetch the patient and verify ownership
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Define the specification for querying physical examinations
                var spec = new PhysicalExaminationSpecification(patientId, baseSpecParams);
                Expression<Func<PhysicalExamination, bool>> filter = (physicalExamination) => physicalExamination.PatientId == patientId;

                // Get the total count of physical examinations
                var totalItems = await _unitOfWork.Repository<PhysicalExamination>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<PhysicalExaminationDto>(new List<PhysicalExaminationDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }
                var physicalExaminations = await _unitOfWork.Repository<PhysicalExamination>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);
                var physicalExaminationsDtos = _mapper.Map<IReadOnlyList<PhysicalExaminationDto>>(physicalExaminations);

                // Return paginated list with pagination metadata
                var paginatedPhysicalExaminations = new PagedList<PhysicalExaminationDto>(
                    physicalExaminationsDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                Response.AddPaginationHeader(paginatedPhysicalExaminations.MetaData);
                return Ok(paginatedPhysicalExaminations);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific physical examination by ID for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="physicalExaminationId">ID of the physical examination.</param>
        /// <returns>The physical examination record if found, otherwise a 404 Not Found response.</returns>
        [HttpGet("patient/{patientId}/physical-examinations/{physicalExaminationId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<PhysicalExaminationDto>> GetPhysicalExaminationByPatientId(int patientId, int physicalExaminationId)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(400, "User not found"));

                // Fetch the patient and verify ownership
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Retrieve the specific physical examination record
                var spec = new PhysicalExaminationSpecification(patientId, physicalExaminationId);
                var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetEntityWithSpec(spec);

                if (physicalExamination == null)
                    return NotFound(new ApiResponse(404, "Physical examination not found"));

                // Map and return the physical examination record
                var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(physicalExamination);

                return Ok(physicalExaminationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new physical examination record.
        /// </summary>
        /// <param name="physicalExaminationCreateDto">DTO containing the data for the new physical examination record.</param>
        /// <returns>The created physical examination record, or a 400 Bad Request if there was an issue.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PhysicalExaminationDto>> CreatePhysicalExamination(PhysicalExaminationCreateDto physicalExaminationCreateDto)
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

                // Map the DTO to a new physical examination entity and add it to the repository
                var newPhysicalExamination = _mapper.Map<PhysicalExaminationCreateDto, PhysicalExamination>(physicalExaminationCreateDto);

                _unitOfWork.Repository<PhysicalExamination>().Add(newPhysicalExamination);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating physical examination"));

                // Map the new entity to a DTO and return a 201 Created response
                var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(newPhysicalExamination);

                return CreatedAtAction(
                    nameof(GetPhysicalExaminationsByPatientId),
                    new { patientId = newPhysicalExamination.PatientId, physicalExaminationId = newPhysicalExamination.Id },
                    physicalExaminationDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing physical examination record.
        /// </summary>
        /// <param name="id">ID of the physical examination to update.</param>
        /// <param name="physicalExaminationUpdateDto">The physical examination data transfer object containing the updated details.</param>
        /// <returns>A 200 OK response if the update is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdatePhysicalExamination(int id, PhysicalExaminationCreateDto physicalExaminationUpdateDto)
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

                // Retrieve the existing physical examination record
                var spec = new PhysicalExaminationSpecification(id);
                var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetEntityWithSpec(spec);

                if (physicalExamination == null)
                {
                    return NotFound(new ApiResponse(404, "Physical examination not found"));
                }

                // Verify that the physical examination belongs to the authenticated user
                var patient = physicalExamination.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Validate that the provided patientId in the DTO matches the physical examination patientId
                if (physicalExamination.PatientId != physicalExaminationUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Stress test does not belong to the specified Patient"));
                }

                // Map the updated DTO data to the existing entity
                _mapper.Map(physicalExaminationUpdateDto, physicalExamination);

                // Update the entity in the repository
                _unitOfWork.Repository<PhysicalExamination>().Update(physicalExamination);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating physical examination"));
                }

                var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(physicalExamination);

                return Ok(physicalExaminationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a physical examination record.
        /// </summary>
        /// <param name="id">ID of the physical examination to delete.</param>
        /// <returns>A 204 No Content response if the deletion is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeletePhysicalExamination(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Retrieve the physical examination record to delete
                var spec = new PhysicalExaminationSpecification(id);
                var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetEntityWithSpec(spec);

                if (physicalExamination == null)
                {
                    return NotFound(new ApiResponse(404, "Physical examination not found"));
                }

                // Verify that the physical examination belongs to the authenticated user
                var patient = physicalExamination.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Remove the physical examination record from the repository
                _unitOfWork.Repository<PhysicalExamination>().Delete(physicalExamination);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting physical examination"));
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
