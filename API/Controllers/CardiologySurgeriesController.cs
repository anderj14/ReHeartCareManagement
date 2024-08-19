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
using Core.Specification.CardiologySurgerySpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardiologySurgeriesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CardiologySurgeriesController(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        /// <summary>
        /// Retrieves a paginated list of cardiology surgeries associated with the authenticated user.
        /// </summary>
        /// <param name="cardiologySurgeryParams">Filtering and pagination parameters.</param>
        /// <returns>Paginated list of CardiologySurgeryDto.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the user is not found or internal errors occur.</exception>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedList<CardiologySurgeryDto>>> GetCardiologySurgeriesByUser(
            [FromQuery] CardiologySurgerySpecParams cardiologySurgeryParams
        )
        {
            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Specifies a filter to retrieve surgeries for the authenticated user only
                Expression<Func<CardiologySurgery, bool>> filter = (cardiologySurgery) => cardiologySurgery.AppUserId == user.Id;

                // Creates specifications for filtering and counting surgeries
                var spec = new CardiologySurgerySpecification(cardiologySurgeryParams);
                var countSpec = new CardiologySurgeryFilterForCountSpecification(cardiologySurgeryParams);

                // Counts the total number of surgeries
                var totalItems = await _unitOfWork.Repository<CardiologySurgery>().CountByUserAsync(filter, countSpec);

                // Returns an empty list if no surgeries are found
                if (totalItems == 0)
                {
                    return Ok(new PagedList<PatientDto>(new List<PatientDto>(), 0, cardiologySurgeryParams.PageIndex, cardiologySurgeryParams.PageSize));
                }

                // Retrieves the paginated list of surgeries
                var cardiologySurgeries = await _unitOfWork.Repository<CardiologySurgery>().ListAllByUserAsync(filter, spec, cardiologySurgeryParams.PageIndex, cardiologySurgeryParams.PageSize);

                // Maps the retrieved surgeries to DTOs
                var data = _mapper.Map<IReadOnlyList<CardiologySurgeryDto>>(cardiologySurgeries);

                // Creates a paginated response
                var paginatedSurgeries = new PagedList<CardiologySurgeryDto>(
                    data.ToList(),
                    totalItems,
                    cardiologySurgeryParams.PageIndex,
                    cardiologySurgeryParams.PageSize
                );

                // Adds pagination headers to the response
                Response.AddPaginationHeader(paginatedSurgeries.MetaData);

                return Ok(paginatedSurgeries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific cardiology surgery associated with the authenticated user by ID.
        /// </summary>
        /// <param name="id">ID of the cardiology surgery to retrieve. Must be a valid surgery ID.</param>
        /// <returns>CardiologySurgeryDto for the specified ID.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the surgery is not found or internal errors occur.</exception>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<CardiologySurgeryDto>> GetCardiologySurgery(int id)
        {
            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Specifies a filter to retrieve the surgery for the authenticated user only
                Expression<Func<CardiologySurgery, bool>> filter = (cardiologySurgery) => cardiologySurgery.AppUserId == user.Id;

                // Creates a specification for the surgery
                var spec = new CardiologySurgerySpecification(id);

                // Retrieves the surgery; returns 404 if not found
                var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityByUserAsync(filter, spec);
                if (cardiologySurgery == null) return NotFound(new ApiResponse(404));

                return Ok(_mapper.Map<CardiologySurgeryDto>(cardiologySurgery));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves all cardiology surgeries for a specific patient associated with the authenticated user.
        /// </summary>
        /// <param name="patientId">ID of the patient to retrieve surgeries for. Must be a valid patient ID.</param>
        /// <returns>List of CardiologySurgeryDto for the specified patient.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the patient is not found or internal errors occur.</exception>
        [HttpGet("patient/{patientId}/cardiologySurgeries")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<CardiologySurgeryDto>>> GetPatientCardiologySurgeries(int patientId)
        {
            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Retrieves the patient and ensures they belong to the authenticated user
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Creates a specification to filter surgeries by patient ID
                var spec = new CardiologySurgerySpecification(patientId, getByPatientId: true);

                // Retrieves the surgeries for the specified patient
                var cardiologySurgeries = await _unitOfWork.Repository<CardiologySurgery>().ListAsync(spec);
                var cardiologySurgeryDtos = _mapper.Map<IReadOnlyList<CardiologySurgeryDto>>(cardiologySurgeries);

                return Ok(cardiologySurgeryDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific cardiology surgery for a specific patient associated with the authenticated user.
        /// </summary>
        /// <param name="patientId">ID of the patient. Must be a valid patient ID.</param>
        /// <param name="cardiologySurgeryId">ID of the cardiology surgery. Must be a valid surgery ID.</param>
        /// <returns>CardiologySurgeryDto for the specified surgery and patient.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the surgery or patient is not found or internal errors occur.</exception>
        [HttpGet("patient/{patientId}/cardiologySurgeries/{cardiologySurgeryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CardiologySurgeryDto>> GetPatientCardiologySurgery(int patientId, int cardiologySurgeryId)
        {
            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Retrieves the patient and ensures they belong to the authenticated user
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Creates a specification to filter the surgery by patient and surgery ID
                var spec = new CardiologySurgerySpecification(cardiologySurgeryId);
                var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(spec);

                if (cardiologySurgery == null)
                {
                    return NotFound(new ApiResponse(404, "Cardiology surgery not found"));
                }

                // Ensures the surgery belongs to the specified patient
                if (cardiologySurgery.PatientId != patientId)
                {
                    return NotFound(new ApiResponse(404, "Surgery not associated with the specified patient"));
                }

                return Ok(_mapper.Map<CardiologySurgeryDto>(cardiologySurgery));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new cardiology surgery for a specified patient associated with the authenticated user.
        /// </summary>
        /// <param name="surgeryCreateDto">Data transfer object containing the details of the new surgery.</param>
        /// <returns>CardiologySurgeryDto for the newly created surgery.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the patient is not found or not authorized, or if there is a problem creating the appointment.</exception>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult<CardiologySurgeryDto>> CreateCardiologySurgery(CardiologySurgeryCreateDto surgeryCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Retrieves the patient and ensures they belong to the authenticated user
                var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(surgeryCreateDto.PatientId);
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Maps the details from the DTO to a new cardiology surgery entity
                var cardiologySurgery = _mapper.Map<CardiologySurgery>(surgeryCreateDto);
                cardiologySurgery.AppUserId = user.Id;

                // Adds the new surgery to the repository
                _unitOfWork.Repository<CardiologySurgery>().Add(cardiologySurgery);

                // Saves changes to the database
                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating new appointment"));

                // Maps the created surgery to a DTO and returns it in the response
                var createdSurgery = _mapper.Map<CardiologySurgeryDto>(cardiologySurgery);
                return Ok(createdSurgery);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing cardiology surgery associated with the authenticated user.
        /// </summary>
        /// <param name="id">ID of the cardiology surgery to update. Must be a valid surgery ID.</param>
        /// <param name="cardiologySurgeryUpdateDto">Data transfer object containing the updated details of the surgery.</param>
        /// <returns>The updated CardiologySurgeryDto.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the surgery is not found, the patient is not authorized, or if there is a problem updating the appointment.</exception>
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult<CardiologySurgeryDto>> UpdateCardiologySurgery(int id, CardiologySurgeryCreateDto cardiologySurgeryUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Creates a specification to filter the surgery by ID
                var spec = new CardiologySurgerySpecification(id);
                var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(spec);

                // Returns 404 if the surgery is not found
                if (cardiologySurgery == null)
                {
                    return NotFound(new ApiResponse(404, "Cardiac catheterization study not found"));
                }

                // Ensures the patient associated with the surgery belongs to the authenticated user
                var patient = cardiologySurgery.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Maps the updated details from the DTO to the existing surgery entity
                _mapper.Map(cardiologySurgeryUpdateDto, cardiologySurgery);
                _unitOfWork.Repository<CardiologySurgery>().Update(cardiologySurgery);

                // Saves changes to the database
                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating appointment information"));

                return Ok(cardiologySurgeryUpdateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing cardiology surgery associated with the authenticated user.
        /// </summary>
        /// <param name="id">ID of the cardiology surgery to delete. Must be a valid surgery ID.</param>
        /// <returns>A response indicating the result of the deletion.</returns>
        /// <exception cref="UnauthorizedResult">Thrown when the user is not authenticated.</exception>
        /// <exception cref="ApiResponse">Thrown when the surgery is not found, the patient is not authorized, or if there is a problem deleting the surgery.</exception>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status400BadRequest)]
        [Authorize]
        public async Task<ActionResult> DeleteCardiologySurgery(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                // Gets the authenticated user; returns 401 if not authenticated
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Creates a specification to filter the surgery by ID
                var spec = new CardiologySurgerySpecification(id);
                var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(spec);

                // Returns 404 if the surgery is not found
                if (cardiologySurgery == null)
                {
                    return NotFound(new ApiResponse(404, "Cardiac catheterization study not found"));
                }

                // Ensures the patient associated with the surgery belongs to the authenticated user
                var patient = cardiologySurgery.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Deletes the surgery from the repository
                _unitOfWork.Repository<CardiologySurgery>().Delete(cardiologySurgery);

                // Saves changes to the database
                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting cardiology surgery information"));

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
