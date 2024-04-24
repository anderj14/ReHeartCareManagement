using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class DiagnosticController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public DiagnosticController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetDiagnostics()
        {
            var diagnostics = await _unitOfWork.Repository<Diagnostic>().ListAllAsync();
            var DiagnosticsDto = _mapper.Map<IReadOnlyList<DiagnosticDto>>(diagnostics);

            return Ok(DiagnosticsDto);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DiagnosticDto>> GetDiagnostic(int id)
        {
            var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetByIdAsync(id);
            var diagnosticDto = _mapper.Map<DiagnosticDto>(diagnostic);

            return Ok(diagnosticDto);
        }

        [HttpGet("patient/{patientId}/diagnostics")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetDiagnosticsByPatientId(int patientId)
        {
            var spec = new DiagnosticSpecification(patientId);
            var diagnostics = await _unitOfWork.Repository<Diagnostic>().ListAsync(spec);
            var diagnosticDtos = _mapper.Map<IReadOnlyList<DiagnosticDto>>(diagnostics);

            return Ok(diagnosticDtos);
        }

        [HttpGet("patient/{patientId}/diagnostics/{diagnosticId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<DiagnosticDto>> GetDiagnosticIdByPatientId(
            int patientId, int diagnosticId)
        {
            var spec = new DiagnosticSpecification(patientId, diagnosticId);
            var diagnostic = await _unitOfWork.Repository<Diagnostic>().GetEntityWithSpec(spec);
            var diagnosticDto = _mapper.Map<DiagnosticDto>(diagnostic);

            return Ok(diagnosticDto);
        }
    }
}