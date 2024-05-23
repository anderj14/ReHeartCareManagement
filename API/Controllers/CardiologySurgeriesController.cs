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
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult<PagedList<CardiologySurgeryDto>>> GetCardiologySurgeriesByUser(
        [FromQuery] CardiologySurgerySpecParams cardiologySurgeryParams
        )
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrEmpty(userName))
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));
                }

                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                Expression<Func<CardiologySurgery, bool>> filter = (cardiologySurgery) => cardiologySurgery.AppUserId == user.Id;


                var spec = new CardiologySurgerySpecification(cardiologySurgeryParams);
                var countSpec = new CardiologySurgeryFilterForCountSpecification(cardiologySurgeryParams);

                var totalItems = await _unitOfWork.Repository<CardiologySurgery>().CountByUserAsync(filter, countSpec);
                
                if (totalItems == 0)
                {
                    return Ok(new PagedList<PatientDto>(new List<PatientDto>(), 0, cardiologySurgeryParams.PageIndex, cardiologySurgeryParams.PageSize));
                }

                var cardiologySurgeries = await _unitOfWork.Repository<CardiologySurgery>().ListAllByUserAsync(filter, spec, cardiologySurgeryParams.PageIndex, cardiologySurgeryParams.PageSize);
                
                var data = _mapper.Map<IReadOnlyList<CardiologySurgeryDto>>(cardiologySurgeries);

                var paginatedSurgeries = new PagedList<CardiologySurgeryDto>(
                    data.ToList(),
                    totalItems,
                    cardiologySurgeryParams.PageIndex,
                    cardiologySurgeryParams.PageSize
                    );

                Response.AddPaginationHeader(paginatedSurgeries.MetaData);

                return Ok(paginatedSurgeries);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }



        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
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
                var userName = User.Identity.Name;

                if (string.IsNullOrEmpty(userName))
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));
                }

                // var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName.ToLower());
                var user = await _userManager.FindByNameAsync(userName);

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));


                var newSurgery = new CardiologySurgery
                {
                    AppUserId = user.Id,
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