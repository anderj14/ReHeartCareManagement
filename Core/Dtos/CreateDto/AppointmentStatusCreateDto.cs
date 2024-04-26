using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class AppointmentStatusCreateDto
    {
        [Required]
        public string AppointmentStatusName { get; set; }

    }
}