
using Core.Dtos;
using Core.Entities;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface INoteRepository
    {
        Task<List<NotesDto>> GetUserNote(AppUser user);
        Task<Notes> CreateAsync(Notes notes);
    }
}