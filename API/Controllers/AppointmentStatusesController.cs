using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentStatusesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AppointmentStatusesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppointmentStatusDto>>> GetAppointmentStatuses()
        {
            var statuses = await _unitOfWork.Repository<AppointmentStatus>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<AppointmentStatusDto>>(statuses);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentStatusDto>> GetAppointmentStatus(int id)
        {
            var status = await _unitOfWork.Repository<AppointmentStatus>().GetByIdAsync(id);
            var data = _mapper.Map<AppointmentStatusDto>(status);
            return Ok(data);
        }

        [HttpPost]
        public async Task<ActionResult<AppointmentStatus>> CreateAppointmentStatus(AppointmentStatusCreateDto appointmentStatusCreateDto)
        {
            var appointmentStatus = _mapper.Map<AppointmentStatusCreateDto, AppointmentStatus>(appointmentStatusCreateDto);

            _unitOfWork.Repository<AppointmentStatus>().Add(appointmentStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating appointment status"));

            return Ok(appointmentStatus);
        }
    }
}