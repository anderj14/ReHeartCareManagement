using API.Errors;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Controller for managing patient statuses.
    /// Inherits from BaseApiController which contains shared functionality.
    /// </summary>
    public class PatientStatusesController : BaseApiController
    {
        private readonly IMapper _mapper; // Automapper instance for mapping between DTOs and entities
        private readonly IUnitOfWork _unitOfWork; // Unit of work pattern to handle repository operations

        /// <summary>
        /// Constructor that initializes the controller with dependencies.
        /// </summary>
        /// <param name="mapper">Automapper instance for object-object mapping.</param>
        /// <param name="unitOfWork">Unit of Work for handling repository transactions.</param>
        /// <param name="userManager">UserManager for managing application users.</param>
        public PatientStatusesController(IMapper mapper, IUnitOfWork unitOfWork, UserManager<AppUser> userManager) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves all patient statuses.
        /// </summary>
        /// <returns>A list of patient statuses.</returns>
        [HttpGet]
        [Authorize] // Authorization required for this endpoint
        public async Task<ActionResult<IReadOnlyList<PatientStatus>>> GetPatientStatuses()
        {
            // Fetches all patient statuses from the repository
            var patientStatuses = await _unitOfWork.Repository<PatientStatus>().ListAllAsync();
            // Maps the entity list to a DTO list (if mapping to a DTO was intended)
            var patientStatusesDto = _mapper.Map<IReadOnlyList<PatientStatus>>(patientStatuses);

            // Returns the list of patient statuses with a 200 OK status
            return Ok(patientStatusesDto);
        }

        /// <summary>
        /// Retrieves a specific patient status by its ID.
        /// </summary>
        /// <param name="id">The ID of the patient status to retrieve.</param>
        /// <returns>The patient status if found, otherwise a 404 error.</returns>
        [HttpGet("{id}")]
        [Authorize] // Authorization required for this endpoint
        public async Task<ActionResult<PatientStatus>> GetPatientStatus(int id)
        {
            // Fetches the patient status by ID from the repository
            var patientStatus = await _unitOfWork.Repository<PatientStatus>().GetByIdAsync(id);

            // If the patient status is not found, returns a 404 Not Found error
            if (patientStatus == null)
                return NotFound(new ApiResponse(404, "Patient status not found"));

            // Returns the patient status with a 200 OK status
            return Ok(patientStatus);
        }

        /// <summary>
        /// Creates a new patient status.
        /// </summary>
        /// <param name="patientStatusCreateDto">DTO containing the details for the new patient status.</param>
        /// <returns>Created status with a 201 response, or an error response.</returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CreateNoteStatus([FromBody] PatientStatusCreateDto patientStatusCreateDto)
        {
            // Validates the model state and returns a 400 Bad Request error if the model is invalid
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400, "Invalid data"));

            // Maps the DTO to a PatientStatus entity
            var patientStatus = _mapper.Map<PatientStatus>(patientStatusCreateDto);

            // Adds the new patient status to the repository
            _unitOfWork.Repository<PatientStatus>().Add(patientStatus);
            // Saves the changes to the database
            var result = await _unitOfWork.Complete();

            if (result <= 0)
                return BadRequest(new ApiResponse(400, "Problem creating note status"));

            // Returns the created patient status with a 201 Created status
            return CreatedAtAction(nameof(GetPatientStatus), new { id = patientStatus.Id }, patientStatus);
        }

        /// <summary>
        /// Updates an existing patient status.
        /// </summary>
        /// <param name="id">The ID of the patient status to update.</param>
        /// <param name="patientStatusUpdateDto">DTO containing the updated details for the patient status.</param>
        /// <returns>The updated patient status or an error response.</returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<PatientStatus>> UpdatePatientStatus(int id, [FromBody] PatientStatusCreateDto patientStatusUpdateDto)
        {
            // Validates the model state and returns a 400 Bad Request error if the model is invalid
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400, "Invalid data"));

            // Fetches the patient status by ID from the repository
            var patientStatus = await _unitOfWork.Repository<PatientStatus>().GetByIdAsync(id);

            if (patientStatus == null)
                return NotFound(new ApiResponse(404, "Patient status not found"));

            // Maps the updated DTO values to the existing patient status entity
            _mapper.Map(patientStatusUpdateDto, patientStatus);
            // Updates the patient status in the repository
            _unitOfWork.Repository<PatientStatus>().Update(patientStatus);

            // Saves the changes to the database
            var result = await _unitOfWork.Complete();

            if (result <= 0)
                return BadRequest(new ApiResponse(400, "Problem updating patient status"));

            // Maps the updated entity back to the DTO and returns it with a 200 OK status
            var noteStatus = _mapper.Map<PatientStatus>(patientStatus);

            return Ok(noteStatus);
        }

        /// <summary>
        /// Deletes an existing patient status.
        /// </summary>
        /// <param name="id">The ID of the patient status to delete.</param>
        /// <returns>No content if the deletion is successful, or an error response.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeletePatientStatus(int id)
        {
            // Fetches the patient status by ID from the repository
            var patientStatus = await _unitOfWork.Repository<PatientStatus>().GetByIdAsync(id);

            if (patientStatus == null)
                return NotFound(new ApiResponse(404, "Patient status not found"));

            // Deletes the patient status from the repository
            _unitOfWork.Repository<PatientStatus>().Delete(patientStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0)
                return BadRequest(new ApiResponse(400, "Problem deleting patient status"));

            // Returns a 204 No Content status if the deletion is successful
            return NoContent();
        }
    }
}
