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
using Core.Specification.CardiacCatheterizationStudySpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardiacCatheterizationStudyController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public CardiacCatheterizationStudyController(
            IUnitOfWork unitOfWork,
            IMapper mapper, UserManager<AppUser> userManager) : base(userManager)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        // Retrieves a list of cardiac catheterization studies for a specific patient
        [HttpGet("patient/{patientId}/cardiacCathStudies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<IReadOnlyList<CardiacCatheterizationStudyDto>>> GetCardiacCathStudiesByPatientId(int patientId, [FromQuery] CardiacCatheterizationStudySpecParams cardiacCathStudySpecParams)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(400, "User not found"));

                // Check if the patient belongs to the authenticated user
                var patientSpec = new PatientWithAllSpecification(patientId);
                var patient = await _unitOfWork.Repository<Patient>().GetEntityWithSpec(patientSpec);

                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                var spec = new CardiacCatheterizationStudySpecification(patientId, cardiacCathStudySpecParams);

                Expression<Func<CardiacCatheterizationStudy, bool>> filter = ccs => ccs.PatientId == patientId;

                var totalItems = await _unitOfWork.Repository<CardiacCatheterizationStudy>().CountByPatientAsync(filter, spec);

                if (totalItems == 0)
                {
                    return Ok(new PagedList<CardiacCatheterizationStudyDto>(new List<CardiacCatheterizationStudyDto>(), 0, cardiacCathStudySpecParams.PageIndex, cardiacCathStudySpecParams.PageSize));
                }

                var cardiacCathStudies = await _unitOfWork.Repository<CardiacCatheterizationStudy>().ListAllByPatientAsync(filter, spec, cardiacCathStudySpecParams.PageIndex, cardiacCathStudySpecParams.PageSize);

                var cardiacCathStudyDtos = _mapper.Map<IReadOnlyList<CardiacCatheterizationStudyDto>>(cardiacCathStudies);

                var paginatedCardiacCathStudies = new PagedList<CardiacCatheterizationStudyDto>(
                    cardiacCathStudyDtos.ToList(),
                    totalItems,
                    cardiacCathStudySpecParams.PageIndex,
                    cardiacCathStudySpecParams.PageSize
                );

                Response.AddPaginationHeader(paginatedCardiacCathStudies.MetaData);

                return Ok(cardiacCathStudyDtos);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }

        }

        // Retrieves a specific cardiac catheterization study by patient ID and study ID
        [HttpGet("patient/{patientId}/cardiacCathStudies/{cardiacCathStudyId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<CardiacCatheterizationStudyDto>> GetCardiacCathStudyIdByPatientId(int patientId, int cardiacCathStudyId)
        {
            var user = await GetAuthenticatedUserAsync();

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

        // Creates a new cardiac catheterization study
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<CardiacCatheterizationStudy>> CreateCardiacCathStudy(CardiacCathStudyCreateDto cardiacCathStudyCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 Bad Request for invalid data
            }

            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                var newCardiacCathStudy = _mapper.Map<CardiacCathStudyCreateDto, CardiacCatheterizationStudy>(cardiacCathStudyCreateDto);

                _unitOfWork.Repository<CardiacCatheterizationStudy>().Add(newCardiacCathStudy);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating cardiac catheterization study"));

                return CreatedAtAction(
                    nameof(GetCardiacCathStudyIdByPatientId),
                    new { patientId = newCardiacCathStudy.PatientId, id = newCardiacCathStudy.Id },
                    cardiacCathStudyCreateDto
                    );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Updates an existing cardiac catheterization study
        [HttpPut]
        [Authorize]
        public async Task<ActionResult<CardiacCatheterizationStudy>> UpdateCardiacCathStudy(int id, CardiacCathStudyCreateDto cardiacCathStudyCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }


            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Get the cardiac catheterization study along with the patient
                var spec = new CardiacCatheterizationStudySpecification(id);
                var cardiacCathStudy = await _unitOfWork.Repository<CardiacCatheterizationStudy>().GetEntityWithSpec(spec);

                if (cardiacCathStudy == null)
                {
                    return NotFound(new ApiResponse(404, "Cardiac catheterization study not found"));
                }

                // Check if the patient belongs to the authenticated user
                var patient = cardiacCathStudy.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                // Map the changes and update the entity
                _mapper.Map(cardiacCathStudyCreateDto, cardiacCathStudy);

                _unitOfWork.Repository<CardiacCatheterizationStudy>().Update(cardiacCathStudy); // Mark the cardiac cath study entity as updated

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating cardiac catheterization study information"));
                }

                return Ok(cardiacCathStudyCreateDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // Deletes a cardiac catheterization study
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteCardiacCathStudy(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Get the cardiac catheterization study along with the patient
                var spec = new CardiacCatheterizationStudySpecification(id);
                var cardiacCathStudy = await _unitOfWork.Repository<CardiacCatheterizationStudy>().GetEntityWithSpec(spec);

                if (cardiacCathStudy == null)
                {
                    return NotFound(new ApiResponse(404, "Cardiac catheterization study not found"));
                }

                // Check if the patient belongs to the authenticated user
                var patient = cardiacCathStudy.Patient;
                if (patient == null || patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient not found or not authorized"));
                }

                _unitOfWork.Repository<CardiacCatheterizationStudy>().Delete(cardiacCathStudy);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem deleting cardiac catheterization study information"));
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
