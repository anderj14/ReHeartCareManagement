using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class TreatmentController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public TreatmentController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<TreatmentDto>>> GetTreatments()
        {
            var treatments = await _unitOfWork.Repository<Treatment>().ListAllAsync();

            var treatmentsDtos = _mapper.Map<IReadOnlyList<TreatmentDto>>(treatments);

            return Ok(treatmentsDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TreatmentDto>> GetTreatment(int id)
        {
            var stressTest = await _unitOfWork.Repository<Treatment>().GetByIdAsync(id);

            var stressTestDto = _mapper.Map<TreatmentDto>(stressTest);

            return Ok(stressTestDto);
        }

        [HttpGet("patient/{patientId}/treatments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<TreatmentDto>>> GetTreatmentsByPatientId(int patientId)
        {
            var spec = new TreatmentSpecification(patientId);
            var treatments = await _unitOfWork.Repository<Treatment>().ListAsync(spec);
            var treatmentsDtos = _mapper.Map<IReadOnlyList<TreatmentDto>>(treatments);

            return Ok(treatmentsDtos);
        }

        [HttpGet("patient/{patientId}/treatments/{treatmentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<TreatmentDto>> GetTreatmentByPatientId(int patientId, int treatmentId)
        {
            var spec = new TreatmentSpecification(patientId, treatmentId);
            var treatment = await _unitOfWork.Repository<Treatment>().GetEntityWithSpec(spec);
            var treatmentDto = _mapper.Map<TreatmentDto>(treatment);

            return Ok(treatmentDto);
        }
    }
}