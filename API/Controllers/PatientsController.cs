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
    public class PatientsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public PatientsController(
            IUnitOfWork unitOfwork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfwork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedList<PatientDto>>> GetPatientsByUser([FromQuery] PatientSpecParams patientSpecParams)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not authenticated")); // Return 401 if user is not authenticated

                // Define a filter expression to get only the patients associated with the authenticated user
                Expression<Func<Patient, bool>> filter = patient => patient.AppUserId == user.Id;

                // Create a specification for querying the patients
                var spec = new PatientWithAllSpecification(patientSpecParams);
                var countSpec = new PatientWithFiltersForCountSpecification(patientSpecParams);

                // Get the total number of patients matching the filter
                var totalItems = await _unitOfWork.Repository<Patient>().CountByUserAsync(filter, countSpec);

                // Retrieve the patients based on the filter and specification
                var userPatients = await _unitOfWork.Repository<Patient>().ListAllByUserAsync(filter, spec, patientSpecParams.PageIndex, patientSpecParams.PageSize);

                // Map the retrieved patients to the PatientDto
                var data = _mapper.Map<IReadOnlyList<PatientDto>>(userPatients);

                // Create a paginated list of patients
                var paginatedPatients = new PagedList<PatientDto>(
                    data.ToList(),
                    totalItems,
                    patientSpecParams.PageIndex,
                    patientSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedPatients.MetaData);

                return Ok(paginatedPatients); // Return the paginated list of patients
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Return 500 for internal server errors
            }
        }

        [HttpGet("all")]
        [Authorize]
        public async Task<ActionResult<PagedList<PatientDto>>> GetPatients()
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not authenticated")); // Return 401 if user is not authenticated

                // Define a filter expression to get only the patients associated with the authenticated user
                Expression<Func<Patient, bool>> filter = patient => patient.AppUserId == user.Id;


                // Retrieve the patients based on the filter and specification
                var userPatients = await _unitOfWork.Repository<Patient>().ListAllAsync();

                // Map the retrieved patients to the PatientDto
                var data = _mapper.Map<IReadOnlyList<PatientDto>>(userPatients);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Return 500 for internal server errors
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PatientDto>> GetPatient(int id)
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
            }

            // Define a filter expression to get only the patient associated with the authenticated user
            Expression<Func<Patient, bool>> filter = (patient) => patient.AppUserId == user.Id;

            // Create a specification to query the patient by Id
            var spec = new PatientWithAllSpecification(id);

            // Retrieve the patient based on the filter and specification
            var patient = await _unitOfWork.Repository<Patient>().GetEntityByUserAsync(filter, spec);

            if (patient == null) return NotFound(new ApiResponse(404)); // Return 404 if the patient is not found

            // Map the retrieved patient to PatientDto
            return _mapper.Map<Patient, PatientDto>(patient);
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Patient>> AddPatientByUser([FromBody] PatientCreateDto patientCreateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
                }

                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
                }

                // Map the PatientCreateDto to a new Patient entity
                var newPatient = _mapper.Map<Patient>(patientCreateDto);
                newPatient.AppUserId = user.Id; // Set the AppUserId for the new patient

                // Add the new patient to the context
                _unitOfWork.Repository<Patient>().Add(newPatient);
                // Save changes to the database
                await _unitOfWork.Complete();

                // Map the new patient entity to PatientDto
                var patient = _mapper.Map<PatientDto>(newPatient);

                return CreatedAtAction(nameof(GetPatient), new { id = newPatient.Id }, patient); // Return 201 with the created patient details
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // Return 400 for exceptions
            }
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult<Patient>> UpdatePatient(int id, PatientCreateDto patientToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
            }

            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
            }

            // Retrieve the patient to update
            var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(id);

            // Map the updated data from the DTO to the existing patient entity
            _mapper.Map(patientToUpdate, patient);
            _unitOfWork.Repository<Patient>().Update(patient); // Mark the patient entity as updated

            var result = await _unitOfWork.Complete(); // Save changes to the database

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating patient information")); // Return 400 if the update fails

            return Ok(patientToUpdate); // Return 200 with the updated patient details
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeletePatient(int id)
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
            }

            // Retrieve the patient to delete
            var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(id);

            _unitOfWork.Repository<Patient>().Delete(patient); // Mark the patient entity as deleted

            var result = await _unitOfWork.Complete(); // Save changes to the database

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting patient information")); // Return 400 if the deletion fails

            return Ok(); // Return 200 on successful deletion
        }
    }
}
