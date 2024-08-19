
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class AppointmentTypeCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}