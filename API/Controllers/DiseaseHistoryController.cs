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
using Core.Specification.DiseaseHistorySpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages disease history records for patients. Provides endpoints for creating, retrieving, updating, and deleting disease histories.
    /// </summary>
    public class DiseaseHistoryController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="DiseaseHistoryController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public DiseaseHistoryController(
            IUnitOfWork unitOfWork,
            IMapper mapper, UserManager<AppUser> userManager) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of disease histories for a specified patient.
        /// </summary>
        /// <param name="patientId">ID of the patient whose disease histories are to be retrieved.</param>
        /// <param name="diseaseHistorySpecParams">Parameters for filtering and pagination.</param>
        /// <returns>A paginated list of disease histories for the specified patient.</returns>
        [HttpGet("patient/{patientId}/diseasesHistories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<DiseaseHistoryDto>>> GetDiseaseHistoriesByPatientId(
            int patientId, [FromQuery] DiseaseHistorySpecParams diseaseHistorySpecParams)
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
                return Unauthorized(new ApiResponse(401, "User not found"));

            // Fetch the patient and verify ownership
            var patientSpec = new PatientWithAllSpecification(patientId);
            var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

            if (patient == null || patient.AppUserId != user.Id)
                return NotFound(new ApiResponse(404, "Patient not found or not authorized"));

            // Define the specification for querying disease histories
            var spec = new DiseaseHistorySpecification(patientId, diseaseHistorySpecParams);
            Expression<Func<DiseaseHistory, bool>> filter = (diseaseHistory) => diseaseHistory.PatientId == patientId;

            // Get the total count of disease histories
            var totalItems = await _unitOfWork.Repository<DiseaseHistory>().CountByPatientAsync(filter, spec);

            if (totalItems == 0)
                return Ok(new PagedList<DiseaseHistoryDto>(new List<DiseaseHistoryDto>(), 0, diseaseHistorySpecParams.PageIndex, diseaseHistorySpecParams.PageSize));

            var diseasesHistories = await _unitOfWork.Repository<DiseaseHistory>().ListAllByPatientAsync(filter, spec, diseaseHistorySpecParams.PageIndex, diseaseHistorySpecParams.PageSize);
            var diseasesHistoriesDtos = _mapper.Map<IReadOnlyList<DiseaseHistoryDto>>(diseasesHistories);

            // Return paginated list with pagination metadata
            var paginatedDiagnostics = new PagedList<DiseaseHistoryDto>(
                diseasesHistoriesDtos.ToList(),
                totalItems,
                diseaseHistorySpecParams.PageIndex,
                diseaseHistorySpecParams.PageSize
            );

            Response.AddPaginationHeader(paginatedDiagnostics.MetaData);
            return Ok(diseasesHistoriesDtos);
        }

        /// <summary>
        /// Retrieves a specific disease history record by patient ID and disease history ID.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="diseaseHistoryId">ID of the disease history record.</param>
        /// <returns>The disease history record if found, otherwise a 404 Not Found response.</returns>
        [HttpGet("patient/{patientId}/diseasehistories/{diseaseHistoryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<DiseaseHistoryDto>> GetDiseaseHistoryIdByPatientId(
            int patientId, int diseaseHistoryId)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Fetch the patient and verify ownership
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));

                // Retrieve the specific disease history record
                var spec = new DiseaseHistorySpecification(patientId, diseaseHistoryId);
                var diseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetEntityWithSpec(spec);

                if (diseaseHistory == null)
                    return NotFound(new ApiResponse(404, "Disease history not found"));

                // Map and return the disease history record
                var diseaseHistoryDto = _mapper.Map<DiseaseHistoryDto>(diseaseHistory);
                return Ok(diseaseHistoryDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new disease history record.
        /// </summary>
        /// <param name="diseaseHistoryCreateDto">DTO containing the data for the new disease history record.</param>
        /// <returns>The created disease history record, or a 400 Bad Request if there was an issue.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<DiseaseHistoryDto>> CreateDiseaseHistory([FromBody] DiseaseHistoryCreateDto diseaseHistoryCreateDto)
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

                // Map the DTO to a new DiseaseHistory entity and add it to the repository
                var newDiseaseHistory = _mapper.Map<DiseaseHistoryCreateDto, DiseaseHistory>(diseaseHistoryCreateDto);
                _unitOfWork.Repository<DiseaseHistory>().Add(newDiseaseHistory);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                    return BadRequest(new ApiResponse(400, "Problem creating disease history"));

                // Map the new entity to a DTO and return a 201 Created response
                var diseaseHistoryDto = _mapper.Map<DiseaseHistory, DiseaseHistoryDto>(newDiseaseHistory);

                return CreatedAtAction(
                    nameof(GetDiseaseHistoryIdByPatientId),
                    new { patientId = newDiseaseHistory.PatientId, diseaseHistoryId = newDiseaseHistory.Id },
                    diseaseHistoryDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing disease history record.
        /// </summary>
        /// <param name="id">ID of the disease history record to update.</param>
        /// <param name="diseaseHistoryUpdateDto">DTO containing the updated data.</param>
        /// <returns>A 200 OK response if the update is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateDiseaseHistory(int id, DiseaseHistoryCreateDto diseaseHistoryUpdateDto)
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

                // Retrieve the existing disease history record
                var spec = new DiseaseHistorySpecification(id);
                var existingDiseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetEntityWithSpec(spec);

                if (existingDiseaseHistory == null)
                {
                    return NotFound(new ApiResponse(404, "Disease history not found"));
                }

                // Verify that the disease history belongs to the authenticated user
                var patient = existingDiseaseHistory.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Map the updated DTO data to the existing entity
                _mapper.Map(diseaseHistoryUpdateDto, existingDiseaseHistory);
                _unitOfWork.Repository<DiseaseHistory>().Update(existingDiseaseHistory);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating disease history information"));
                }

                return Ok(diseaseHistoryUpdateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a specific disease history record.
        /// </summary>
        /// <param name="id">ID of the disease history record to delete.</param>
        /// <returns>No content if the deletion is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteDiseaseHistory(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Retrieve the existing disease history record
                var spec = new DiseaseHistorySpecification(id);
                var diseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetEntityWithSpec(spec);

                if (diseaseHistory == null)
                {
                    return NotFound(new ApiResponse(404, "Disease history not found"));
                }

                // Verify that the disease history belongs to the authenticated user
                var patient = diseaseHistory.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Delete the entity from the repository
                _unitOfWork.Repository<DiseaseHistory>().Delete(diseaseHistory);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting disease history information"));

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
