using API.Errors;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Core.Specification.CardiologySurgerySpec;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardiologySurgeriesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public CardiologySurgeriesController(IMapper mapper, IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<CardiologySurgeryDto>>> GetCardiologySurgeries(
            [FromQuery] CardiologySurgerySpecParams cardiologySurgeryParams
        )
        {
            var spec = new CardiologySurgerySpecification(cardiologySurgeryParams);
            var countSpec = new CardiologySurgeryFilterForCountSpecification(cardiologySurgeryParams);
            var totalItems = await _unitOfWork.Repository<CardiologySurgery>().CountAsync(countSpec);

            var cardiologySurgeries = await _unitOfWork.Repository<CardiologySurgery>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<CardiologySurgeryDto>>(cardiologySurgeries);

            return Ok(new Pagination<CardiologySurgeryDto>(cardiologySurgeryParams.PageIndex,
                cardiologySurgeryParams.PageSize, totalItems, data));
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<CardiologySurgeryDto>> GetCardiologySurgery(int id)
        {
            var spec = new CardiologySurgerySpecification(id);

            var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(spec);

            if (cardiologySurgery == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<CardiologySurgery, CardiologySurgeryDto>(cardiologySurgery));
        }

        // [HttpGet("patient/{patientId}/cardiologySurgeries")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<IReadOnlyList<CardiologySurgeryDto>>> GetPatientCardiologySurgeries(int patientId)
        // {
        //     var spec = new CardiologySurgerySpecification(patientId);
            
        //     var cardiologySurgeries = await _unitOfWork.Repository<CardiologySurgery>().ListAsync(spec);
        //     var cardiologySurgeryDtos = _mapper.Map<IReadOnlyList<CardiologySurgeryDto>>(cardiologySurgeries);

        //     return Ok(cardiologySurgeryDtos);
        // }

        // [HttpGet("patient/{patientId}/cardiologySurgeries/{cardiologySurgeryId}")]
        // [ProducesResponseType(StatusCodes.Status200OK)]
        // [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        // public async Task<ActionResult<CardiologySurgeryDto>> GetPatientCardiologySurgery(int patientId, int cardiologySurgeryId)
        // {
        //     var spec = new CardiologySurgerySpecification(patientId, cardiologySurgeryId);
            
        //     var cardiologySurgery = await _unitOfWork.Repository<CardiologySurgery>().GetEntityWithSpec(spec);
        //     var cardiologySurgeryDto = _mapper.Map<CardiologySurgeryDto>(cardiologySurgery);

        //     return Ok(cardiologySurgeryDto);
        // }
    }
}