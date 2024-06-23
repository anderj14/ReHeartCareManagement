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
    public class MedicalHistoryController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public MedicalHistoryController(
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
        // public async Task<ActionResult<IReadOnlyList<MedicalHistoryDto>>> GetMedicalHistories()
        // {
        //     var medicalHistories = await _unitOfWork.Repository<MedicalHistory>().ListAllAsync();
        //     var medicalHistoriesDtos = _mapper.Map<IReadOnlyList<MedicalHistoryDto>>(medicalHistories);

        //     return Ok(medicalHistoriesDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<MedicalHistoryDto>> GetMedicalHistory(int id)
        // {
        //     var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetByIdAsync(id);
        //     var medicalHistoryDto = _mapper.Map<MedicalHistoryDto>(medicalHistory);

        //     return Ok(medicalHistoryDto);
        // }

        [HttpGet("patient/{patientId}/medicalHistories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<MedicalHistoryDto>>> GetMedicalHistoriesByPatientId(int patientId)
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

            var spec = new MedicalHistorySpecification(patientId);
            var medicalHistories = await _unitOfWork.Repository<MedicalHistory>().ListAsync(spec);
            var medicalHistoriesDtos = _mapper.Map<IReadOnlyList<MedicalHistoryDto>>(medicalHistories);

            return Ok(medicalHistoriesDtos);
        }

        [HttpGet("patient/{patientId}/medicalHistories/{medicalHistoryId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<MedicalHistoryDto>> GetMedicalHistoryByPatientId(int patientId, int medicalHistoryId)
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

            var spec = new MedicalHistorySpecification(patientId, medicalHistoryId);
            var medicalHistory = await _unitOfWork.Repository<MedicalHistory>().GetEntityWithSpec(spec);
            var medicalHistoryDto = _mapper.Map<MedicalHistoryDto>(medicalHistory);

            return Ok(medicalHistoryDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MedicalHistory>> CreateMedicalHistory(MedicalHistoryCreateDto medicalHistoryCreateDto)
        {
            var medicalHistory = _mapper.Map<MedicalHistoryCreateDto, MedicalHistory>(medicalHistoryCreateDto);

            _unitOfWork.Repository<MedicalHistory>().Add(medicalHistory);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating medical history"));
            return Ok(medicalHistory);
        }
    }
}