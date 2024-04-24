using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class EchocardiogramController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public EchocardiogramController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<EchocardiogramDto>>> GetEchocardiograms()
        {
            var echocardiograms = await _unitOfWork.Repository<Echocardiogram>().ListAllAsync();
            var echocardiogramsDtos = _mapper.Map<IReadOnlyList<EchocardiogramDto>>(echocardiograms);

            return Ok(echocardiogramsDtos);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EchocardiogramDto>> GetEchocardiogram(int id)
        {
            var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetByIdAsync(id);
            var echocardiogramDto = _mapper.Map<EchocardiogramDto>(echocardiogram);

            return Ok(echocardiogramDto);
        }

        [HttpGet("patient/{patientId}/echocardiograms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetEchocardiogramByPatientId(int patientId)
        {
            var spec = new EchocardiogramSpecification(patientId);
            var echocardiograms = await _unitOfWork.Repository<Echocardiogram>().ListAsync(spec);
            var echocardiogramDtos = _mapper.Map<IReadOnlyList<EchocardiogramDto>>(echocardiograms);

            return Ok(echocardiogramDtos);
        }

        [HttpGet("patient/{patientId}/echocardiograms/{echocardiogramId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<EchocardiogramDto>> GetEchocardiogramByPatientId(
            int patientId, int echocardiogramId)
        {
            var spec = new EchocardiogramSpecification(patientId, echocardiogramId);
            var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetEntityWithSpec(spec);
            var echocardiogramDto = _mapper.Map<EchocardiogramDto>(echocardiogram);

            return Ok(echocardiogramDto);
        }

    }
}