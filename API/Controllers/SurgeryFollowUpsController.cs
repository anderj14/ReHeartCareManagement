using API.Errors;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification.CardiologySurgerySpec;
using Core.Specification.SurgeryFollowUpSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SurgeryFollowUpsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly UserManager<AppUser> _userManager;

        public SurgeryFollowUpsController(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            UserManager<AppUser> userManager
            )
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _userManager = userManager;

        }

        // [HttpGet]
        // public async Task<ActionResult<IReadOnlyList<SurgeryFollowUpDto>>> GetSurgeryFollowUps(
        //     [FromQuery] SurgeryFollowUpSpecParams surgeryFollowUpParams
        // )
        // {
        //     var spec = new SurgeryFollowUpSpecification(surgeryFollowUpParams);

        //     var countSpec = new SurgeryFollowUpFilterForCountSpecification(surgeryFollowUpParams);
        //     var totalItems = await _unitOfWork.Repository<SurgeryFollowUp>().CountAsync(countSpec);

        //     var surgeryFollowUps = await _unitOfWork.Repository<SurgeryFollowUp>().ListAsync(spec);

        //     var data = _mapper.Map<IReadOnlyList<SurgeryFollowUpDto>>(surgeryFollowUps);

        //     return Ok(new Pagination<SurgeryFollowUpDto>(surgeryFollowUpParams.PageIndex,
        //     surgeryFollowUpParams.PageSize, totalItems, data));
        // }

        // [HttpGet("{id}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<SurgeryFollowUpDto>> GetSurgeryFollowUp(int id)
        // {
        //     var spec = new SurgeryFollowUpSpecification(id);
        //     var surgeryFollowUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);

        //     if (surgeryFollowUp == null) return NotFound(new ApiResponse(404));

        //     return Ok(_mapper.Map<SurgeryFollowUpDto>(surgeryFollowUp));
        // }

        [HttpGet("cardiologySurgeries/{cardiologySurgeryId}/surgeryFollowUps")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<SurgeryFollowUpDto>>> GetCardiologySurgerySurgeryFollowUps(int cardiologySurgeryId)
        {
            // Check the user
            var userName = User.Identity.Name;
            if (string.IsNullOrEmpty(userName)) return Unauthorized(new ApiResponse(401, "User not authenticated"));

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));

            // Check if the cardiology surgery belongs to a patient associated with the authenticated user
            var cardiologySurgerySpec = new CardiologySurgerySpecification(cardiologySurgeryId);
            var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(cardiologySurgerySpec);

            if (cardiologySurgery == null || cardiologySurgery.Patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Cardiology surgery not found or not authorized"));
            }

            var spec = new SurgeryFollowUpSpecification(cardiologySurgeryId);
            var surgeryFollowUps = await _unitOfWork.Repository<SurgeryFollowUp>().ListAsync(spec);
            var surgeryFollowUpDtos = _mapper.Map<IReadOnlyList<SurgeryFollowUpDto>>(surgeryFollowUps);

            return Ok(surgeryFollowUpDtos);
        }

        [HttpGet("cardiologySurgeries/{cardiologySurgeryId}/surgeryFollowUps/{surgeryFollowUpId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<SurgeryFollowUpDto>> GetCardiologySurgerySurgeryFollowUps(int cardiologySurgeryId, int surgeryFollowUpId)
        {
            // Check the user
            var userName = User.Identity.Name;
            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));

            // Check if the cardiology surgery belongs to a patient associated with the authenticated user
            var cardiologySurgerySpec = new CardiologySurgerySpecification(cardiologySurgeryId);
            var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(cardiologySurgerySpec);

            if (cardiologySurgery == null || cardiologySurgery.Patient.AppUserId != user.Id)
            {
                return NotFound(new ApiResponse(404, "Cardiology surgery not found or not authorized"));
            }

            var spec = new SurgeryFollowUpSpecification(cardiologySurgeryId, surgeryFollowUpId);
            var surgeryFollowUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);
            var surgeryFollowUpDto = _mapper.Map<SurgeryFollowUpDto>(surgeryFollowUp);

            return Ok(surgeryFollowUpDto);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<SurgeryFollowUp>> CreateSurgeryFollowUp(SurgeryFollowUpsCreateDto surgeryFollowUpsCreateDto)
        {
            var surgeryFollowUp = _mapper.Map<SurgeryFollowUpsCreateDto, SurgeryFollowUp>(surgeryFollowUpsCreateDto);

            _unitOfWork.Repository<SurgeryFollowUp>().Add(surgeryFollowUp);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating surgery follow-up"));
            return Ok(surgeryFollowUp);
        }
    }
}