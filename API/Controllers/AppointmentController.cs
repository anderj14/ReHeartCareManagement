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
    public class AppointmentController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        /// <summary>
        /// Initializes a new instance of the <see cref="AppointmentController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work for handling data operations.</param>
        /// <param name="mapper">Mapper for converting between DTOs and entities.</param>
        /// <param name="userManager">User manager for handling authentication and user management.</param>
        public AppointmentController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _unitOfWork = unitOfWork; // Initializes the unit of work for managing repository transactions
            _mapper = mapper; // Initializes the mapper for object-to-object mapping
        }

        /// <summary>
        /// Retrieves the appointment calendar for the authenticated user.
        /// </summary>
        /// <param name="appointmentParams">Parameters for filtering and sorting appointments.</param>
        /// <returns>A list of appointments for the authenticated user.</returns>
        [HttpGet("calendar")]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<AppointmentDto>>> GetAppointmentCalendarByUser(
            [FromQuery] AppointmentSpecParams appointmentParams
        )
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                var spec = new AppointmentSpecification(appointmentParams);

                // Define a filter expression to get only the appointments associated with the authenticated user
                Expression<Func<Appointment, bool>> filter = (appointment) => appointment.AppUserId == user.Id;

                // Retrieve the appointments based on the filter and specification
                var userAppointments = await _unitOfWork.Repository<Appointment>().ListAllByUserAsync(filter, spec);

                // Map the retrieved appointments to AppointmentDto
                var data = _mapper.Map<IReadOnlyList<AppointmentDto>>(userAppointments);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a paginated list of appointments for the authenticated user.
        /// </summary>
        /// <param name="appointmentParams">Parameters for filtering, sorting, and pagination.</param>
        /// <returns>A paginated list of appointments for the authenticated user.</returns>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<AppointmentDto>>> GetAppointmentByUser([FromQuery] AppointmentSpecParams appointmentParams)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Define a filter expression to get only the appointments associated with the authenticated user
                Expression<Func<Appointment, bool>> filter = (appointment) => appointment.AppUserId == user.Id;

                // Create a specification for querying the appointments
                var spec = new AppointmentSpecification(appointmentParams);
                var countSpec = new AppointmentFilterForCountSpecification(appointmentParams);

                // Get the total number of appointments matching the filter
                var totalItems = await _unitOfWork.Repository<Appointment>().CountByUserAsync(filter, countSpec);

                if (totalItems == 0)
                {
                    // Return an empty paginated list if no appointments are found
                    return Ok(new PagedList<AppointmentDto>(new List<AppointmentDto>(), 0, appointmentParams.PageIndex, appointmentParams.PageSize));
                }

                // Retrieve the appointments based on the filter and specification
                var userAppointments = await _unitOfWork.Repository<Appointment>().ListAllByUserAsync(filter, spec, appointmentParams.PageIndex, appointmentParams.PageSize);

                // Map the retrieved appointments to AppointmentDto
                var data = _mapper.Map<IReadOnlyList<AppointmentDto>>(userAppointments);

                // Create a paginated list of appointments
                var paginatedAppointments = new PagedList<AppointmentDto>(
                    data.ToList(),
                    totalItems,
                    appointmentParams.PageIndex,
                    appointmentParams.PageSize
                    );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedAppointments.MetaData);

                return Ok(paginatedAppointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Retrieves a specific appointment by its ID for the authenticated user.
        /// </summary>
        /// <param name="id">The ID of the appointment to retrieve.</param>
        /// <returns>The details of the requested appointment.</returns>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AppointmentDto>> GetAppointment(int id)
        {
            var user = await GetAuthenticatedUserAsync();

            try
            {
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Define a filter expression to get only the appointments associated with the authenticated user
                Expression<Func<Appointment, bool>> filter = (appointment) => appointment.AppUserId == user.Id;

                // Create a specification to query the appointment by ID
                var spec = new AppointmentSpecification(id);

                // Retrieve the appointment based on the filter and specification
                var appointment = await _unitOfWork.Repository<Appointment>().GetEntityByUserAsync(filter, spec);

                if (appointment == null) return NotFound(new ApiResponse(404));

                // Map the retrieved appointment to AppointmentDto
                return Ok(_mapper.Map<AppointmentDto>(appointment));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new appointment for the authenticated user.
        /// </summary>
        /// <param name="appointmentCreateDto">The data to create a new appointment.</param>
        /// <returns>The created appointment.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateAppointmentByUser([FromBody] AppointmentCreateDto appointmentCreateDto)
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

                // Map the AppointmentCreateDto to a new Appointment entity
                var newAppointment = _mapper.Map<Appointment>(appointmentCreateDto);
                newAppointment.AppUserId = user.Id; // Set the AppUserId for the new appointment

                // Add the new appointment to the context
                _unitOfWork.Repository<Appointment>().Add(newAppointment);
                // Save changes to the database
                await _unitOfWork.Complete();

                // Map the new appointment entity to AppointmentDto
                var appointment = _mapper.Map<AppointmentDto>(newAppointment);

                return CreatedAtAction(nameof(GetAppointment), new { id = newAppointment.Id }, appointment);
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(400, $"Problem creating appointment: {ex.Message}")); // Return 400 for exceptions
            }
        }

        /// <summary>
        /// Updates an existing appointment by its ID for the authenticated user.
        /// </summary>
        /// <param name="id">The ID of the appointment to update.</param>
        /// <param name="appointmentUpdateDto">The updated data for the appointment.</param>
        /// <returns>The updated appointment.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Appointment>> UpdateAppointment(int id, AppointmentCreateDto appointmentUpdateDto)
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

                // Retrieve the appointment to update
                var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);

                if (appointment == null)
                {
                    return NotFound(new ApiResponse(404, "Appointment not found")); // Return 404 if appointment not found
                }

                // Map the updated data from the DTO to the existing appointment entity
                _mapper.Map(appointmentUpdateDto, appointment);
                _unitOfWork.Repository<Appointment>().Update(appointment); // Mark the appointment entity as updated

                // Save changes to the database
                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating appointment information"));

                return Ok(_mapper.Map<AppointmentDto>(appointmentUpdateDto)); // Return the updated appointment
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(400, $"Problem updating appointment: {ex.Message}")); // Return 400 for exceptions
            }
        }

        /// <summary>
        /// Deletes an appointment by its ID for the authenticated user.
        /// </summary>
        /// <param name="id">The ID of the appointment to delete.</param>
        /// <returns>A response indicating the result of the deletion.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAppointment(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                // Retrieve the appointment to delete
                var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);

                if (appointment == null)
                {
                    return NotFound(new ApiResponse(404, "Appointment not found")); // Return 404 if appointment not found
                }

                // Remove the appointment from the context
                _unitOfWork.Repository<Appointment>().Delete(appointment);

                // Save changes to the database
                var result = await _unitOfWork.Complete();
                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting appointment"));

                return Ok(new ApiResponse(200, "Appointment successfully deleted"));
            }
            catch (Exception ex)
            {
                return BadRequest(new ApiResponse(400, $"Problem deleting appointment: {ex.Message}")); // Return 400 for exceptions
            }
        }
    }
}
