
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
using Infraestructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AppointmentController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ManagementContext _context;
        private readonly UserManager<AppUser> _userManager;

        public AppointmentController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            ManagementContext context,
            UserManager<AppUser> userManager
        )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("allappointments")]
        // [Authorize]
        public async Task<ActionResult<Pagination<AppointmentDto>>> GetAppointments(
            [FromQuery] AppointmentSpecParams appointmentParams
        )
        {
            var spec = new AppointmentSpecification(appointmentParams);
            var countSpec = new AppointmentFilterForCountSpecification(appointmentParams);
            var totalItems = await _unitOfWork.Repository<Appointment>().CountAsync(countSpec);

            var appointments = await _unitOfWork.Repository<Appointment>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<AppointmentDto>>(appointments);

            return Ok(new Pagination<AppointmentDto>(appointmentParams.PageIndex, appointmentParams.PageSize, totalItems, data));
        }

        [HttpGet("calendar")]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<AppointmentDto>>> GetAppointmentCalendarByUser(
            [FromQuery] AppointmentSpecParams appointmentParams
        )
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrEmpty(userName))
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));
                }

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                var spec = new AppointmentSpecification(appointmentParams);

                Expression<Func<Appointment, bool>> filter = (appointment) => appointment.AppUserId == user.Id;

                var userAppointments = await _unitOfWork.Repository<Appointment>().ListAllByUserAsync(filter, spec);

                var data = _mapper.Map<IReadOnlyList<AppointmentDto>>(userAppointments);

                return Ok(data);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<AppointmentDto>>> GetAppointmentByUser([FromQuery] AppointmentSpecParams appointmentParams)
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrEmpty(userName))
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));
                }

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));


                Expression<Func<Appointment, bool>> filter = (appointment) => appointment.AppUserId == user.Id;

                var spec = new AppointmentSpecification(appointmentParams);
                var countSpec = new AppointmentFilterForCountSpecification(appointmentParams);
                var totalItems = await _unitOfWork.Repository<Appointment>().CountByUserAsync(filter, countSpec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<AppointmentDto>(new List<AppointmentDto>(), 0, appointmentParams.PageIndex, appointmentParams.PageSize));
                }

                var userAppointments = await _unitOfWork.Repository<Appointment>().ListAllByUserAsync(filter, spec, appointmentParams.PageIndex, appointmentParams.PageSize);

                var data = _mapper.Map<IReadOnlyList<AppointmentDto>>(userAppointments);

                var paginatedAppointments = new PagedList<AppointmentDto>(
                    data.ToList(),
                    totalItems,
                    appointmentParams.PageIndex,
                    appointmentParams.PageSize
                    );

                Response.AddPaginationHeader(paginatedAppointments.MetaData);

                return Ok(paginatedAppointments);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<AppointmentDto>> GetAppointment(int id)
        {
            var spec = new AppointmentSpecification(id);
            var appointment = await _unitOfWork.Repository<Appointment>().GetEntityWithSpec(spec);

            if (appointment == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<AppointmentDto>(appointment));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateAppointmentByUser([FromBody] AppointmentCreateDto appointmentCreateDto)
        {
            var userName = User.Identity.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName.ToLower());

            if (user == null)
                return Unauthorized(new ApiResponse(401, "User not found"));


            var newAppointment = new Appointment
            {
                AppUserId = user.Id,
                StartDate = appointmentCreateDto.StartDate,
                EndDate = appointmentCreateDto.EndDate,
                Time = TimeSpan.Parse(appointmentCreateDto.Time),
                Description = appointmentCreateDto.Description,
                Location = appointmentCreateDto.Location,
                AppointmentStatusId = appointmentCreateDto.AppointmentStatusId,
                AppointmentTypeId = appointmentCreateDto.AppointmentTypeId,
                PatientId = appointmentCreateDto.PatientId
            };

            _context.Appointments.Add(newAppointment);
            await _context.SaveChangesAsync();

            var appointment = new AppointmentDto
            {
                Id = newAppointment.Id,
                StartDate = newAppointment.StartDate,
                EndDate = newAppointment.EndDate,
                Time = newAppointment.Time,
                Description = newAppointment.Description,
                Location = newAppointment.Location,
                AppointmentStatus = newAppointment.AppointmentStatusId.ToString(),
                AppointmentType = newAppointment.AppointmentTypeId.ToString(),
                Patient = newAppointment.PatientId.ToString()
            };

            return CreatedAtAction(nameof(GetAppointment), new { id = newAppointment.Id }, appointment);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Appointment>> UpdatePatient(int id, AppointmentCreateDto appointmentUpdateDto)
        {
            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);
            _mapper.Map(appointmentUpdateDto, appointment);

            var result = await _unitOfWork.Complete();
            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating appointment information"));

            return Ok(appointment);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAppointment(int id)
        {
            var appointment = await _unitOfWork.Repository<Appointment>().GetByIdAsync(id);

            _unitOfWork.Repository<Appointment>().Delete(appointment);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting appointment information"));

            return Ok();
        }

        [HttpGet("patient/{patientId}/appointments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<AppointmentDto>>> GetPatientAppointments(int patientId)
        {
            var userName = User.Identity.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));
                
            // Check if the patient belongs to the authenticated user
            var patientSpec = new PatientWithAllSpecification(patientId);
            var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

            if (patient == null || patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
            }
            // Filter and get patient appointments
            var appointmentSpec = new AppointmentSpecification(patientId, getByPatientId: true);
            var appointments = await _unitOfWork.Repository<Appointment>().ListAsync(appointmentSpec);
            var appointmentDtos = _mapper.Map<IReadOnlyList<AppointmentDto>>(appointments);

            return Ok(appointmentDtos);
        }

        [HttpGet("patient/{patientId}/appointments/{appointmentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<AppointmentDto>> GetPatientAppointment(int patientId, int appointmentId)
        {
            var userName = User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));

            // Check if the patient belongs to the authenticated user
            var patientSpec = new PatientWithAllSpecification(patientId);
            var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

            if (patient == null || patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
            }

            var appointmentSpec = new AppointmentSpecification(patientId, appointmentId);
            var appointment = await _unitOfWork.Repository<Appointment>().GetEntityWithSpec(appointmentSpec);
            var appointmentDto = _mapper.Map<AppointmentDto>(appointment);

            return Ok(appointmentDto);
        }
    }
}

