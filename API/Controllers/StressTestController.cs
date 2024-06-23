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
    public class StressTestController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public StressTestController(
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
        // public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTests()
        // {
        //     var stressTests = await _unitOfWork.Repository<StressTest>().ListAllAsync();

        //     var stressTestsDtos = _mapper.Map<IReadOnlyList<StressTestDto>>(stressTests);

        //     return Ok(stressTestsDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<StressTestDto>> GetStressTest(int id)
        // {
        //     var stressTest = await _unitOfWork.Repository<StressTest>().GetByIdAsync(id);

        //     var stressTestDto = _mapper.Map<StressTestDto>(stressTest);

        //     return Ok(stressTestDto);
        // }

        [HttpGet("patient/{patientId}/stressTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTestsByPatientId(int patientId)
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
            var spec = new StressTestSpecification(patientId);
            var stressTests = await _unitOfWork.Repository<StressTest>().ListAsync(spec);
            var stressTestsDtos = _mapper.Map<IReadOnlyList<StressTestDto>>(stressTests);

            return Ok(stressTestsDtos);
        }

        [HttpGet("patient/{patientId}/stressTests/{stressTestId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<StressTestDto>>> GetStressTestByPatientId(int patientId, int stressTestId)
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
            var spec = new StressTestSpecification(patientId, stressTestId);
            var stressTests = await _unitOfWork.Repository<StressTest>().GetEntityWithSpec(spec);
            var stressTestsDtos = _mapper.Map<StressTestDto>(stressTests);

            return Ok(stressTestsDtos);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<StressTest>> CreateStressTest(StressTestCreateDto stressTestCreateDto)
        {
            var stressTest = _mapper.Map<StressTestCreateDto, StressTest>(stressTestCreateDto);

            _unitOfWork.Repository<StressTest>().Add(stressTest);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating stress test"));
            return Ok(stressTest);
        }
    }
}