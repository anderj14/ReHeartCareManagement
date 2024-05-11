using System.Linq.Expressions;
using API.Errors;
using API.Extensions;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Core.Specification.CardiologySurgerySpec;
using Infraestructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardiologySurgeriesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly ManagementContext _context;
        private readonly UserManager<AppUser> _userManager;
        public CardiologySurgeriesController(
            IMapper mapper,
            IUnitOfWork unitOfWork,
            ManagementContext context,
            UserManager<AppUser> userManager
            )
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("allSurgeries")]
        // [Authorize]
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

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<CardiologySurgeryDto>>> GetCardiologySurgeriesByUser(
        [FromQuery] CardiologySurgerySpecParams cardiologySurgeryParams
        )
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);

                if (appUser == null)
                {
                    return NotFound("User not found");
                }

                Expression<Func<CardiologySurgery, bool>> filter = (cardiologySurgery) => cardiologySurgery.AppUserId == appUser.Id;


                var spec = new CardiologySurgerySpecification(cardiologySurgeryParams);
                var countSpec = new CardiologySurgeryFilterForCountSpecification(cardiologySurgeryParams);
                var totalItems = await _unitOfWork.Repository<CardiologySurgery>().CountAsync(countSpec);

                var cardiologySurgeries = await _unitOfWork.Repository<CardiologySurgery>().ListAllByUserAsync(filter, spec);
                var data = _mapper.Map<IReadOnlyList<CardiologySurgeryDto>>(cardiologySurgeries);

                return Ok(new Pagination<CardiologySurgeryDto>(cardiologySurgeryParams.PageIndex,
                    cardiologySurgeryParams.PageSize, totalItems, data));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

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

        [HttpPost]
        [Authorize]
        public async Task<ActionResult> CreateSurgeryByUser([FromBody] CardiologySurgeryCreateDto surgeryCreateDto)
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);


                if (surgeryCreateDto == null)
                {
                    return BadRequest("You can not create an invalid surgery");
                }

                if (appUser == null)
                {
                    return BadRequest("This user is not allowed to use this endpoint");
                }

                var newSurgery = new CardiologySurgery
                {
                    AppUserId = appUser.Id,
                    SurgeryName = surgeryCreateDto.SurgeryName,
                    Date = surgeryCreateDto.Date,
                    Time = TimeSpan.Parse(surgeryCreateDto.Time),
                    ProcedureDescription = surgeryCreateDto.ProcedureDescription,
                    Notes = surgeryCreateDto.Notes,
                    IsEmergency = surgeryCreateDto.IsEmergency,
                    IsElective = surgeryCreateDto.IsElective,
                    OperationRoom = surgeryCreateDto.OperationRoom,
                    PreOpDiagnosis = surgeryCreateDto.PreOpDiagnosis,
                    PostOpDiagnosis = surgeryCreateDto.PostOpDiagnosis,
                    IsSuccessful = surgeryCreateDto.IsSuccessful,
                    Duration = surgeryCreateDto.Duration,
                    CardiacCondition = surgeryCreateDto.CardiacCondition,
                    IsMinimallyInvasive = surgeryCreateDto.IsMinimallyInvasive,
                    PatientId = surgeryCreateDto.PatientId,
                };

                _context.CardiologySurgeries.Add(newSurgery);
                await _context.SaveChangesAsync();

                var cardiologySurgery = new CardiologySurgeryDto
                {
                    Id = newSurgery.Id,
                    SurgeryName = surgeryCreateDto.SurgeryName,
                    Date = surgeryCreateDto.Date,
                    Time = surgeryCreateDto.Time,
                    ProcedureDescription = surgeryCreateDto.ProcedureDescription,
                    Notes = surgeryCreateDto.Notes,
                    IsEmergency = surgeryCreateDto.IsEmergency,
                    IsElective = surgeryCreateDto.IsElective,
                    OperationRoom = surgeryCreateDto.OperationRoom,
                    PreOpDiagnosis = surgeryCreateDto.PreOpDiagnosis,
                    PostOpDiagnosis = surgeryCreateDto.PostOpDiagnosis,
                    IsSuccessful = surgeryCreateDto.IsSuccessful,
                    Duration = surgeryCreateDto.Duration,
                    CardiacCondition = surgeryCreateDto.CardiacCondition,
                    IsMinimallyInvasive = surgeryCreateDto.IsMinimallyInvasive,
                };

                return CreatedAtAction(nameof(GetCardiologySurgery), new { id = newSurgery.Id }, cardiologySurgery);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
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