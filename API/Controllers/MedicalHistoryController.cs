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
    /// Manages medical history records for patients. Provides endpoints for creating, retrieving, updating, and deleting medical histories.
    /// </summary>
    public class MedicalHistoryController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="MedicalHistoryController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public MedicalHistoryController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves medical histories for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        /// <returns>A list of medical histories.</returns>
        [HttpGet("patient/{patientId}/medicalHistories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<MedicalHistoryDto>>> GetMedicalHistoriesByPatientId(
            int patientId, [FromQuery] BaseSpecParams baseSpecParams)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(400, "User not found"));

                // Define specification to get the patient with all related data
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                // Check if the patient exists and if the authenticated user is authorized
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Define specification to get the medical histories for the patient with pagination and sorting
                var spec = new MedicalHistorySpecification(patientId, baseSpecParams);

                // Define a filter for medical histories based on the patient ID
                Expression<Func<MedicalHistory, bool>> filter = (history) => history.PatientId == patientId;

                // Get the total count of medical histories matching the filter
                var totalItems = await _unitOfWork.Repository<MedicalHistory>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<MedicalHistoryDto>(new List<MedicalHistoryDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }

                // Get the list of medical histories for the patient with pagination
                var medicalHistories = await _unitOfWork.Repository<MedicalHistory>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);

                // Map the list of medical histories to DTOs
                var medicalHistoriesDtos = _mapper.Map<IReadOnlyList<MedicalHistoryDto>>(medicalHistories);

                // Create a paginated list of medical history DTOs
                var paginatedMedicalHistories = new PagedList<MedicalHistoryDto>(
                    medicalHistoriesDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedMedicalHistories.MetaData);
                return Ok(medicalHistoriesDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific medical history for a patient by its ID.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="medicalHistoryId">ID of the medical history.</param>
        /// <returns>The requested medical history.</returns>
        [HttpGet("patient/{patientId}/medicalHistories/{medicalHistoryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<MedicalHistoryDto>> GetMedicalHistoryByPatientId(int patientId, int medicalHistoryId)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(400, "User not found"));

                // Define specification to get the patient with all related data
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                // Check if the patient exists and if the authenticated user is authorized
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Define specification to get the medical history by patient ID and medical history ID
                var spec = new MedicalHistorySpecification(patientId, medicalHistoryId);
                var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetEntityWithSpec(spec);

                // Check if the medical history exists
                if (medicalHistory == null)
                    return NotFound(new ApiResponse(404, "Medical history not found"));

                // Map the medical history to a DTO
                var medicalHistoryDto = _mapper.Map<MedicalHistoryDto>(medicalHistory);

                return Ok(medicalHistoryDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new medical history.
        /// </summary>
        /// <param name="medicalHistoryCreateDto">Data transfer object containing the details of the medical history to be created.</param>
        /// <returns>The created medical history.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MedicalHistoryDto>> CreateMedicalHistory(MedicalHistoryCreateDto medicalHistoryCreateDto)
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

                // Map the DTO to a new medical history entity
                var newMedicalHistory = _mapper.Map<MedicalHistoryCreateDto, MedicalHistory>(medicalHistoryCreateDto);

                // Add the new medical history to the repository
                _unitOfWork.Repository<MedicalHistory>().Add(newMedicalHistory);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating medical history"));

                // Map the new medical history to a DTO
                var medicalHistoryDto = _mapper.Map<MedicalHistoryDto>(newMedicalHistory);

                return CreatedAtAction(
                    nameof(GetMedicalHistoryByPatientId),
                    new { patientId = newMedicalHistory.PatientId, medicalHistoryId = newMedicalHistory.Id },
                    medicalHistoryDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing medical history.
        /// </summary>
        /// <param name="id">ID of the medical history to be updated.</param>
        /// <param name="medicalHistoryUpdateDto">Data transfer object containing the updated details of the medical history.</param>
        /// <returns>No content if successful.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateMedicalHistory(int id, MedicalHistoryCreateDto medicalHistoryUpdateDto)
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
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Define specification to get the medical history by ID
                var spec = new MedicalHistorySpecification(id);
                var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetEntityWithSpec(spec);

                // Check if the medical history exists
                if (medicalHistory == null)
                {
                    return NotFound(new ApiResponse(404, "Medical history not found"));
                }

                // Check if the patient is associated with the authenticated user
                var patient = medicalHistory.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Validate that the provided PatientId in the DTO matches the medical history PatientId
                if (medicalHistory.PatientId != medicalHistoryUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Medical history does not belong to the specified patient"));
                }

                // Map the updated DTO to the existing medical history entity
                _mapper.Map(medicalHistoryUpdateDto, medicalHistory);

                // Update the medical history in the repository
                _unitOfWork.Repository<MedicalHistory>().Update(medicalHistory);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating medical history"));
                }

                return Ok(medicalHistoryUpdateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing medical history.
        /// </summary>
        /// <param name="id">ID of the medical history to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteMedicalHistory(int id)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Define specification to get the medical history by ID
                var spec = new MedicalHistorySpecification(id);
                var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetEntityWithSpec(spec);

                // Check if the medical history exists
                if (medicalHistory == null)
                {
                    return NotFound(new ApiResponse(404, "Medical history not found"));
                }

                // Check if the patient is associated with the authenticated user
                var patient = medicalHistory.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Delete the medical history from the repository
                _unitOfWork.Repository<MedicalHistory>().Delete(medicalHistory);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting medical history"));
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
