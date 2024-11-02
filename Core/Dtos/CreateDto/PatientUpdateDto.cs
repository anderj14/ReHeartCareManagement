using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class PatientUpdateDto
    {
        public int Id { get; set; }

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
        [Required]
        public string PolicyNumber { get; set; }
        public string Fax { get; set; }
        public string ReferringDoctor { get; set; }
        public string AssignedDoctor { get; set; }
        public string FamilyDoctor { get; set; }
        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }
        public string EmergencyContactRelation { get; set; }
        [Required]
        public string MaritalStatus { get; set; }
        [Required]
        public string Occupation { get; set; }
        [Required]
        public int StatusId { get; set; }
    }
}