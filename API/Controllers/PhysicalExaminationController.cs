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
    public class PhysicalExaminationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public PhysicalExaminationController(
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
        // public async Task<ActionResult<IReadOnlyList<PhysicalExaminationDto>>> GetPhysicalExaminations()
        // {
        //     var physicalExaminations = await _unitOfWork.Repository<PhysicalExamination>().ListAllAsync();

        //     var physicalExaminationsDtos = _mapper.Map<IReadOnlyList<PhysicalExaminationDto>>(physicalExaminations);

        //     return Ok(physicalExaminationsDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<PhysicalExaminationDto>> GetPhysicalExamination(int id)
        // {
        //     var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetByIdAsync(id);

        //     var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(physicalExamination);

        //     return Ok(physicalExaminationDto);
        // }

        [HttpGet("patient/{patientId}/physicalExaminations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<PhysicalExaminationDto>>> GetPhysicalExaminationsByPatientId(int patientId)
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

            var spec = new PhysicalExaminationSpecification(patientId);
            var physicalExaminations = await _unitOfWork.Repository<PhysicalExamination>().ListAsync(spec);
            var physicalExaminationsDtos = _mapper.Map<IReadOnlyList<PhysicalExaminationDto>>(physicalExaminations);

            return Ok(physicalExaminationsDtos);
        }

        [HttpGet("patient/{patientId}/physicalExaminations/{physicalExaminationId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<PhysicalExaminationDto>> GetPhysicalExaminationByPatientId(int patientId, int physicalExaminationId)
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

            var spec = new PhysicalExaminationSpecification(patientId, physicalExaminationId);
            var physicalExamination = await _unitOfWork.Repository<PhysicalExamination>().GetEntityWithSpec(spec);
            var physicalExaminationDto = _mapper.Map<PhysicalExaminationDto>(physicalExamination);

            return Ok(physicalExaminationDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PhysicalExamination>> CreatePhysicalExamination(PhysicalExaminationCreateDto physicalExaminationCreateDto)
        {
            var physicalExamination = _mapper.Map<PhysicalExaminationCreateDto, PhysicalExamination>(physicalExaminationCreateDto);

            _unitOfWork.Repository<PhysicalExamination>().Add(physicalExamination);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating physical examination"));
            return Ok(physicalExamination);
        }
    }
}