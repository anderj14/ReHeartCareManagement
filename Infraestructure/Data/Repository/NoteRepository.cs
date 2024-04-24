
using Core.Dtos;
using Core.Entities;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infraestructure.Data.Repository
{
    public class NoteRepository : INoteRepository
    {
        private readonly ManagementContext _context;
        public NoteRepository(ManagementContext context)
        {
            _context = context;

        }

        public async Task<List<NotesDto>> GetUserNote(AppUser user)
        {
            return await _context.Notes.Where(u => u.AppUserId == user.Id)
            .Select(note => new NotesDto
            {
                Id = note.Id,
                Title = note.Title,
                Content = note.Content,
                Date = note.Date
            }).ToListAsync();
        }

        public async Task<Notes> CreateAsync(Notes notes)
        {
            await _context.Notes.AddAsync(notes);
            await _context.SaveChangesAsync();
            return notes;
        }
    }
}