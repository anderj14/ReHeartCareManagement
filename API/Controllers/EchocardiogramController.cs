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
using Core.Specification.EchocardiogramSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages echocardiogram records for patients. Provides endpoints for creating, retrieving, updating, and deleting diagnostics.
    /// </summary>
    public class EchocardiogramController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="EchocardiogramController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public EchocardiogramController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of echocardiograms for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Specification parameters for pagination and filtering.</param>
        /// <returns>A list of echocardiograms.</returns>
        [HttpGet("patient/{patientId}/echocardiograms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<EchocardiogramDto>>> GetEchocardiogramByPatientId(
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

                // Define the specification for querying diagnostics
                var spec = new EchocardiogramSpecification(patientId, baseSpecParams);

                Expression<Func<Echocardiogram, bool>> filter = (echocardiogram) => echocardiogram.PatientId == patientId;

                // Get the total count of diagnostics
                var totalItems = await _unitOfWork.Repository<Echocardiogram>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<DiagnosticDto>(new List<DiagnosticDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }

                var echocardiograms = await _unitOfWork.Repository<Echocardiogram>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);

                var echocardiogramDtos = _mapper.Map<IReadOnlyList<EchocardiogramDto>>(echocardiograms);

                var paginatedEchocardiograms = new PagedList<EchocardiogramDto>(
                    echocardiogramDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                Response.AddPaginationHeader(paginatedEchocardiograms.MetaData);

                return Ok(echocardiogramDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific echocardiogram by ID for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="echocardiogramId">ID of the echocardiogram.</param>
        /// <returns>The echocardiogram details.</returns>
        [HttpGet("patient/{patientId}/echocardiograms/{echocardiogramId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<EchocardiogramDto>> GetEchocardiogramByPatientId(
            int patientId, int echocardiogramId)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(400, "User not found"));

                // Check if the patient belongs to the authenticated user
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                var spec = new EchocardiogramSpecification(patientId, echocardiogramId);
                var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetEntityWithSpec(spec);

                if (echocardiogram == null)
                    return NotFound(new ApiResponse(404, "Echocardiogram not found"));


                var echocardiogramDto = _mapper.Map<EchocardiogramDto>(echocardiogram);

                return Ok(echocardiogramDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new echocardiogram record.
        /// </summary>
        /// <param name="echocardiogramCreateDto">The echocardiogram data transfer object containing the details.</param>
        /// <returns>Action result indicating the result of the creation.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Echocardiogram>> CreateEchocardiogram(EchocardiogramCreateDto echocardiogramCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User no found"));

                var newEchocardiogram = _mapper.Map<EchocardiogramCreateDto, Echocardiogram>(echocardiogramCreateDto);

                _unitOfWork.Repository<Echocardiogram>().Add(newEchocardiogram);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating echocardiogram"));

                return CreatedAtAction(
                    nameof(GetEchocardiogramByPatientId),
                    new { patientId = newEchocardiogram.PatientId, echocardiogramId = newEchocardiogram.Id },
                    echocardiogramCreateDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing echocardiogram record.
        /// </summary>
        /// <param name="id">ID of the echocardiogram to update.</param>
        /// <param name="echocardiogramUpdateDto">The echocardiogram data transfer object containing the updated details.</param>
        /// <returns>Action result indicating the result of the update.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<EchocardiogramDto>> UpdateEchocardiogram(int id, EchocardiogramCreateDto echocardiogramUpdateDto)
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

                var spec = new EchocardiogramSpecification(id);
                var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetEntityWithSpec(spec);

                if (echocardiogram == null)
                {
                    return NotFound(new ApiResponse(404, "Echocardiogram not found"));
                }

                var patient = echocardiogram.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                _mapper.Map(echocardiogramUpdateDto, echocardiogram);

                _unitOfWork.Repository<Echocardiogram>().Update(echocardiogram);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating echocardiogram information"));
                }

                var echocardiogramDto = _mapper.Map<EchocardiogramDto>(echocardiogram);
                return Ok(echocardiogramDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an echocardiogram record.
        /// </summary>
        /// <param name="id">ID of the echocardiogram to delete.</param>
        /// <returns>Action result indicating the result of the deletion.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteEchocardiogram(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                var spec = new EchocardiogramSpecification(id);
                var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetEntityWithSpec(spec);

                if (echocardiogram == null)
                {
                    return NotFound(new ApiResponse(404, "Echocardiogram not found"));
                }

                var patient = echocardiogram.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                _unitOfWork.Repository<Echocardiogram>().Delete(echocardiogram);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting echocardiogram information"));
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
