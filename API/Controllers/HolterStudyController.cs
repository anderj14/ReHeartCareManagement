using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.HolterStudyInfo;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class HolterStudyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public HolterStudyController(
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
        // public async Task<ActionResult<IReadOnlyList<HolterStudyDto>>> GetHolterStudies()
        // {
        //     var holterStudies = await _unitOfWork.Repository<HolterStudy>().ListAllAsync();
        //     var holterStudiesDtos = _mapper.Map<IReadOnlyList<HolterStudyDto>>(holterStudies);

        //     return Ok(holterStudiesDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<HolterStudyDto>> GetHolterStudy(int id)
        // {
        //     var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetByIdAsync(id);
        //     var holterStudyDto = _mapper.Map<HolterStudyDto>(holterStudy);

        //     return Ok(holterStudyDto);
        // }

        [HttpGet("patient/{patientId}/holterStudies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<HolterStudyDto>>> GetHolterStudiesByPatientId(int patientId)
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
            
            var spec = new HolterStudySpecification(patientId);
            var holterStudies = await _unitOfWork.Repository<HolterStudy>().ListAsync(spec);
            var holterStudiesDtos = _mapper.Map<IReadOnlyList<HolterStudyDto>>(holterStudies);

            return Ok(holterStudiesDtos);
        }

        [HttpGet("patient/{patientId}/holterStudies/{holterStudyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<HolterStudyDto>> GetHolterStudyByPatientId(int patientId, int holterStudyId)
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
            var spec = new HolterStudySpecification(patientId, holterStudyId);
            var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(spec);
            var holterStudyDto = _mapper.Map<HolterStudyDto>(holterStudy);

            return Ok(holterStudyDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<HolterStudy>> CreateHolterStudy(HolterStudyCreateDto holterStudyCreateDto)
        {
            var holterStudy = _mapper.Map<HolterStudyCreateDto, HolterStudy>(holterStudyCreateDto);

            _unitOfWork.Repository<HolterStudy>().Add(holterStudy);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating Appointment"));
            return Ok(holterStudy);
        }
    }
}