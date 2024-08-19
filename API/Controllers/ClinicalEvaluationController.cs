using API.Errors;
using AutoMapper;
using Core.Dtos.CreateDto;
using Core.Dtos.HolterStudyDtos;
using Core.Entities.HolterStudyInfo;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ClinicalEvaluationController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public ClinicalEvaluationController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            IUnitOfWork unitOfWork
        ) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves a clinical evaluation by its ID.
        /// </summary>
        /// <param name="id">The ID of the clinical evaluation to retrieve.</param>
        /// <returns>The clinical evaluation details.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<ClinicalEvaluationDto>> GetClinicalEvaluation(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Create and apply a specification to retrieve the clinical evaluation by its ID.
                var spec = new ClinicalEvaluationSpecification(id);
                var clinicalEvaluation = await _unitOfWork.Repository<ClinicalEvaluation>().GetEntityWithSpec(spec);

                // If the clinical evaluation is not found, return a 404 Not Found response.
                if (clinicalEvaluation == null)
                {
                    return NotFound(new ApiResponse(404, "Clinical evaluation not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudySpec = new HolterStudySpecification(clinicalEvaluation.HolterStudyId);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(holterStudySpec);

                // If the HolterStudy is not found or the user is not authorized, return a 404 Not Found response.
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found or not authorized"));
                }

                var clinicalEvaluationDto = _mapper.Map<ClinicalEvaluationDto>(clinicalEvaluation);

                return Ok(clinicalEvaluationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new clinical evaluation entry.
        /// </summary>
        /// <param name="clinicalEvaluationCreateDto">Data transfer object containing the details of the clinical evaluation to be created.</param>
        /// <returns>The created clinical evaluation.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<ClinicalEvaluationDto>> CreateClinicalEvaluation([FromBody] ClinicalEvaluationCreateDto clinicalEvaluationCreateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data"));
            }

            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));

                var newClinicalEvaluation = _mapper.Map<ClinicalEvaluationCreateDto, ClinicalEvaluation>(clinicalEvaluationCreateDto);

                _unitOfWork.Repository<ClinicalEvaluation>().Add(newClinicalEvaluation);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating clinical evaluation"));
                var clinicalEvaluationDto = _mapper.Map<ClinicalEvaluationDto>(newClinicalEvaluation);

                return CreatedAtAction(
                    nameof(GetClinicalEvaluation),
                    new { id = newClinicalEvaluation.Id },
                    clinicalEvaluationDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing clinical evaluation entry.
        /// </summary>
        /// <param name="id">ID of the clinical evaluation to be updated.</param>
        /// <param name="clinicalEvaluationUpdateDto">Data transfer object containing the updated details of the clinical evaluation.</param>
        /// <returns>The updated clinical evaluation details.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateClinicalEvaluation(int id, ClinicalEvaluationCreateDto clinicalEvaluationUpdateDto)
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

                // Create and apply a specification to retrieve the clinical evaluation by its ID.
                var spec = new ClinicalEvaluationSpecification(id);
                var clinicalEvaluation = await _unitOfWork.Repository<ClinicalEvaluation>().GetEntityWithSpec(spec);

                // If the clinical evaluation is not found, return a 404 Not Found response.
                if (clinicalEvaluation == null)
                {
                    return NotFound(new ApiResponse(404, "Clinical evaluation not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudy = clinicalEvaluation.HolterStudy;
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Clinical evaluation not found or not authorized"));
                }

                // Map the update DTO to the existing clinical evaluation entity.
                _mapper.Map(clinicalEvaluationUpdateDto, clinicalEvaluation);

                _unitOfWork.Repository<ClinicalEvaluation>().Update(clinicalEvaluation);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating clinical evaluation information"));
                }

                var clinicalEvaluationDto = _mapper.Map<ClinicalEvaluationDto>(clinicalEvaluation);

                return Ok(clinicalEvaluationDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing clinical evaluation entry.
        /// </summary>
        /// <param name="id">ID of the clinical evaluation to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteClinicalEvaluation(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Create and apply a specification to retrieve the clinical evaluation by its ID.
                var spec = new ClinicalEvaluationSpecification(id);
                var clinicalEvaluation = await _unitOfWork.Repository<ClinicalEvaluation>().GetEntityWithSpec(spec);

                // If the clinical evaluation is not found, return a 404 Not Found response.
                if (clinicalEvaluation == null)
                {
                    return NotFound(new ApiResponse(404, "Clinical evaluation not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to delete it.
                var holterStudy = clinicalEvaluation.HolterStudy.Patient;
                if (holterStudy == null || holterStudy.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Clinical evaluation not found or not authorized"));
                }

                _unitOfWork.Repository<ClinicalEvaluation>().Delete(clinicalEvaluation);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting clinical evaluation information"));
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
