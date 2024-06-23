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
    public class EchocardiogramController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public EchocardiogramController(
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
        // public async Task<ActionResult<IReadOnlyList<EchocardiogramDto>>> GetEchocardiograms()
        // {
        //     var echocardiograms = await _unitOfWork.Repository<Echocardiogram>().ListAllAsync();
        //     var echocardiogramsDtos = _mapper.Map<IReadOnlyList<EchocardiogramDto>>(echocardiograms);

        //     return Ok(echocardiogramsDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<EchocardiogramDto>> GetEchocardiogram(int id)
        // {
        //     var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetByIdAsync(id);
        //     var echocardiogramDto = _mapper.Map<EchocardiogramDto>(echocardiogram);

        //     return Ok(echocardiogramDto);
        // }

        [HttpGet("patient/{patientId}/echocardiograms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<DiagnosticDto>>> GetEchocardiogramByPatientId(int patientId)
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

            var spec = new EchocardiogramSpecification(patientId);
            var echocardiograms = await _unitOfWork.Repository<Echocardiogram>().ListAsync(spec);
            var echocardiogramDtos = _mapper.Map<IReadOnlyList<EchocardiogramDto>>(echocardiograms);

            return Ok(echocardiogramDtos);
        }

        [HttpGet("patient/{patientId}/echocardiograms/{echocardiogramId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<EchocardiogramDto>> GetEchocardiogramByPatientId(
            int patientId, int echocardiogramId)
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

            var spec = new EchocardiogramSpecification(patientId, echocardiogramId);
            var echocardiogram = await _unitOfWork.Repository<Echocardiogram>().GetEntityWithSpec(spec);
            var echocardiogramDto = _mapper.Map<EchocardiogramDto>(echocardiogram);

            return Ok(echocardiogramDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Echocardiogram>> CreateEchocardiogram(EchocardiogramCreateDto echocardiogramCreateDto)
        {
            var echocardiogram = _mapper.Map<EchocardiogramCreateDto, Echocardiogram>(echocardiogramCreateDto);

            _unitOfWork.Repository<Echocardiogram>().Add(echocardiogram);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating echocardiogram"));
            return Ok(echocardiogram);
        }

    }
}