using API.Errors;
using AutoMapper;
using Core.Dtos;
using Core.Dtos.CreateDto;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Controller to manage note statuses.
    /// </summary>
    public class NoteStatusController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;


        /// <summary>
        /// Initializes a new instance of the <see cref="NoteStatusController"/> class.
        /// </summary>
        /// <param name="mapper">Automapper to map between entities and DTOs.</param>
        /// <param name="noteStatusRepo">Generic repository for handling note status entities.</param>
        public NoteStatusController(
            IMapper mapper,
            IGenericRepository<NoteStatus> noteStatusRepo,
            IUnitOfWork unitOfWork
        )
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        /// <summary>
        /// Retrieves all note statuses.
        /// </summary>
        /// <returns>List of all note statuses.</returns>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<NoteStatusDto>>> GetAllNoteStatuses()
        {
            var noteStatuses = await _unitOfWork.Repository<NoteStatus>().ListAllAsync();
            var noteStatusDtos = _mapper.Map<IEnumerable<NoteStatusDto>>(noteStatuses);

            return Ok(noteStatusDtos); // Return 200 with the list of note statuses
        }

        /// <summary>
        /// Retrieves a specific note status by its ID.
        /// </summary>
        /// <param name="id">ID of the note status to retrieve.</param>
        /// <returns>Note status details if found, otherwise 404.</returns>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<NoteStatusDto>> GetNoteStatusById(int id)
        {
            var noteStatus = await _unitOfWork.Repository<NoteStatus>().GetByIdAsync(id);

            if (noteStatus == null)
                return NotFound(new ApiResponse(404, "Note status not found"));

            var noteStatusDto = _mapper.Map<NoteStatusDto>(noteStatus);
            return Ok(noteStatusDto);
        }

        /// <summary>
        /// Creates a new note status.
        /// </summary>
        /// <param name="noteStatusDto">Details of the note status to create.</param>
        /// <returns>Created note status with status code 201, or an error response.</returns>
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CreateNoteStatus([FromBody] NoteStatusCreateDto noteStatusCreateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400, "Invalid data"));

            var noteStatus = _mapper.Map<NoteStatus>(noteStatusCreateDto);

            _unitOfWork.Repository<NoteStatus>().Add(noteStatus);
            var result = await _unitOfWork.Complete();

            if (result <= 0)
                return BadRequest(new ApiResponse(400, "Problem creating note status"));

            var createdNoteStatusDto = _mapper.Map<NoteStatusDto>(noteStatus);

            // Return 201 with the created note status details
            return CreatedAtAction(nameof(GetNoteStatusById), new { id = noteStatus.Id }, createdNoteStatusDto);
        }

        /// <summary>
        /// Updates an existing note status by its ID.
        /// </summary>
        /// <param name="id">ID of the note status to update.</param>
        /// <param name="noteStatusDto">Updated note status details.</param>
        /// <returns>Updated note status details, or an error response.</returns>
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<NoteStatusDto>> UpdateNoteStatus(int id, [FromBody] NoteStatusCreateDto noteStatusUpdateDto)
        {
            if (!ModelState.IsValid)
                return BadRequest(new ApiResponse(400, "Invalid data"));

            var existingNoteStatus = await _unitOfWork.Repository<NoteStatus>().GetByIdAsync(id);

            if (existingNoteStatus == null)
                return NotFound(new ApiResponse(404, "Note status not found"));

            _mapper.Map(noteStatusUpdateDto, existingNoteStatus);
            _unitOfWork.Repository<NoteStatus>().Update(existingNoteStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0)
                return BadRequest(new ApiResponse(400, "Problem updating note status"));
            var noteStatus = _mapper.Map<NoteStatusDto>(existingNoteStatus);

            return Ok(noteStatus);
        }

        /// <summary>
        /// Deletes an existing note status by its ID.
        /// </summary>
        /// <param name="id">ID of the note status to delete.</param>
        /// <returns>Success or error response.</returns>
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteNoteStatus(int id)
        {
            var noteStatus = await _unitOfWork.Repository<NoteStatus>().GetByIdAsync(id);

            if (noteStatus == null)
                return NotFound(new ApiResponse(404, "Note status not found"));

            _unitOfWork.Repository<NoteStatus>().Delete(noteStatus);

            var result = await _unitOfWork.Complete();

            if (result <= 0)
                return BadRequest(new ApiResponse(400, "Problem deleting note status"));

            return NoContent();
        }
    }
}
