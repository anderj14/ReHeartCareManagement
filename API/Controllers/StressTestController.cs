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
    /// Manages stress test records for patients. Provides endpoints for creating, retrieving, updating, and deleting stress tests.
    /// </summary>
    public class StressTestController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        /// <summary>
        /// Initializes a new instance of the <see cref="StressTestController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public StressTestController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves stress tests for a specific patient.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="baseSpecParams">Pagination and sorting parameters.</param>
        /// <returns>A list of stress tests.</returns>
        [HttpGet("patient/{patientId}/stressTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTestsByPatientId(
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

                // Define specification to get the stress tests for the patient with pagination and sorting
                var spec = new StressTestSpecification(patientId, baseSpecParams);

                // Define a filter for stress tests based on the patient ID
                Expression<Func<StressTest, bool>> filter = (stressTest) => stressTest.PatientId == patientId;

                // Get the total count of stress tests matching the filter
                var totalItems = await _unitOfWork.Repository<StressTest>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<StressTestDto>(new List<StressTestDto>(), 0, baseSpecParams.PageIndex, baseSpecParams.PageSize));
                }

                // Get the list of stress tests for the patient with pagination
                var stressTests = await _unitOfWork.Repository<StressTest>().ListAllByPatientAsync(filter, spec, baseSpecParams.PageIndex, baseSpecParams.PageSize);

                // Map the list of stress tests to DTOs
                var stressTestsDtos = _mapper.Map<IReadOnlyList<StressTestDto>>(stressTests);

                // Create a paginated list of stress test DTOs
                var paginatedStressTests = new PagedList<StressTestDto>(
                    stressTestsDtos.ToList(),
                    totalItems,
                    baseSpecParams.PageIndex,
                    baseSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedStressTests.MetaData);
                return Ok(stressTestsDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific stress test for a patient by its ID.
        /// </summary>
        /// <param name="patientId">ID of the patient.</param>
        /// <param name="stressTestId">ID of the stress test.</param>
        /// <returns>The requested stress test.</returns>
        [HttpGet("patient/{patientId}/stressTests/{stressTestId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<StressTestDto>> GetStressTestByPatientId(int patientId, int stressTestId)
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

                // Define specification to get the stress test by patient ID and stress test ID
                var spec = new StressTestSpecification(patientId, stressTestId);
                var stressTest = await _unitOfWork.Repository<StressTest>().GetEntityWithSpec(spec);

                // Check if the stress test exists
                if (stressTest == null)
                    return NotFound(new ApiResponse(404, "Stress test not found"));

                // Map the stress test to a DTO
                var stressTestDto = _mapper.Map<StressTestDto>(stressTest);

                return Ok(stressTestDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new stress test. record for a patient.
        /// </summary>
        /// <param name="stressTestCreateDto">Data transfer object containing the details of the stress test to be created.</param>
        /// <returns>The created stress test.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<StressTestDto>> CreateStressTest(StressTestCreateDto stressTestCreateDto)
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

                // Map the DTO to a new stress test entity
                var newStressTest = _mapper.Map<StressTestCreateDto, StressTest>(stressTestCreateDto);

                // Add the new stress test to the repository
                _unitOfWork.Repository<StressTest>().Add(newStressTest);

                // Save changes to the database
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating stress test"));

                // Map the new stress test to a DTO
                var stressTestDto = _mapper.Map<StressTestDto>(newStressTest);

                return CreatedAtAction(
                    nameof(GetStressTestByPatientId),
                    new { patientId = newStressTest.PatientId, stressTestId = newStressTest.Id },
                    stressTestDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing stress test.
        /// </summary>
        /// <param name="id">ID of the stress test to be updated.</param>
        /// <param name="stressTestUpdateDto">Data transfer object containing the updated details of the stress test.</param>
        /// <returns>No content if successful.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<StressTestDto>> UpdateStressTest(int id, StressTestCreateDto stressTestUpdateDto)
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

                // Define specification to get the stress test by ID
                var spec = new StressTestSpecification(id);
                var stressTest = await _unitOfWork.Repository<StressTest>().GetEntityWithSpec(spec);

                // Check if the stress test exists
                if (stressTest == null)
                    return NotFound(new ApiResponse(404, "Stress test not found"));

                // Verify that the stress test belongs to the authenticated user's patient
                var patient = stressTest.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Validate that the provided patientId in the DTO matches the stress test's patientId
                if (stressTest.PatientId != stressTestUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Stress test does not belong to the specified Patient"));
                }

                // Update the stress test entity with new values
                _mapper.Map(stressTestUpdateDto, stressTest);

                // Mark the entity as modified and save changes
                _unitOfWork.Repository<StressTest>().Update(stressTest);
                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating stress test"));
                }

                var stressTestDto = _mapper.Map<StressTestDto>(stressTest);

                return Ok(stressTestDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        /// <summary>
        /// Deletes a specific stress test.
        /// </summary>
        /// <param name="id">ID of the stress test to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteStressTest(int id)
        {
            try
            {
                // Retrieve the authenticated user
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Define specification to get the stress test by ID
                var spec = new StressTestSpecification(id);
                var stressTest = await _unitOfWork.Repository<StressTest>().GetEntityWithSpec(spec);

                // Check if the stress test exists
                if (stressTest == null)
                {
                    return NotFound(new ApiResponse(404, "Stress test not found"));
                }

                // Verify that the stress test belongs to the authenticated user
                var patient = stressTest.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Delete the stress test entity
                _unitOfWork.Repository<StressTest>().Delete(stressTest);
                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting stress test"));

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
