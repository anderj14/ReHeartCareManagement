using System.ComponentModel.DataAnnotations.Schema;
using Core.Entities.Identity;

namespace Core.Entities
{
    [Table("Notes")]
    public class Notes : BaseEntity
    {
        public string AppUserId { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public DateTime Date { get; set; }
        public AppUser AppUser { get; set; }
    }
}