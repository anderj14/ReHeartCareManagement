using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentStatusesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public AppointmentStatusesController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// Get all appointment statuses.
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<AppointmentStatusDto>>> GetAppointmentStatuses()
        {
            var statuses = await _unitOfWork.Repository<AppointmentStatus>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<AppointmentStatusDto>>(statuses);

            return Ok(data); // Return 200 OK with the list of appointment statuses.
        }

        /// Get a single appointment status by ID.
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppointmentStatusDto>> GetAppointmentStatus(int id)
        {
            var status = await _unitOfWork.Repository<AppointmentStatus>().GetByIdAsync(id);

            if (status == null) return NotFound(new ApiResponse(404, "Appointment status not found"));

            var data = _mapper.Map<AppointmentStatusDto>(status);
            return Ok(data); // Return 200 OK with the requested appointment status.
        }

        /// Create a new appointment status.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AppointmentStatusDto>> CreateAppointmentStatus(AppointmentStatusCreateDto appointmentStatusCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 Bad Request for invalid data.
            }

            var appointmentStatus = _mapper.Map<AppointmentStatus>(appointmentStatusCreateDto);

            _unitOfWork.Repository<AppointmentStatus>().Add(appointmentStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating appointment status"));

            var statusDto = _mapper.Map<AppointmentStatusDto>(appointmentStatus);
            return CreatedAtAction(nameof(GetAppointmentStatus), new { id = statusDto.Id }, statusDto); // Return 201 Created with the new appointment status and its location.
        }

        /// Update an existing appointment status by ID.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<AppointmentStatus>> UpdateAppointmentStatus(int id, AppointmentStatusCreateDto appointmentStatusUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 Bad Request for invalid data.
            }

            var appointmentStatus = await _unitOfWork.Repository<AppointmentStatus>().GetByIdAsync(id);

            if (appointmentStatus == null) return NotFound(new ApiResponse(404, "Appointment status not found"));

            _mapper.Map(appointmentStatusUpdateDto, appointmentStatus);
            _unitOfWork.Repository<AppointmentStatus>().Update(appointmentStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating appointment status information"));

            return Ok(appointmentStatusUpdateDto); // Return 200 OK with the updated appointment status data.
        }

        /// Delete an appointment status by ID.
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAppointmentStatus(int id)
        {
            var appointmentStatus = await _unitOfWork.Repository<AppointmentStatus>().GetByIdAsync(id);

            if (appointmentStatus == null) return NotFound(new ApiResponse(404, "Appointment status not found"));

            _unitOfWork.Repository<AppointmentStatus>().Delete(appointmentStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting appointment information"));

            return Ok(); // Return 200 OK to indicate successful deletion.
        }
    }
}
