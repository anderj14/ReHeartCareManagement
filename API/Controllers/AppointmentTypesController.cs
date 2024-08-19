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
    public class AppointmentTypesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AppointmentTypesController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager): base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<AppointmentTypeDto>>> GetAppointmentStatuses()
        {
            var types = await _unitOfWork.Repository<AppointmentType>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<AppointmentTypeDto>>(types);

            return Ok(data);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<AppointmentTypeDto>> GetAppointmentStatus(int id)
        {
            var type = await _unitOfWork.Repository<AppointmentType>().GetByIdAsync(id);

            if (type == null) return NotFound(new ApiResponse(404, "Appointment type not found"));

            var data = _mapper.Map<AppointmentTypeDto>(type);
            return Ok(data);
        }

          /// Create a new appointment type.
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<AppointmentTypeDto>> CreateAppointmentTypes(AppointmentTypeCreateDto appointmentTypeCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 Bad Request for invalid data.
            }

            var appointmentTypes = _mapper.Map<AppointmentType>(appointmentTypeCreateDto);

            _unitOfWork.Repository<AppointmentType>().Add(appointmentTypes);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating appointment type"));

            var statusDto = _mapper.Map<AppointmentTypeDto>(appointmentTypes);
            return CreatedAtAction(nameof(GetAppointmentStatus), new { id = statusDto.Id }, statusDto); // Return 201 Created with the new appointment type and its location.
        }

        /// Update an existing appointment type by ID.
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<AppointmentType>> UpdateAppointmentTypes(int id, AppointmentTypeCreateDto appointmentTypeUpdateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 Bad Request for invalid data.
            }

            var appointmentTypes = await _unitOfWork.Repository<AppointmentType>().GetByIdAsync(id);

            if (appointmentTypes == null) return NotFound(new ApiResponse(404, "Appointment type not found"));

            _mapper.Map(appointmentTypeUpdateDto, appointmentTypes);
            _unitOfWork.Repository<AppointmentType>().Update(appointmentTypes);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating appointment type information"));

            return Ok(appointmentTypeUpdateDto); // Return 200 OK with the updated appointment type data.
        }

        /// Delete an appointment type by ID.
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteAppointmentTypes(int id)
        {
            var appointmentTypes = await _unitOfWork.Repository<AppointmentType>().GetByIdAsync(id);

            if (appointmentTypes == null) return NotFound(new ApiResponse(404, "Appointment type not found"));

            _unitOfWork.Repository<AppointmentType>().Delete(appointmentTypes);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting appointment information"));

            return Ok(); // Return 200 OK to indicate successful deletion.
        }
    }
}