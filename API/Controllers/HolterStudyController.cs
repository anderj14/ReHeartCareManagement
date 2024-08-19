using System.Linq.Expressions;
using API.Errors;
using API.Extensions;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
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
    /// Manages Holter study records for patients. Provides endpoints for creating, retrieving, updating, and deleting Holter studies.
    /// </summary>
    public class HolterStudyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="HolterStudyController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public HolterStudyController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves Holter studies for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        /// <returns>A list of Holter studies.</returns>
        [HttpGet("patient/{patientId}/holterStudies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<HolterStudyDto>>> GetHolterStudiesByPatientId(
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

                // Define specification to get the Holter studies for the patient with pagination and sorting
                var spec = new HolterStudySpecification(patientId, baseSpecParams);

                // Define a filter for Holter studies based on the patient ID
                Expression<Func<HolterStudy, bool>> filter = (diagnostic) => diagnostic.PatientId == patientId;

                // Get the total count of Holter studies matching the filter
                var totalItems = await _unitOfWork.Repository<HolterStudy>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<HolterStudyDto>(new List<HolterStudyDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }

                // Get the list of Holter studies for the patient with pagination
                var holterStudies = await _unitOfWork.Repository<HolterStudy>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);

                // Map the list of Holter studies to DTOs
                var holterStudiesDtos = _mapper.Map<IReadOnlyList<HolterStudyDto>>(holterStudies);

                // Create a paginated list of Holter study DTOs
                var paginatedHolterStudies = new PagedList<HolterStudyDto>(
                    holterStudiesDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedHolterStudies.MetaData);
                return Ok(holterStudiesDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific Holter study for a patient by its ID.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="holterStudyId">ID of the Holter study.</param>
        /// <returns>The requested Holter study.</returns>
        [HttpGet("patient/{patientId}/holterStudies/{holterStudyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<HolterStudyDto>> GetHolterStudyByPatientId(int patientId, int holterStudyId)
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

                // Define specification to get the Holter study by patient ID and Holter study ID
                var spec = new HolterStudySpecification(patientId, holterStudyId);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(spec);

                // Check if the Holter study exists
                if (holterStudy == null)
                    return NotFound(new ApiResponse(404, "Holter study not found"));

                // Map the Holter study to a DTO
                var holterStudyDto = _mapper.Map<HolterStudyDto>(holterStudy);

                return Ok(holterStudyDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new Holter study.
        /// </summary>
        /// <param name="holterStudyCreateDto">Data transfer object containing the details of the Holter study to be created.</param>
        /// <returns>The created Holter study.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<HolterStudyDto>> CreateHolterStudy(HolterStudyCreateDto holterStudyCreateDto)
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

                // Map the DTO to a new Holter study entity
                var newHolterStudy = _mapper.Map<HolterStudyCreateDto, HolterStudy>(holterStudyCreateDto);

                // Add the new Holter study to the repository
                _unitOfWork.Repository<HolterStudy>().Add(newHolterStudy);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating Holter study"));

                // Map the new Holter study to a DTO
                var holterStudyDto = _mapper.Map<HolterStudyDto>(newHolterStudy);

                return CreatedAtAction(
                    nameof(GetHolterStudyByPatientId),
                    new { patientId = newHolterStudy.PatientId, holterStudyId = newHolterStudy.Id },
                    holterStudyDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing Holter study.
        /// </summary>
        /// <param name="id">ID of the Holter study to be updated.</param>
        /// <param name="holterStudyUpdateDto">Data transfer object containing the updated details of the Holter study.</param>
        /// <returns>No content if successful.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateHolterStudy(int id, HolterStudyCreateDto holterStudyUpdateDto)
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

                // Define specification to get the Holter study by ID
                var spec = new HolterStudySpecification(id);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(spec);

                // Check if the Holter study exists
                if (holterStudy == null)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found"));
                }

                // Check if the patient is associated with the authenticated user
                var patient = holterStudy.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Validate that the provided PatientId in the DTO matches the holter study PatientId
                if (holterStudy.PatientId != holterStudyUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Holter study does not belong to the specified patient"));
                }

                // Map the updated DTO to the existing Holter study entity
                _mapper.Map(holterStudyUpdateDto, holterStudy);

                // Update the Holter study in the repository
                _unitOfWork.Repository<HolterStudy>().Update(holterStudy);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating Holter study information"));
                }

                return Ok(holterStudyUpdateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing Holter study.
        /// </summary>
        /// <param name="id">ID of the Holter study to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteHolterStudy(int id)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Define specification to get the Holter study by ID
                var spec = new HolterStudySpecification(id);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(spec);

                // Check if the Holter study exists
                if (holterStudy == null)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found"));
                }

                // Check if the patient is associated with the authenticated user
                var patient = holterStudy.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Delete the Holter study from the repository
                _unitOfWork.Repository<HolterStudy>().Delete(holterStudy);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting Holter study information"));
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
