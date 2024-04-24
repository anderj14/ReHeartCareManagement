using API.Errors;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification.SurgeryFollowUpSpec;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class SurgeryFollowUpsController : BaseApiController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public SurgeryFollowUpsController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<SurgeryFollowUpDto>>> GetSurgeryFollowUps(
            [FromQuery] SurgeryFollowUpSpecParams surgeryFollowUpParams
        )
        {
            var spec = new SurgeryFollowUpSpecification(surgeryFollowUpParams);

            var countSpec = new SurgeryFollowUpFilterForCountSpecification(surgeryFollowUpParams);
            var totalItems = await _unitOfWork.Repository<SurgeryFollowUp>().CountAsync(countSpec);

            var surgeryFollowUps = await _unitOfWork.Repository<SurgeryFollowUp>().ListAsync(spec);

            var data = _mapper.Map<IReadOnlyList<SurgeryFollowUpDto>>(surgeryFollowUps);

            return Ok(new Pagination<SurgeryFollowUpDto>(surgeryFollowUpParams.PageIndex,
            surgeryFollowUpParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SurgeryFollowUpDto>> GetSurgeryFollowUp(int id)
        {
            var spec = new SurgeryFollowUpSpecification(id);
            var surgeryFollowUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);

            if (surgeryFollowUp == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<SurgeryFollowUpDto>(surgeryFollowUp));
        }

        [HttpGet("cardiologySurgeries/{cardiologySurgeryId}/surgeryFollowUps")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<SurgeryFollowUpDto>>> GetCardiologySurgerySurgeryFollowUps(int cardiologySurgeryId)
        {
            var spec = new SurgeryFollowUpSpecification(cardiologySurgeryId);
            var surgeryFollowUps = await _unitOfWork.Repository<SurgeryFollowUp>().ListAsync(spec);
            var surgeryFollowUpDtos = _mapper.Map<IReadOnlyList<SurgeryFollowUpDto>>(surgeryFollowUps);

            return Ok(surgeryFollowUpDtos);
        }

        [HttpGet("cardiologySurgeries/{cardiologySurgeryId}/surgeryFollowUps/{surgeryFollowUpId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<SurgeryFollowUpDto>> GetCardiologySurgerySurgeryFollowUps(int cardiologySurgeryId, int surgeryFollowUpId)
        {
            var spec = new SurgeryFollowUpSpecification(cardiologySurgeryId, surgeryFollowUpId);
            var surgeryFollowUp = await _unitOfWork.Repository<SurgeryFollowUp>().GetEntityWithSpec(spec);
            var surgeryFollowUpDto = _mapper.Map<SurgeryFollowUpDto>(surgeryFollowUp);

            return Ok(surgeryFollowUpDto);
        }
    }
}