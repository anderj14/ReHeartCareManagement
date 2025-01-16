using System.Linq.Expressions;
using API.Errors;
using API.Extensions;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.DTOs;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Core.Specification.BloodTestSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // Controller for managing blood tests
    public class BloodTestsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public BloodTestsController(
            IUnitOfWork unitOfWork, IMapper mapper, UserManager<AppUser> userManager) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

                // Retrieves paginated blood tests for a specific patient
        [HttpGet("patient/{patientId}/bloodTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<PagedList<BloodTestDto>>> GetPatientBloodTests(int patientId, [FromQuery] BloodTestSpecParams bloodTestSpecParams)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));

                // Check if the patient belongs to the authenticated user
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Create a specification for querying the patient's blood tests
                var spec = new BloodTestSpecification(patientId, bloodTestSpecParams);

                // Filter to ensure blood tests belong to the specified patient
                Expression<Func<BloodTest, bool>> filter = bt => bt.PatientId == patientId;

                // Get the total number of blood tests for pagination
                var totalItems = await _unitOfWork.Repository<BloodTest>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    // Return an empty paginated list if no blood tests are found
                    return Ok(new PagedList<BloodTestDto>(new List<BloodTestDto>(), 0, bloodTestSpecParams.PageIndex, bloodTestSpecParams.PageSize));
                }

                // Retrieve the blood tests based on the specification and filter
                var bloodTests = await _unitOfWork.Repository<BloodTest>().ListAllByPatientAsync(filter, spec, bloodTestSpecParams.PageIndex, bloodTestSpecParams.PageSize);

                // Map the blood tests to DTOs
                var bloodTestsDtos = _mapper.Map<IReadOnlyList<BloodTestDto>>(bloodTests);

                // Create a paginated list of blood tests
                var paginatedBloodTests = new PagedList<BloodTestDto>(
                    bloodTestsDtos.ToList(),
                    totalItems,
                    bloodTestSpecParams.PageIndex,
                    bloodTestSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedBloodTests.MetaData);

                return Ok(paginatedBloodTests);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Retrieves a specific blood test for a specific patient
        [HttpGet("patient/{patientId}/bloodTests/{bloodTestId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<BloodTestDto>> GetPatientBloodTest(int patientId, int bloodTestId)
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

            // Create a specification for the specific blood test
            var spec = new BloodTestSpecification(patientId, bloodTestId);
            var bloodTest = await _unitOfWork.Repository<BloodTest>().GetEntityWithSpec(spec);

            var bloodTestDto = _mapper.Map<BloodTestDto>(bloodTest);
            return Ok(bloodTestDto);
        }

        // Creates a new blood test
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BloodTest>> CreateBloodTest(BloodTestCreateDto bloodTestCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
            }

            var user = await GetAuthenticatedUserAsync();

            if (user == null)
                return Unauthorized(new ApiResponse(401, "User not found"));

            var bloodTest = _mapper.Map<BloodTestCreateDto, BloodTest>(bloodTestCreateDto);

            _unitOfWork.Repository<BloodTest>().Add(bloodTest);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating blood test"));
            return Ok(bloodTest);
        }

        // Updates an existing blood test
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<BloodTest>> UpdateBloodTest(int id, BloodTestCreateDto bloodTestUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
            }

            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Get the blood test along with the patient
                var spec = new BloodTestSpecification(id);

                var bloodTest = await _unitOfWork.Repository<BloodTest>().GetEntityWithSpec(spec);

                if (bloodTest == null)
                {
                    return NotFound(new ApiResponse(404, "Blood test not found"));
                }

                // Check if the patient belongs to the authenticated user
                var patient = bloodTest.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Validate that the provided PatientId in the DTO matches the blood test PatientId
                if (bloodTest.PatientId != bloodTestUpdateDto.PatientId)
                {
                    return NotFound(new ApiResponse(404, "Blood test does not belong to the specified patient"));
                }

                _mapper.Map(bloodTestUpdateDto, bloodTest);
                _unitOfWork.Repository<BloodTest>().Update(bloodTest); // Mark the blood test entity as updated

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating blood test information"));
                
                var bloodTestDto = _mapper.Map<BloodTestDto>(bloodTest);
                
                return Ok(bloodTestDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Deletes an existing blood test
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteBloodTest(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
            }

            var user = await GetAuthenticatedUserAsync();

            if (user == null)
                return Unauthorized(new ApiResponse(401, "User not found"));

            // Get the blood test along with the patient
            var spec = new BloodTestSpecification(id);

            var bloodTest = await _unitOfWork.Repository<BloodTest>().GetEntityWithSpec(spec);

            if (bloodTest == null)
            {
                return NotFound(new ApiResponse(404, "Blood test not found"));
            }

            // Check if the patient belongs to the authenticated user
            var patient = bloodTest.Patient;
            if (patient == null || patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
            }

            _unitOfWork.Repository<BloodTest>().Delete(bloodTest);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting blood test information"));
            return Ok();
        }
    }
}
