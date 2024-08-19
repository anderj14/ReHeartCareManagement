
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class NoteStatusCreateDto
    {
        [Required]
        public string NoteStatusName { get; set; }
    }
}