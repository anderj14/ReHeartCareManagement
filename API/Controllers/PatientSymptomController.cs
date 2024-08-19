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
    public class PatientSymptomController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;

        public PatientSymptomController(
            UserManager<AppUser> userManager,
            IMapper mapper,
            IUnitOfWork unitOfWork
        ) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves a patient symptom by its ID.
        /// </summary>
        /// <param name="id">The ID of the patient symptom to retrieve.</param>
        /// <returns>The patient symptom details.</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        [Authorize]
        public async Task<ActionResult<PatientSymptomDto>> GetPatientSymptom(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();
                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
                }

                // Create and apply a specification to retrieve the patient symptom by its ID.
                var spec = new PatientSymptomSpecification(id);
                var patientSymptom = await _unitOfWork.Repository<PatientSymptom>().GetEntityWithSpec(spec);

                // If the patient symptom is not found, return a 404 Not Found response.
                if (patientSymptom == null)
                {
                    return NotFound(new ApiResponse(404, "Patient symptom not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudySpec = new HolterStudySpecification(patientSymptom.HolterStudyId);
                var holterStudy = await _unitOfWork.Repository<HolterStudy>().GetEntityWithSpec(holterStudySpec);

                // If the HolterStudy is not found or the user is not authorized, return a 404 Not Found response.
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Holter study not found or not authorized"));
                }

                var patientSymptomDto = _mapper.Map<PatientSymptomDto>(patientSymptom);

                return Ok(patientSymptomDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Creates a new patient symptom entry.
        /// </summary>
        /// <param name="patientSymptomCreateDto">Data transfer object containing the details of the patient symptom to be created.</param>
        /// <returns>The created patient symptom.</returns>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<PatientSymptomDto>> CreatePatientSymptom([FromBody] PatientSymptomCreateDto patientSymptomCreateDto)
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

                var newPatientSymptom = _mapper.Map<PatientSymptomCreateDto, PatientSymptom>(patientSymptomCreateDto);

                _unitOfWork.Repository<PatientSymptom>().Add(newPatientSymptom);

                var result = await _unitOfWork.Complete();

                if (result <= 0) return BadRequest(new ApiResponse(400, "Problem creating patient symptom"));
                var patientSymptomDto = _mapper.Map<PatientSymptomDto>(newPatientSymptom);

                return CreatedAtAction(
                    nameof(GetPatientSymptom),
                    new { id = newPatientSymptom.Id },
                    patientSymptomDto
                );
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Updates an existing patient symptom entry.
        /// </summary>
        /// <param name="id">ID of the patient symptom to be updated.</param>
        /// <param name="patientSymptomUpdateDto">Data transfer object containing the updated details of the patient symptom.</param>
        /// <returns>The updated patient symptom details.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdatePatientSymptom(int id, PatientSymptomCreateDto patientSymptomUpdateDto)
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

                // Create and apply a specification to retrieve the patient symptom by its ID.
                var spec = new PatientSymptomSpecification(id);
                var patientSymptom = await _unitOfWork.Repository<PatientSymptom>().GetEntityWithSpec(spec);

                // If the patient symptom is not found, return a 404 Not Found response.
                if (patientSymptom == null)
                {
                    return NotFound(new ApiResponse(404, "Patient symptom not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to access it.
                var holterStudy = patientSymptom.HolterStudy;
                if (holterStudy == null || holterStudy.Patient.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient symptom not found or not authorized"));
                }

                // Validate that the provided holterStudyId in the DTO matches the patient symptom holterStudyId
                if (patientSymptom.HolterStudyId != patientSymptomUpdateDto.HolterStudyId)
                {
                    return NotFound(new ApiResponse(404, "Patient symptom does not belong to the specified Patient"));
                }

                // Map the update DTO to the existing patient symptom entity.
                _mapper.Map(patientSymptomUpdateDto, patientSymptom);

                _unitOfWork.Repository<PatientSymptom>().Update(patientSymptom);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem updating patient symptom information"));
                }

                var patientSymptomDto = _mapper.Map<PatientSymptomDto>(patientSymptom);

                return Ok(patientSymptomDto);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        /// <summary>
        /// Deletes an existing patient symptom entry.
        /// </summary>
        /// <param name="id">ID of the patient symptom to be deleted.</param>
        /// <returns>No content if successful.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeletePatientSymptom(int id)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not found"));
                }

                // Create and apply a specification to retrieve the patient symptom by its ID.
                var spec = new PatientSymptomSpecification(id);
                var patientSymptom = await _unitOfWork.Repository<PatientSymptom>().GetEntityWithSpec(spec);

                // If the patient symptom is not found, return a 404 Not Found response.
                if (patientSymptom == null)
                {
                    return NotFound(new ApiResponse(404, "Patient symptom not found"));
                }

                // Retrieve the associated HolterStudy to check if the authenticated user is authorized to delete it.
                var holterStudy = patientSymptom.HolterStudy.Patient;
                if (holterStudy == null || holterStudy.AppUserId != user.Id)
                {
                    return NotFound(new ApiResponse(404, "Patient symptom not found or not authorized"));
                }

                _unitOfWork.Repository<PatientSymptom>().Delete(patientSymptom);

                var result = await _unitOfWork.Complete();

                if (result <= 0)
                {
                    return BadRequest(new ApiResponse(400, "Problem deleting patient symptom information"));
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
