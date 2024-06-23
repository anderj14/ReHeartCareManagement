using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PatientStatusesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PatientStatusesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<PatientStatus>>> GetPatientStatuses()
        {
            var patientStatuses = await _unitOfWork.Repository<PatientStatus>().ListAllAsync();
            var patientStatusesDto = _mapper.Map<IReadOnlyList<PatientStatus>>(patientStatuses);

            return Ok(patientStatusesDto);
        }

        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<PatientStatus>> GetPatientStatus(int id)
        {
            var patientStatus = await _unitOfWork.Repository<PatientStatus>().GetByIdAsync(id);
            var patientStatusDto = _mapper.Map<PatientStatus>(patientStatus);

            return Ok(patientStatusDto);
        }
    }
}