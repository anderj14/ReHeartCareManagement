using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AppointmentTypesController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public AppointmentTypesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppointmentTypeDto>>> GetAppointmentStatuses()
        {
            var types = await _unitOfWork.Repository<AppointmentType>().ListAllAsync();
            var data = _mapper.Map<IReadOnlyList<AppointmentTypeDto>>(types);

            return Ok(data);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppointmentTypeDto>> GetAppointmentStatus(int id)
        {
            var type = await _unitOfWork.Repository<AppointmentType>().GetByIdAsync(id);
            var data = _mapper.Map<AppointmentTypeDto>(type);
            return Ok(data);
        }
    }
}