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
    /// Manages electrocardiograms records for patients. Provides endpoints for creating, retrieving, updating, and deleting electrocardiograms.
    /// </summary>
    public class ElectrocardiogramController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Constructor for the ElectrocardiogramController.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for accessing the database.</param>
        /// <param name="mapper">Mapper for converting between entities and DTOs.</param>
        /// <param name="userManager">User manager for managing user authentication.</param>
        public ElectrocardiogramController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of electrocardiograms for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Specification parameters for pagination and filtering.</param>
        /// <returns>A list of electrocardiograms.</returns>
        [HttpGet("patient/{patientId}/electrocardiograms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<ElectrocardiogramDto>>> GetElectrocardiogramsByPatientId(
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

                // Define the specification for querying electrocardiograms
                var spec = new ElectrocardiogramSpecification(patientId, baseSpecParams);
                Expression<Func<Electrocardiogram, bool>> filter = (electrocardiogram) => electrocardiogram.PatientId == patientId;

                // Get the total count of electrocardiograms
                var totalItems = await _unitOfWork.Repository<Electrocardiogram>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<ElectrocardiogramDto>(new List<ElectrocardiogramDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }
                var electrocardiograms = await _unitOfWork.Repository<Electrocardiogram>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);
                var electrocardiogramsDtos = _mapper.Map<IReadOnlyList<ElectrocardiogramDto>>(electrocardiograms);

                // Return paginated list with pagination metadata
                var paginatedElectrocardiograms = new PagedList<ElectrocardiogramDto>(
                    electrocardiogramsDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                Response.AddPaginationHeader(paginatedElectrocardiograms.MetaData);
                return Ok(paginatedElectrocardiograms);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific electrocardiogram by ID for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="electrocardiogramId">ID of the electrocardiogram.</param>
        /// <returns>The electrocardiogram record if found, otherwise a 404 Not Found response.</returns>
        [HttpGet("patient/{patientId}/electrocardiograms/{electrocardiogramId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<ElectrocardiogramDto>> GetElectrocardiogramByPatientId(int patientId, int electrocardiogramId)
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

                // Retrieve the specific electrocardiogram record
                var spec = new ElectrocardiogramSpecification(patientId, electrocardiogramId);
                var electrocardiogram = await _unitOfWork.Repository<Electrocardiogram>().GetEntityWithSpec(spec);

                if (electrocardiogram == null)
                    return NotFound(new ApiResponse(404, "Electrocardiogram not found"));

                // Map and return the electrocardiogram record
                var electrocardiogramDto = _mapper.Map<ElectrocardiogramDto>(electrocardiogram);

                return Ok(electrocardiogramDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new electrocardiogram record.
        /// </summary>
        /// <param name="electrocardiogramCreateDto">DTO containing the data for the new electrocardiogram record.</param>
        /// <returns>The created electrocardiogram record, or a 400 Bad Request if there was an issue.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateElectrocardiogram(ElectrocardiogramCreateDto electrocardiogramCreateDto)
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

                // Map the DTO to a new electrocardiogram entity and add it to the repository
                var newElectrocardiogram = _mapper.Map<ElectrocardiogramCreateDto, Electrocardiogram>(electrocardiogramCreateDto);

                _unitOfWork.Repository<Electrocardiogram>().Add(newElectrocardiogram);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating electrocardiogram"));

                // Map the new entity to a DTO and return a 201 Created response
                var electrocardiogramDto = _mapper.Map<ElectrocardiogramDto>(newElectrocardiogram);

                return CreatedAtAction(
                    nameof(GetElectrocardiogramsByPatientId),
                    new { patientId = newElectrocardiogram.PatientId, diagnosticId = newElectrocardiogram.Id },
                    electrocardiogramDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing electrocardiogram record.
        /// </summary>
        /// <param name="id">ID of the electrocardiogram to update.</param>
        /// <param name="electrocardiogramUpdateDto">The electrocardiogram data transfer object containing the updated details.</param>
        /// <returns>A 200 OK response if the update is successful, or a 400 Bad Request if there was an issue.</returns>
        [HttpPut]
        [Authorize]
        public async Task<ActionResult> UpdateDiagnostic(int id, ElectrocardiogramCreateDto electrocardiogramUpdateDto)
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
                var spec = new ElectrocardiogramSpecification(id);
                var electrocardiogram = await _unitOfWork.Repository<Electrocardiogram>().GetEntityWithSpec(spec);

                if (electrocardiogram == null)
                {
                    return NotFound(new ApiResponse(404, "Electrocardiogram not found"));
                }

                // Verify that the diagnostic belongs to the authenticated user
                var patient = electrocardiogram.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Map the updated DTO data to the existing entity
                _mapper.Map(electrocardiogramUpdateDto, electrocardiogram);

                _unitOfWork.Repository<Electrocardiogram>().Update(electrocardiogram);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating electrocardiogram information"));
                }

                return Ok(electrocardiogramUpdateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an electrocardiogram record.
        /// </summary>
        /// <param name="id">ID of the electrocardiogram to delete.</param>
        /// <returns>Action result indicating the result of the deletion.</returns>
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

                var spec = new ElectrocardiogramSpecification(id);
                var electrocardiogram = await _unitOfWork.Repository<Electrocardiogram>().GetEntityWithSpec(spec);

                if (electrocardiogram == null)
                {
                    return NotFound(new ApiResponse(404, "Electrocardiogram not found"));
                }

                // Verify that the electrocardiogram belongs to the authenticated user
                var patient = electrocardiogram.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Delete the entity from the repository
                _unitOfWork.Repository<Electrocardiogram>().Delete(electrocardiogram);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting electrocardiogram information"));
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
