
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class NoteCreateDto
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }

        [Required]
        public DateTime Date { get; set; }
        [Required]
        public int NoteStatusId { get; set; }
        // public TimeSpan Time { get; set; }
    }
}