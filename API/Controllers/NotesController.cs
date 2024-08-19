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
using Core.Specification.NoteSpec;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    /// <summary>
    /// Controller to manage user notes.
    /// </summary>
    public class NotesController : BaseApiController
    {
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IGenericRepository<Notes> _notesRepo;
        private readonly UserManager<AppUser> _userManager;

        /// <summary>
        /// Initializes a new instance of the <see cref="NotesController"/> class.
        /// </summary>
        /// <param name="unitOfWork">Unit of work to handle transactions.</param>
        /// <param name="mapper">Automapper to map between entities and DTOs.</param>
        /// <param name="notesRepo">Generic repository for handling note entities.</param>
        /// <param name="userManager">User manager to handle user-related operations.</param>
        public NotesController(
            IUnitOfWork unitOfWork,
            IMapper mapper,
            IGenericRepository<Notes> notesRepo,
            UserManager<AppUser> userManager
        ) : base(userManager)
        {
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _notesRepo = notesRepo;
        }

        /// <summary>
        /// Retrieves notes created by the authenticated user.
        /// </summary>
        /// <param name="noteSpecParams">Specification parameters for filtering and pagination.</param>
        /// <returns>Paginated list of user notes.</returns>
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<PagedList<NotesDto>>> GetNotesByUser([FromQuery] NoteSpecParams noteSpecParams)
        {
            try
            {
                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not authenticated")); // Return 401 if user is not authenticated

                // Define a filter expression to get only the notes associated with the authenticated user
                Expression<Func<Notes, bool>> filter = note => note.AppUserId == user.Id;

                // Create a specification for querying the notes
                var spec = new NoteSpecification(noteSpecParams);
                var countSpec = new NoteWithFiltersForCountSpecification(noteSpecParams);

                // Get the total number of notes matching the filter
                var totalItems = await _unitOfWork.Repository<Notes>().CountByUserAsync(filter, countSpec);

                if (totalItems == 0)
                {
                    // Return an empty paginated list if no notes are found
                    return Ok(new PagedList<NotesDto>(new List<NotesDto>(), 0, noteSpecParams.PageIndex, noteSpecParams.PageSize));
                }

                // Retrieve the notes based on the filter and specification
                var userNotes = await _unitOfWork.Repository<Notes>().ListAllByUserAsync(filter, spec, noteSpecParams.PageIndex, noteSpecParams.PageSize);

                // Map the retrieved notes to the NoteDto
                var data = _mapper.Map<IReadOnlyList<NotesDto>>(userNotes);

                // Create a paginated list of notes
                var paginatedNotes = new PagedList<NotesDto>(
                    data.ToList(),
                    totalItems,
                    noteSpecParams.PageIndex,
                    noteSpecParams.PageSize
                );

                // Add pagination headers to the response
                Response.AddPaginationHeader(paginatedNotes.MetaData);

                return Ok(paginatedNotes); // Return the paginated list of notes
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}"); // Return 500 for internal server errors
            }
        }

        /// <summary>
        /// Retrieves a specific note by its ID.
        /// </summary>
        /// <param name="id">ID of the note to retrieve.</param>
        /// <returns>Note details if found, otherwise 404.</returns>
        [HttpGet("{id}")]
        [Authorize]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(ApiResponse), StatusCodes.Status404NotFound)]
        public async Task<ActionResult<NotesDto>> GetNoteById(int id)
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
            }

            // Define a filter expression to get only the note associated with the authenticated user
            Expression<Func<Notes, bool>> filter = note => note.AppUserId == user.Id;

            // Create a specification to query the note by Id
            var spec = new NoteSpecification(id);

            // Retrieve the note based on the filter and specification
            var note = await _unitOfWork.Repository<Notes>().GetEntityByUserAsync(filter, spec);

            if (note == null) return NotFound(new ApiResponse(404)); // Return 404 if the note is not found

            // Map the retrieved note to NoteDto
            return _mapper.Map<NotesDto>(note);
        }

        /// <summary>
        /// Adds a new note for the authenticated user.
        /// </summary>
        /// <param name="noteCreateDto">Note details to create.</param>
        /// <returns>Created note with status code 201, or an error response.</returns>
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddNoteByUser([FromBody] NoteCreateDto noteCreateDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
                }

                var user = await GetAuthenticatedUserAsync();

                if (user == null)
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
                }

                // Map the NoteCreateDto to a new Note entity
                var newNote = _mapper.Map<Notes>(noteCreateDto);
                newNote.AppUserId = user.Id;

                // Add the new note to the context
                _unitOfWork.Repository<Notes>().Add(newNote);
                await _unitOfWork.Complete();

                // Map the new note entity to NoteDto
                var note = _mapper.Map<NotesDto>(newNote);

                return CreatedAtAction(nameof(GetNoteById), new { id = newNote.Id }, note); // Return 201 with the created note details
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message); // Return 400 for exceptions
            }
        }

        /// <summary>
        /// Updates an existing note by its ID.
        /// </summary>
        /// <param name="id">ID of the note to update.</param>
        /// <param name="noteToUpdate">Updated note details.</param>
        /// <returns>Updated note details, or an error response.</returns>
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Notes>> UpdateNoteById(int id, NoteCreateDto noteToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new ApiResponse(400, "Invalid data")); // Return 400 for invalid data
            }

            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found")); // Return 401 if user is not authenticated
            }

            // Retrieve the note to update
            var note = await _unitOfWork.Repository<Notes>().GetByIdAsync(id);

            if (note == null)
            {
                return NotFound(new ApiResponse(404, "Note not found")); // Return 404 if the note is not found
            }

            if (note.AppUserId != user.Id)
            {
                return Unauthorized(new ApiResponse(401, "User not authorized to update this note")); // Return 401 if the user is not authorized
            }

            // Map the updated data from the DTO to the existing note entity
            _mapper.Map(noteToUpdate, note);
            _unitOfWork.Repository<Notes>().Update(note); // Mark the note entity as updated

            var result = await _unitOfWork.Complete(); // Save changes to the database

            if (result <= 0) return BadRequest(new ApiResponse(400, "Problem updating note information")); // Return 400 if the update fails

            return Ok(noteToUpdate); // Return 200 with the updated note details
        }

        /// <summary>
        /// Deletes an existing note by its ID.
        /// </summary>
        /// <param name="id">ID of the note to delete.</param>
        /// <returns>Success or error response.</returns>
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteNoteById(int id)
        {
            var user = await GetAuthenticatedUserAsync();

            if (user == null)
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated or not found"));
            }

            // Retrieve the note to delete from the database
            var note = await _unitOfWork.Repository<Notes>().GetByIdAsync(id);

            if (note == null)
            {
                return NotFound(new ApiResponse(404, "Note not found"));
            }

            // Check if the note belongs to the authenticated user
            if (note.AppUserId != user.Id)
            {
                return Unauthorized(new ApiResponse(401, "User not authorized to delete this note"));
            }

            // Mark the note entity as deleted and save changes to the database
            _unitOfWork.Repository<Notes>().Delete(note);
            var result = await _unitOfWork.Complete();

            // Check if the deletion was successful
            if (result <= 0)
            {
                return BadRequest(new ApiResponse(400, "Problem deleting note information"));
            }

            return Ok();
        }

    }
}
