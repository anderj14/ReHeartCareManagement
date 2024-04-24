using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HolterStudyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public HolterStudyController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<HolterStudyDto>>> GetHolterStudies()
        {
            var holterStudies = await _unitOfWork.Repository<HolterStudy>().ListAllAsync();
            var holterStudiesDtos = _mapper.Map<IReadOnlyList<HolterStudyDto>>(holterStudies);

            return Ok(holterStudiesDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HolterStudyDto>> GetHolterStudy(int id)
        {
            var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetByIdAsync(id);
            var holterStudyDto = _mapper.Map<HolterStudyDto>(holterStudy);

            return Ok(holterStudyDto);
        }

        [HttpGet("patient/{patientId}/holterStudies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<HolterStudyDto>>> GetHolterStudiesByPatientId(int patientId)
        {
            var spec = new HolterStudySpecification(patientId);
            var holterStudies = await _unitOfWork.Repository<HolterStudy>().ListAsync(spec);
            var holterStudiesDtos = _mapper.Map<IReadOnlyList<HolterStudyDto>>(holterStudies);

            return Ok(holterStudiesDtos);
        }

        [HttpGet("patient/{patientId}/holterStudies/{holterStudyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<HolterStudyDto>> GetHolterStudyByPatientId(int patientId, int holterStudyId)
        {
            var spec = new HolterStudySpecification(patientId, holterStudyId);
            var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(spec);
            var holterStudyDto = _mapper.Map<HolterStudyDto>(holterStudy);

            return Ok(holterStudyDto);
        }
    }
}