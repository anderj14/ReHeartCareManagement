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
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Manages treatments records for patients. Provides endpoints for creating, retrieving, updating, and deleting treatments.
    /// </summary>
    public class TreatmentController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="TreatmentController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public TreatmentController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a list of treatments for a patient, optionally paginated.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="treatmentParams">Pagination and filter parameters.</param>
        /// <returns>List of treatments.</returns>
        [HttpGet("patient/{patientId}/treatments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]

        public async Task<ActionResult<IReadOnlyList<TreatmentDto>>> GetTreatmentsByPatientId(
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

                // Define the specification for getting treatments based on patient ID and pagination parameters
                var spec = new TreatmentSpecification(patientId, baseSpecParams);

                // Define a filter for treatments based on the patient ID
                Expression<Func<Treatment, bool>> filter = (treatments) => treatments.PatientId == patientId;

                // Get the total count of treatments
                var totalItems = await _unitOfWork.Repository<Treatment>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<TreatmentDto>(new List<TreatmentDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }

                // Retrieve the treatments from the repository
                var treatments = await _unitOfWork.Repository<Treatment>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);

                // Map the treatments to DTOs
                var treatmentsDtos = _mapper.Map<IReadOnlyList<TreatmentDto>>(treatments);

                // Return the paginated result
                var paginatedTreatments = new PagedList<TreatmentDto>(
                    treatmentsDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedTreatments.MetaData);
                return Ok(treatmentsDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific treatment for a patient b its ID.
        /// </summary>
        /// <param name="patientId"> ID of the patient.</param>
        /// <param name="treatmentId"> ID of the treatment.</param>
        /// <returns>the request treatment</returns>
        [HttpGet("patient/{patientId}/treatments/{treatmentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<TreatmentDto>> GetTreatmentByPatientId(int patientId, int treatmentId)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Define specification to get the patient with all related data
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));

                var spec = new TreatmentSpecification(patientId, treatmentId);
                var treatment = await _unitOfWork.Repository<Treatment>().GetEntityWithSpec(spec);

                if (treatment == null)
                    return NotFound(new ApiResponse(404, "Treatment not found"));

                var treatmentDto = _mapper.Map<TreatmentDto>(treatment);

                return Ok(treatmentDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new treatment record for a patient.
        /// </summary>
        /// <param name="treatmentCreateDto">DTO containing treatment details.</param>
        /// <returns>Created treatment.</returns>
        [HttpPost]
        public async Task<ActionResult<TreatmentDto>> CreateTreatment(TreatmentCreateDto treatmentCreateDto)
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

                // Map the DTO to a treatment entity
                var newTreatment = _mapper.Map<TreatmentCreateDto, Treatment>(treatmentCreateDto);

                // Add the treatment to the repository and save changes
                _unitOfWork.Repository<Treatment>().Add(newTreatment);
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating treatment"));

                // Return the created treatment with the correct location header
                return CreatedAtAction(
                    nameof(GetTreatmentByPatientId),
                    new { patientId = newTreatment.PatientId, treatmentId = newTreatment.Id },
                    _mapper.Map<TreatmentDto>(newTreatment)
                    );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing treatment record.
        /// </summary>
        /// <param name="id">ID of the treatment to update.</param>
        /// <param name="treatmentUpdateDto">DTO containing updated treatment details.</param>
        /// <returns>No content if successful.</returns>
        [HttpPut("{id}")]
        public async Task<ActionResult<TreatmentDto>> UpdateTreatment(int id, TreatmentCreateDto treatmentUpdateDto)
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

                // Define specification to get the treatment by ID
                var spec = new TreatmentSpecification(id);
                var updateTreatment = await _unitOfWork.Repository<Treatment>().GetEntityWithSpec(spec);

                // Check if the treatment exists
                if (updateTreatment == null) return NotFound(new ApiResponse(404, "Treatment not found"));

                // Verify that the treatment belongs to the authenticated user's patient
                var patient = updateTreatment.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));

                // Validate that the provided patientId in the DTO matches the treatment patientId
                if (updateTreatment.PatientId != treatmentUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Stress test does not belong to the specified Patient"));
                }

                // Update the treatment entity with new values
                _mapper.Map(treatmentUpdateDto, updateTreatment);

                // Mark the entity as modified and save changes
                _unitOfWork.Repository<Treatment>().Update(updateTreatment);
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating treatment"));

                return Ok(_mapper.Map<TreatmentDto>(updateTreatment));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes a specific treatment record.
        /// </summary>
        /// <param name="id">ID of the treatment to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTreatment(int id)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Define specification to get the treatment by ID
                var spec = new TreatmentSpecification(id);
                var treatment = await _unitOfWork.Repository<Treatment>().GetEntityWithSpec(spec);

                // Check if the treatment exists
                if (treatment == null) return NotFound(new ApiResponse(404, "Treatment not found"));

                // Verify that the treatment belongs to the authenticated user's patient
                var patient = treatment.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));

                // Validate that the provided patientId in the DTO matches the treatment patientId
                if (treatment.PatientId != treatment.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Stress test does not belong to the specified Patient"));
                }

                // Delete the treatment entity
                _unitOfWork.Repository<Treatment>().Delete(treatment);
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting treatment"));

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}