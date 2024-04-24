using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhysicalExaminationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PhysicalExaminationController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<PhysicalExaminationDto>>> GetPhysicalExaminations()
        {
            var physicalExaminations = await _unitOfWork.Repository<PhysicalExamination>().ListAllAsync();

            var physicalExaminationsDtos = _mapper.Map<IReadOnlyList<PhysicalExaminationDto>>(physicalExaminations);

            return Ok(physicalExaminationsDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PhysicalExaminationDto>> GetPhysicalExamination(int id)
        {
            var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetByIdAsync(id);

            var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(physicalExamination);

            return Ok(physicalExaminationDto);
        }

        [HttpGet("patient/{patientId}/physicalExaminations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<PhysicalExaminationDto>>> GetPhysicalExaminationsByPatientId(int patientId)
        {
            var spec = new PhysicalExaminationSpecification(patientId);
            var physicalExaminations = await _unitOfWork.Repository<PhysicalExamination>().ListAsync(spec);
            var physicalExaminationsDtos = _mapper.Map<IReadOnlyList<PhysicalExaminationDto>>(physicalExaminations);

            return Ok(physicalExaminationsDtos);
        }

        [HttpGet("patient/{patientId}/physicalExaminations/{physicalExaminationId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PhysicalExaminationDto>> GetPhysicalExaminationByPatientId(int patientId, int physicalExaminationId)
        {
            var spec = new PhysicalExaminationSpecification(patientId, physicalExaminationId);
            var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetEntityWithSpec(spec);
            var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(physicalExamination);

            return Ok(physicalExaminationDto);
        }
    }
}