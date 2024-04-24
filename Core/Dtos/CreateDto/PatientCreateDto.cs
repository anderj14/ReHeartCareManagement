using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class PatientCreateDto
    {
        [Required]
        public string PatientName { get; set; }
        [Required]
        public string CarnetIdentification { get; set; }
        [Required]
        public DateTime DOB { get; set; }
        [Required]
        public string Gender { get; set; }
        [Required]
        public string Address { get; set; }
        [Required]
        public long Phone { get; set; }
        [Required]
        public string Email { get; set; }
        [Required]
        public string SocialSecurity { get; set; }
    }
}