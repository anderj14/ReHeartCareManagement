
namespace Core.Dtos
{
    public class PatientDto
    {
        public int Id { get; set; }
        public string PatientName { get; set; }
        public string CarnetIdentification { get; set; }
        public DateTime DOB { get; set; }
        public string Gender { get; set; }
        public string Address { get; set; }
        public long Phone { get; set; }
        public string Email { get; set; }
        public string SocialSecurity { get; set; }
        public string PolicyNumber { get; set; }
        public string Fax { get; set; }
        public string ReferringDoctor { get; set; }
        public string AssignedDoctor { get; set; }
        public string FamilyDoctor { get; set; }
        public string EmergencyContactName { get; set; }
        public string EmergencyContactNumber { get; set; }
        public string EmergencyContactRelation { get; set; }
        public string MaritalStatus { get; set; }
        public string Occupation { get; set; }
        public string Status { get; set; }
    }
}