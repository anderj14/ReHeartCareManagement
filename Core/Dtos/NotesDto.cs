using System.ComponentModel.DataAnnotations;

namespace Core.Dtos
{
    public class NotesDto
    {
        public int Id { get; set; }
        // [Required]
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public string NoteStatusName { get; set; }
    }
}