using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DiseaseHistoryController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public DiseaseHistoryController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            UserManager<AppUser> userManager

            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _userManager = userManager;
        }

        // [HttpGet]
        // public async Task<ActionResult<IReadOnlyList<DiseaseHistoryDto>>> GetDiseaseHistories()
        // {
        //     var spec = new DiseaseHistorySpecification();

        //     var diseaseHistories = await _unitOfWork.Repository<DiseaseHistory>().ListAsync(spec);
        //     var diseaseHistoriesDtos = _mapper.Map<IReadOnlyList<DiseaseHistoryDto>>(diseaseHistories);

        //     return Ok(diseaseHistoriesDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<DiseaseHistoryDto>> GetDiseaseHistory(int id)
        // {
        //     var diseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetByIdAsync(id);
        //     var diseaseHistoryDto = _mapper.Map<DiseaseHistoryDto>(diseaseHistory);

        //     return Ok(diseaseHistoryDto);
        // }

        [HttpGet("patient/{patientId}/diseasesHistories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<DiseaseHistoryDto>>> GetTreatmentsByPatientId(int patientId)
        {
            var userName = User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));

            // Check if the patient belongs to the authenticated user
            var patientSpec = new PatientWithAllSpecification(patientId);
            var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

            if (patient == null || patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
            }

            var spec = new DiseaseHistorySpecification(patientId);
            var diseasesHistories = await _unitOfWork.Repository<DiseaseHistory>().ListAsync(spec);
            var diseasesHistoriesDtos = _mapper.Map<IReadOnlyList<DiseaseHistoryDto>>(diseasesHistories);

            return Ok(diseasesHistoriesDtos);
        }

        [HttpGet("patient/{patientId}/diseasesHistories/{diseaseHistoryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<DiseaseHistoryDto>> GetTreatmentByPatientId(int patientId, int diseaseHistoryId)
        {
            var userName = User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));

            // Check if the patient belongs to the authenticated user
            var patientSpec = new PatientWithAllSpecification(patientId);
            var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

            if (patient == null || patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
            }

            var spec = new DiseaseHistorySpecification(patientId, diseaseHistoryId);
            var diseaseHistory = await _unitOfWork.Repository<DiseaseHistory>().GetEntityWithSpec(spec);
            var diseaseHistoryDto = _mapper.Map<DiseaseHistoryDto>(diseaseHistory);

            return Ok(diseaseHistoryDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<DiseaseHistory>> CreateDiseaseHistory(DiseaseHistoryCreateDto diseaseHistoryCreateDto)
        {
            var diseaseHistory = _mapper.Map<DiseaseHistoryCreateDto, DiseaseHistory>(diseaseHistoryCreateDto);

            _unitOfWork.Repository<DiseaseHistory>().Add(diseaseHistory);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating disease history"));

            return Ok(diseaseHistory);
        }
    }
}

