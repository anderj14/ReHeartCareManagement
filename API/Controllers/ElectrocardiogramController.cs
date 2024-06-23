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
    public class ElectrocardiogramController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public ElectrocardiogramController(
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
        // public async Task<ActionResult<IReadOnlyList<ElectrocardiogramDto>>> GetElectrocardiograms()
        // {
        //     var electrocardiograms = await _unitOfWork.Repository<Electrocardiogram>().ListAllAsync();
        //     var electrocardiogramsDtos = _mapper.Map<IReadOnlyList<ElectrocardiogramDto>>(electrocardiograms);

        //     return Ok(electrocardiogramsDtos);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<ElectrocardiogramDto>> GetElectrocardiogram(int id)
        // {
        //     var electrocardiogram = await _unitOfWork.Repository<Electrocardiogram>().GetByIdAsync(id);
        //     var electrocardiogramDto = _mapper.Map<ElectrocardiogramDto>(electrocardiogram);

        //     return Ok(electrocardiogramDto);
        // }

        [HttpGet("patient/{patientId}/electrocardiograms")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<Electrocardiogram>>> GetElectrocardiogramsByPatientId(int patientId)
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

            var spec = new ElectrocardiogramSpecification(patientId);
            var electrocardiograms = await _unitOfWork.Repository<Electrocardiogram>().ListAsync(spec);
            var electrocardiogramsDtos = _mapper.Map<IReadOnlyList<ElectrocardiogramDto>>(electrocardiograms);

            return Ok(electrocardiogramsDtos);
        }

        [HttpGet("patient/{patientId}/electrocardiograms/{electrocardiogramId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<Electrocardiogram>> GetElectrocardiogramByPatientId(int patientId, int electrocardiogramId)
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

            var spec = new ElectrocardiogramSpecification(patientId, electrocardiogramId);
            var electrocardiogram = await _unitOfWork.Repository<Electrocardiogram>().GetEntityWithSpec(spec);
            var electrocardiogramDto = _mapper.Map<ElectrocardiogramDto>(electrocardiogram);

            return Ok(electrocardiogramDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Electrocardiogram>> CreateElectrocardiogram(ElectrocardiogramCreateDto electrocardiogramCreateDto)
        {
            var electrocardiogram = _mapper.Map<ElectrocardiogramCreateDto, Electrocardiogram>(electrocardiogramCreateDto);

            _unitOfWork.Repository<Electrocardiogram>().Add(electrocardiogram);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating electrocardiogram"));
            return Ok(electrocardiogram);
        }
    }
}