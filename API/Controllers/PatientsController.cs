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
using Infraestructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PatientsController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Patient> _patientRepo;
        private readonly UserManager<AppUser> _userManager;
        private readonly ManagementContext _context;

        public PatientsController(
            IUnitOfWork unitOfwork,
            IMapper mapper,
            IGenericRepository<Patient> patientRepo,
            UserManager<AppUser> userManager,
            ManagementContext context

            )
        {
            _mapper = mapper;
            _unitOfWork = unitOfwork;
            _patientRepo = patientRepo;
            _userManager = userManager;
            _context = context;
        }

        [HttpGet("notpag")]
        public async Task<ActionResult<IReadOnlyList<PatientDto>>> GetPatientsNotPage(
            [FromQuery] int pageSize = 100)
        {
            var patientParams = new PatientSpecParams { PageSize = pageSize };
            var spec = new PatientWithAllSpecification(patientParams);
            var products = await _patientRepo.ListAsync(spec);

            return Ok(_mapper.Map<IReadOnlyList<Patient>, IReadOnlyList<PatientDto>>(products));
        }
        [HttpGet("notpag/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PatientDto>> GetPatientNotPage(int id)
        {

            var spec = new PatientWithAllSpecification(id);

            var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(spec);

            if (patient == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Patient, PatientDto>(patient);
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<Pagination<PatientDto>>> GetPatientsByUser(
        [FromQuery] PatientSpecParams noteSpecParams
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

                // Lambda expression to filter notes by current user
                Expression<Func<Patient, bool>> filter = (note) => note.AppUserId == appUser.Id;

                var spec = new PatientWithAllSpecification(noteSpecParams);
                var countSpec = new PatientWithFiltersForCountSpecification(noteSpecParams);
                var totalItems = await _unitOfWork.Repository<Patient>().CountAsync(countSpec);


                var userPatient = await _unitOfWork.Repository<Patient>().ListAllByUserAsync(filter, spec);

                var data = _mapper.Map<IReadOnlyList<PatientDto>>(userPatient);

                return Ok(new Pagination<PatientDto>(
                    noteSpecParams.PageIndex, noteSpecParams.PageSize, totalItems, data
                ));
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<PatientDto>> GetPatient(int id)
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            if (appUser == null)
            {
                return NotFound("User not found");
            }

            Expression<Func<Patient, bool>> filter = (note) => note.AppUserId == appUser.Id;

            var spec = new PatientWithAllSpecification(id);

            var patient = await _unitOfWork.Repository<Patient>().GetEntityByUserAsync(filter, spec);

            if (patient == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<Patient, PatientDto>(patient);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddPatientByUser([FromBody] PatientCreateDto patientDto)
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);


                if (patientDto == null)
                {
                    return BadRequest("You can not create an invalid patient");
                }

                if (appUser == null)
                {
                    return BadRequest("This user is not allowed to use this endpoint");
                }

                var newPatient = new Patient
                {
                    AppUserId = appUser.Id,
                    PatientName = patientDto.PatientName,
                    CarnetIdentification = patientDto.CarnetIdentification,
                    DOB = patientDto.DOB,
                    Gender = patientDto.Gender,
                    Address = patientDto.Address,
                    Phone = patientDto.Phone,
                    Email = patientDto.Email,
                    SocialSecurity = patientDto.SocialSecurity
                };

                _context.Patients.Add(newPatient);
                await _context.SaveChangesAsync();

                var patient = new PatientDto
                {
                    Id = newPatient.Id,
                    PatientName = newPatient.PatientName,
                    CarnetIdentification = newPatient.CarnetIdentification,
                    DOB = newPatient.DOB,
                    Gender = newPatient.Gender,
                    Address = newPatient.Address,
                    Phone = newPatient.Phone,
                    Email = newPatient.Email,
                    SocialSecurity = newPatient.SocialSecurity
                };

                return CreatedAtAction(nameof(GetPatient), new { id = newPatient.Id }, patient);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Patient>> UpdatePatient(int id, PatientCreateDto patientToUpdate)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(id);

            _mapper.Map(patientToUpdate, patient);
            _unitOfWork.Repository<Patient>().Update(patient);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating patient information"));

            return Ok(patient);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePatient(int id)
        {
            var patient = await _unitOfWork.Repository<Patient>().GetByIdAsync(id);

            _unitOfWork.Repository<Patient>().Delete(patient);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting patient information"));

            return Ok();
        }
    }
}
