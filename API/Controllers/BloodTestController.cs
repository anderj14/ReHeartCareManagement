using API.Errors;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Interfaces;
using Core.Specification;
using Core.Specification.BloodTestSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BloodTestController : BaseApiController
    {

        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public BloodTestController(
            IUnitOfWork unitOfWork,
            IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<BloodTestDto>>> GetBloodTests(
            [FromQuery] BloodTestSpecParams bloodTestParams
        )
        {
            var spec = new BloodTestSpecification(bloodTestParams);
            var countSpec = new BloodTestFilterForCountSpecification(bloodTestParams);
            var totalItems = await _unitOfWork.Repository<BloodTest>().CountAsync(countSpec);

            var bloodTests = await _unitOfWork.Repository<BloodTest>().ListAsync(spec);

            var dataDto = _mapper.Map<IReadOnlyList<BloodTestDto>>(bloodTests);

            // return Ok(bloodTestsDtos);
            return Ok(
                new Pagination<BloodTestDto>(
                    bloodTestParams.PageIndex,
                    bloodTestParams.PageSize,
                    totalItems,
                    dataDto
                )
            );

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BloodTestDto>> GetBloodTest(int id)
        {
            var spec = new BloodTestSpecification(id);
            var bloodTest = await _unitOfWork.Repository<BloodTest>().GetEntityWithSpec(spec);

            if (bloodTest == null) return NotFound(new ApiResponse(404));

            return Ok(_mapper.Map<BloodTestDto>(bloodTest));
        }

        // Create
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BloodTest>> CreateBloodTest(BloodTestCreateDto bloodTestCreateDto)
        {
            var bloodTest = _mapper.Map<BloodTestCreateDto, BloodTest>(bloodTestCreateDto);
            
            _unitOfWork.Repository<BloodTest>().Add(bloodTest);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating Appointment"));
            return Ok(bloodTest);
        }

        // Update
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<BloodTest>> UpdateBloodTesT(int id, BloodTestCreateDto bloodTestUpdateDto)
        {
            var bloodTest = await _unitOfWork.Repository<BloodTest>().GetByIdAsync(id);
            _mapper.Map(bloodTestUpdateDto, bloodTest);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating blood test information"));
            return Ok(bloodTest);
        }

        //Delete
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteBloodTest(int id)
        {
            var bloodTest = await _unitOfWork.Repository<BloodTest>().GetByIdAsync(id);

            _unitOfWork.Repository<BloodTest>().Delete(bloodTest);

            var result = await _unitOfWork.Complete();

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting blood test information"));
            return Ok();
        }



        [HttpGet("patient/{patientId}/bloodTests")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IReadOnlyList<BloodTestDto>>> GetPatientBloodTest(int patientId)
        {
            var spec = new BloodTestSpecification(patientId, getByPatientId: true);
            var bloodTests = await _unitOfWork.Repository<BloodTest>().ListAsync(spec);
            var bloodTestsDtos = _mapper.Map<IReadOnlyList<BloodTestDto>>(bloodTests);

            return Ok(bloodTestsDtos);
        }

        [HttpGet("patient/{patientId}/bloodTests/{bloodTestId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<BloodTestDto>> GetPatientBloodTest(int patientId, int bloodTestId)
        {

            var spec = new BloodTestSpecification(patientId, bloodTestId);
            var bloodTest = await _unitOfWork.Repository<BloodTest>().GetEntityWithSpec(spec);

            var bloodTestDto = _mapper.Map<BloodTestDto>(bloodTest);
            return Ok(bloodTestDto);
        }
    }
}