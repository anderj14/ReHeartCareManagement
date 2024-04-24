using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class AppointmentCreateDto
    {
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public string Time { get; set; }

        [Required]
        public string Description { get; set; }

        [Required]
        public int AppointmentStatusId { get; set; }

        // [Required]
        public int PatientId { get; set; }
    }
}