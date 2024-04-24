using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StressTestController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public StressTestController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTests()
        {
            var stressTests = await _unitOfWork.Repository<StressTest>().ListAllAsync();

            var stressTestsDtos = _mapper.Map<IReadOnlyList<StressTestDto>>(stressTests);

            return Ok(stressTestsDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<StressTestDto>> GetStressTest(int id)
        {
            var stressTest = await _unitOfWork.Repository<StressTest>().GetByIdAsync(id);

            var stressTestDto = _mapper.Map<StressTestDto>(stressTest);

            return Ok(stressTestDto);
        }

        [HttpGet("patient/{patientId}/stressTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTestsByPatientId(int patientId)
        {
            var spec = new StressTestSpecification(patientId);
            var stressTests = await _unitOfWork.Repository<StressTest>().ListAsync(spec);
            var stressTestsDtos = _mapper.Map<IReadOnlyList<StressTestDto>>(stressTests);

            return Ok(stressTestsDtos);
        }

        [HttpGet("patient/{patientId}/stressTests/{stressTestId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTestByPatientId(int patientId, int stressTestId)
        {
            var spec = new StressTestSpecification(patientId, stressTestId);
            var stressTests = await _unitOfWork.Repository<StressTest>().GetEntityWithSpec(spec);
            var stressTestsDtos = _mapper.Map<StressTestDto>(stressTests);

            return Ok(stressTestsDtos);
        }
    }
}