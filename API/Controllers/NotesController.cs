using API.Extensions;
using API.Helper;
using AutoMapper;
using Core.Dtos;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Core.Specification.NoteSpec;
using Infraestructure.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/notes")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;

        private readonly INoteRepository _repository;
        private readonly ManagementContext _context;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public NotesController(
            UserManager<AppUser> userManager,
            INoteRepository repository,
            ManagementContext context,
            IMapper mapper,
            IUnitOfWork unitOfWork

            )
        {
            _userManager = userManager;
            _context = context;
            _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserNote()
        {
            var username = User.GetUsername();
            var appUser = await _userManager.FindByNameAsync(username);

            var userNote = await _repository.GetUserNote(appUser);
            return Ok(userNote);
        }


        [HttpGet("all")]
        public async Task<ActionResult<Pagination<NotesDto>>> GetNotes(
           [FromQuery] NoteSpecParams notesParams
        )
        {
            var spec = new NoteSpecification(notesParams);
            var countSpec = new NoteWithFiltersForCountSpecification(notesParams);
            var totalItems = await _unitOfWork.Repository<Notes>().CountAsync(countSpec);

            var notes = await _unitOfWork.Repository<Notes>().ListAsync(spec);
            var data = _mapper.Map<IReadOnlyList<NotesDto>>(notes);

            return Ok(new Pagination<NotesDto>(
                notesParams.PageSize, notesParams.PageSize, totalItems, data
            ));
        }


        // [HttpPost]
        // [Authorize]
        // public async Task<IActionResult> AddNote(NoteCreateDto notesDto)
        // {
        //     try
        //     {
        //         var username = User.GetUsername();
        //         var appUser = await _userManager.FindByNameAsync(username);

        //         if (appUser == null)
        //         {
        //             return BadRequest("User not found");
        //         }

        //         var noteModel = new Notes
        //         {
        //             AppUserId = appUser.Id,
        //             Title = notesDto.Title,
        //             Content = notesDto.Content,
        //             Date = DateTime.Now
        //         };

        //         await _repository.CreateAsync(noteModel);

        //         return CreatedAtAction(nameof(AddNote), new { id = noteModel.Id }, noteModel);
        //     }
        //     catch (Exception ex)
        //     {
        //         return StatusCode(500, $"An error occurred: {ex.Message}");
        //     }
        // }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddNote([FromBody] NotesDto notesDto)
        {
            try
            {
                var username = User.GetUsername();
                var appUser = await _userManager.FindByNameAsync(username);


                if (notesDto == null)
                {
                    return BadRequest("You can not create an invalid note");

                }

                if (appUser == null)
                {
                    return BadRequest("This user is not allowed to use this endpoint");
                }

                var newNote = new Notes
                {
                    AppUserId = appUser.Id,
                    Title = notesDto.Title,
                    Content = notesDto.Content,
                    Date = DateTime.Now,
                };

                _context.Notes.Add(newNote);
                await _context.SaveChangesAsync();

                return Ok("You have successfully created a new note");


            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}