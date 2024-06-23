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
    public class TreatmentController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public TreatmentController(
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
        // public async Task<ActionResult<IReadOnlyList<TreatmentDto>>> GetTreatments()
        // {
        //     var treatments = await _unitOfWork.Repository<Treatment>().ListAllAsync();

        //     var treatmentsDtos = _mapper.Map<IReadOnlyList<TreatmentDto>>(treatments);

        //     return Ok(treatmentsDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // [Authorize]
        // public async Task<ActionResult<TreatmentDto>> GetTreatment(int id)
        // {
        //     var stressTest = await _unitOfWork.Repository<Treatment>().GetByIdAsync(id);

        //     var stressTestDto = _mapper.Map<TreatmentDto>(stressTest);

        //     return Ok(stressTestDto);
        // }

        [HttpGet("patient/{patientId}/treatments")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<TreatmentDto>>> GetTreatmentsByPatientId(int patientId)
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

            var spec = new TreatmentSpecification(patientId);
            var treatments = await _unitOfWork.Repository<Treatment>().ListAsync(spec);
            var treatmentsDtos = _mapper.Map<IReadOnlyList<TreatmentDto>>(treatments);

            return Ok(treatmentsDtos);
        }

        [HttpGet("patient/{patientId}/treatments/{treatmentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<TreatmentDto>> GetTreatmentByPatientId(int patientId, int treatmentId)
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

            var spec = new TreatmentSpecification(patientId, treatmentId);
            var treatment = await _unitOfWork.Repository<Treatment>().GetEntityWithSpec(spec);
            var treatmentDto = _mapper.Map<TreatmentDto>(treatment);

            return Ok(treatmentDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Treatment>> CreateTreatment(TreatmentCreateDto treatmentCreateDto)
        {
            var treatment = _mapper.Map<TreatmentCreateDto, Treatment>(treatmentCreateDto);

            _unitOfWork.Repository<Treatment>().Add(treatment);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating treatment"));
            return Ok(treatment);
        }
    }
}