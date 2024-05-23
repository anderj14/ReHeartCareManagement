using System.Linq.Expressions;
using API.Errors;
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
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class NotesController : BaseApiController
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
        public async Task<ActionResult<Pagination<NotesDto>>> GetNotes(
           [FromQuery] NoteSpecParams notesParams
        )
        {
            var userName = User.Identity.Name;

            if (string.IsNullOrEmpty(userName))
            {
                return Unauthorized(new ApiResponse(401, "User not authenticated"));
            }

            var user = await _userManager.FindByNameAsync(userName);

            if (user == null)
                return Unauthorized(new ApiResponse(400, "User not found"));

            Expression<Func<Notes, bool>> filter = patient => patient.AppUserId == user.Id;

            var spec = new NoteSpecification(notesParams);
            var countSpec = new NoteWithFiltersForCountSpecification(notesParams);
            var totalItems = await _unitOfWork.Repository<Notes>().CountAsync(countSpec);

            var notes = await _unitOfWork.Repository<Notes>().ListAllByUserAsync(filter, spec);

            var data = _mapper.Map<IReadOnlyList<NotesDto>>(notes);

            return Ok(new Pagination<NotesDto>(
                notesParams.PageSize, notesParams.PageSize, totalItems, data
            ));
        }


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddNote([FromBody] NotesDto notesDto)
        {
            try
            {
                var userName = User.Identity.Name;

                if (string.IsNullOrEmpty(userName))
                {
                    return Unauthorized(new ApiResponse(401, "User not authenticated"));
                }

                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == userName.ToLower());

                if (user == null)
                    return Unauthorized(new ApiResponse(401, "User not found"));


                var newNote = new Notes
                {
                    AppUserId = user.Id,
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