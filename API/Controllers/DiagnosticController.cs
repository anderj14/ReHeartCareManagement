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
using Core.Specification.DiagnosticSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages diagnostic records for patients. Provides endpoints for creating, retrieving, updating, and deleting diagnostics.
    /// </summary>
    public class DiagnosticController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="DiagnosticController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public DiagnosticController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of diagnostics for a specified patient.
        /// </summary>
        /// <param name="patientId">ID of the patient whose diagnostics are to be retrieved.</param>
        /// <param name="diagnosticSpecParams">Parameters for filtering and pagination.</param>
        /// <returns>A paginated list of diagnostics for the specified patient.</returns>
        [HttpGet("patient/{patientId}/diagnostics")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetDiagnosticsByPatientId(
            int patientId, [FromQuery] DiagnosticSpecParams diagnosticSpecParams)
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

                // Define the specification for querying diagnostics
                var spec = new DiagnosticSpecification(patientId, diagnosticSpecParams);

                Expression<Func<Diagnostic, bool>> filter = (diagnostic) => diagnostic.PatientId == patientId;

                // Get the total count of diagnostics
                var totalItems = await _unitOfWork.Repository<Diagnostic>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<DiagnosticDto>(new List<DiagnosticDto>(), 0, diagnosticSpecParams.PageIndex, diagnosticSpecParams.PageSize));
                }

                var diagnostics = await _unitOfWork.Repository<Diagnostic>().ListAllByPatientAsync(filter, spec, diagnosticSpecParams.PageIndex, diagnosticSpecParams.PageSize);

                var diagnosticDtos = _mapper.Map<IReadOnlyList<DiagnosticDto>>(diagnostics);

                // Return paginated list with pagination metadata
                var paginatedDiagnostics = new PagedList<DiagnosticDto>(
                    diagnosticDtos.ToList(),
                    totalItems,
                    diagnosticSpecParams.PageIndex,
                    diagnosticSpecParams.PageSize
                );

                Response.AddPaginationHeader(paginatedDiagnostics.MetaData);

                return Ok(diagnosticDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific diagnostic record by patient ID and disease history ID.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="diseaseHistoryId">ID of the diagnostic record.</param>
        /// <returns>The diagnostic record if found, otherwise a 404 Not Found response.</returns>
        [HttpGet("patient/{patientId}/diagnostics/{diagnosticId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<DiagnosticDto>> GetDiagnosticByPatientId(
             int patientId, int diagnosticId)
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

                // Retrieve the specific diagnostic record
                var spec = new DiagnosticSpecification(patientId, diagnosticId);
                var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetEntityWithSpec(spec);

                if (diagnostic == null)
                    return NotFound(new ApiResponse(404, "Diagnostic not found"));

                // Map and return the diagnostic record
                var diagnosticDto = _mapper.Map<DiagnosticDto>(diagnostic);

                return Ok(diagnosticDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing diagnostic record.
        /// </summary>
        /// <param name="id">ID of the diagnostic record to update.</param>
        /// <param name="diseaseHistoryUpdateDto">DTO containing the updated data.</param>
        /// <returns>A 200 OK response if the update is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<DiagnosticDto>> CreateDiagnostic([FromBody] DiagnosticCreateDto diagnosticCreateDto)
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
                var newDiagnostic = _mapper.Map<DiagnosticCreateDto, Diagnostic>(diagnosticCreateDto);

                _unitOfWork.Repository<Diagnostic>().Add(newDiagnostic);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating diagnostic"));

                // Map the new entity to a DTO and return a 201 Created response
                return CreatedAtAction(
                    nameof(GetDiagnosticByPatientId),
                    new { patientId = newDiagnostic.PatientId, diagnosticId = newDiagnostic.Id },
                    diagnosticCreateDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing diagnostic record.
        /// </summary>
        /// <param name="id">ID of the diagnostic record to update.</param>
        /// <param name="diagnosticUpdateDto">DTO containing the updated data.</param>
        /// <returns>A 200 OK response if the update is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpPut]
        [Authorize]
        public async Task<ActionResult<DiagnosticDto>> UpdateDiagnostic(int id, DiagnosticCreateDto diagnosticUpdateDto)
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

                // Retrieve the existing diagnostic record
                var spec = new DiagnosticSpecification(id);
                var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetEntityWithSpec(spec);

                if (diagnostic == null)
                {
                    return NotFound(new ApiResponse(404, "Diagnostic not found"));
                }

                // Verify that the diagnostic belongs to the authenticated user
                var patient = diagnostic.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Validate that the provided PatientId in the DTO matches the diagnostic PatientId
                if (diagnostic.PatientId != diagnosticUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Diagnostic does not belong to the specified patient"));
                }

                // Map the updated DTO data to the existing entity
                _mapper.Map(diagnosticUpdateDto, diagnostic);

                _unitOfWork.Repository<Diagnostic>().Update(diagnostic);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating diagnostic information"));
                }

                return Ok(diagnosticUpdateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a specific diagnostic record.
        /// </summary>
        /// <param name="id">ID of the diagnostic record to delete.</param>
        /// <returns>No content if the deletion is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteDiagnostic(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Retrieve the existing diagnostic record
                var spec = new DiagnosticSpecification(id);
                var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetEntityWithSpec(spec);

                if (diagnostic == null)
                {
                    return NotFound(new ApiResponse(404, "Diagnostic not found"));
                }

                // Verify that the diagnostic belongs to the authenticated user
                var patient = diagnostic.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Delete the entity from the repository
                _unitOfWork.Repository<Diagnostic>().Delete(diagnostic);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting diagnostic information"));
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}