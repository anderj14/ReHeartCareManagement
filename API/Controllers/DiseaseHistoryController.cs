using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DiseaseHistoryController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public DiseaseHistoryController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<DiseaseHistoryDto>>> GetDiseaseHistories()
        {
            var diseaseHistories = await _unitOfWork.Repository<DiseaseHistory>().ListAllAsync();
            var diseaseHistoriesDtos = _mapper.Map<IReadOnlyList<DiseaseHistoryDto>>(diseaseHistories);

            return Ok(diseaseHistoriesDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DiseaseHistoryDto>> GetDiseaseHistory(int id)
        {
            var diseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetByIdAsync(id);
            var diseaseHistoryDto = _mapper.Map<DiseaseHistoryDto>(diseaseHistory);

            return Ok(diseaseHistoryDto);
        }

        [HttpGet("patient/{patientId}/diseasesHistories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<DiseaseHistoryDto>>> GetTreatmentsByPatientId(int patientId)
        {
            var spec = new DiseaseHistorySpecification(patientId);
            var diseasesHistories = await _unitOfWork.Repository<DiseaseHistory>().ListAsync(spec);
            var diseasesHistoriesDtos = _mapper.Map<IReadOnlyList<DiseaseHistoryDto>>(diseasesHistories);

            return Ok(diseasesHistoriesDtos);
        }

        [HttpGet("patient/{patientId}/diseasesHistories/{diseaseHistoryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DiseaseHistoryDto>> GetTreatmentByPatientId(int patientId, int diseaseHistoryId)
        {
            var spec = new DiseaseHistorySpecification(patientId, diseaseHistoryId);
            var diseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetEntityWithSpec(spec);
            var diseaseHistoryDto = _mapper.Map<DiseaseHistoryDto>(diseaseHistory);

            return Ok(diseaseHistoryDto);
        }
    }
}

