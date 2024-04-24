using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class MedicalHistoryController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public MedicalHistoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<MedicalHistoryDto>>> GetMedicalHistories()
        {
            var medicalHistories = await _unitOfWork.Repository<MedicalHistory>().ListAllAsync();
            var medicalHistoriesDtos = _mapper.Map<IReadOnlyList<MedicalHistoryDto>>(medicalHistories);

            return Ok(medicalHistoriesDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MedicalHistoryDto>> GetMedicalHistory(int id)
        {
            var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetByIdAsync(id);
            var medicalHistoryDto = _mapper.Map<MedicalHistoryDto>(medicalHistory);

            return Ok(medicalHistoryDto);
        }

        [HttpGet("patient/{patientId}/medicalHistories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<MedicalHistoryDto>>> GetMedicalHistoriesByPatientId(int patientId)
        {
            var spec = new MedicalHistorySpecification(patientId);
            var medicalHistories = await _unitOfWork.Repository<MedicalHistory>().ListAsync(spec);
            var medicalHistoriesDtos = _mapper.Map<IReadOnlyList<MedicalHistoryDto>>(medicalHistories);

            return Ok(medicalHistoriesDtos);
        }

        [HttpGet("patient/{patientId}/medicalHistories/{medicalHistoryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<MedicalHistoryDto>> GetMedicalHistoryByPatientId(int patientId, int medicalHistoryId)
        {
            var spec = new MedicalHistorySpecification(patientId, medicalHistoryId);
            var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetEntityWithSpec(spec);
            var medicalHistoryDto = _mapper.Map<MedicalHistoryDto>(medicalHistory);

            return Ok(medicalHistoryDto);
        }
    }
}