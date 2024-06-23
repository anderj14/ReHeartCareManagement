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
    public class DiagnosticController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public DiagnosticController(
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
        // public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetDiagnostics()
        // {
        //     var diagnostics = await _unitOfWork.Repository<Diagnostic>().ListAllAsync();
        //     var DiagnosticsDto = _mapper.Map<IReadOnlyList<DiagnosticDto>>(diagnostics);

        //     return Ok(DiagnosticsDto);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<DiagnosticDto>> GetDiagnostic(int id)
        // {
        //     var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetByIdAsync(id);
        //     var diagnosticDto = _mapper.Map<DiagnosticDto>(diagnostic);

        //     return Ok(diagnosticDto);
        // }

        [HttpGet("patient/{patientId}/diagnostics")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetDiagnosticsByPatientId(int patientId)
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

            var spec = new DiagnosticSpecification(patientId);
            var diagnostics = await _unitOfWork.Repository<Diagnostic>().ListAsync(spec);
            var diagnosticDtos = _mapper.Map<IReadOnlyList<DiagnosticDto>>(diagnostics);

            return Ok(diagnosticDtos);
        }

        [HttpGet("patient/{patientId}/diagnostics/{diagnosticId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<DiagnosticDto>> GetDiagnosticIdByPatientId(
            int patientId, int diagnosticId)
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

            var spec = new DiagnosticSpecification(patientId, diagnosticId);
            var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetEntityWithSpec(spec);
            var diagnosticDto = _mapper.Map<DiagnosticDto>(diagnostic);

            return Ok(diagnosticDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Diagnostic>> CreateDiagnostic(DiagnosticCreateDto diagnosticCreateDto)
        {
            var diagnostic = _mapper.Map<DiagnosticCreateDto, Diagnostic>(diagnosticCreateDto);

            _unitOfWork.Repository<Diagnostic>().Add(diagnostic);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating diagnostic"));

            return Ok(diagnostic);

        }
    }
}