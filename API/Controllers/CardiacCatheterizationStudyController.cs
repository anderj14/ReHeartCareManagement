
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
    public class CardiacCatheterizationStudyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly UserManager<AppUser> _userManager;

        public CardiacCatheterizationStudyController(
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
        // public async Task<ActionResult<IReadOnlyList<CardiacCatheterizationStudyDto>>> GetCardiacCatheterizationStudies()
        // {
        //     var cardiacCatheterizationStudies = await _unitOfWork.Repository<CardiacCatheterizationStudy>().ListAllAsync();
        //     var cardiacCatheterizationStudiesDto = _mapper.Map<IReadOnlyList<CardiacCatheterizationStudyDto>>(cardiacCatheterizationStudies);

        //     return Ok(cardiacCatheterizationStudiesDto);
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<CardiacCatheterizationStudyDto>> GetCardiacCatheterizationStudy(int id)
        // {
        //     var cardiacCatheterizationStudy = await _unitOfWork.Repository<CardiacCatheterizationStudy>().GetByIdAsync(id);
        //     var cardiacCatheterizationStudyDto = _mapper.Map<CardiacCatheterizationStudyDto>(cardiacCatheterizationStudy);

        //     return Ok(cardiacCatheterizationStudyDto);
        // }

        [HttpGet("patient/{patientId}/cardiacCathStudies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<CardiacCatheterizationStudyDto>>> GetCardiacCathStudiesByPatientId(int patientId)
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

            var spec = new CardiacCatheterizationStudySpecification(patientId);
            var cardiacCatheterizationStudies = await _unitOfWork.Repository<CardiacCatheterizationStudy>().ListAsync(spec);
            var cardiacCatheterizationStudyDtos = _mapper.Map<IReadOnlyList<CardiacCatheterizationStudyDto>>(cardiacCatheterizationStudies);

            return Ok(cardiacCatheterizationStudyDtos);
        }

        [HttpGet("patient/{patientId}/cardiacCathStudies/{cardiacCathStudyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CardiacCatheterizationStudyDto>> GetCardiacCathStudyIdByPatientId(
            int patientId, int cardiacCathStudyId)
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

            var spec = new CardiacCatheterizationStudySpecification(patientId, cardiacCathStudyId);
            var cardiacCathStudy = await _unitOfWork.Repository<CardiacCatheterizationStudy>().GetEntityWithSpec(spec);
            var cardiacCathStudyDto = _mapper.Map<CardiacCatheterizationStudyDto>(cardiacCathStudy);

            return Ok(cardiacCathStudyDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CardiacCatheterizationStudy>> CreateCardiacCathStudy(CardiacCathStudyCreateDto cardiacCathStudyCreateDto)
        {
            var cardiacCathStudy = _mapper.Map<CardiacCathStudyCreateDto, CardiacCatheterizationStudy>(cardiacCathStudyCreateDto);

            _unitOfWork.Repository<CardiacCatheterizationStudy>().Add(cardiacCathStudy);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating cardiac catheterization study"));

            return Ok(cardiacCathStudy);
        }

    }

}