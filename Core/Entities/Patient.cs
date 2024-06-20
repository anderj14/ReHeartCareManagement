using Core.Entities.HolterStudyInfo;
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Patient : BaseEntity
    {
        public string AppUserId { get; set; }
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

        public AppUser AppUser { get; set; }

        public int StatusId { get; set; }
        public PatientStatus PatientStatus { get; set; }

        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<DiseaseHistory> DiseaseHistories { get; set; }
        public ICollection<MedicalHistory> MedicalHistories { get; set; }
        public ICollection<PhysicalExamination> PhysicalExaminations { get; set; }
        public ICollection<Electrocardiogram> Electrocardiograms { get; set; }
        public ICollection<Echocardiogram> Echocardiograms { get; set; }
        public ICollection<StressTest> StressTests { get; set; }
        public ICollection<HolterStudy> HolterStudies { get; set; }
        public ICollection<CardiacCatheterizationStudy> CardiacCatheterizationStudies { get; set; }
        public ICollection<BloodTest> BloodTests { get; set; }
        public ICollection<Diagnostic> Diagnostics { get; set; }
        public ICollection<Treatment> Treatments { get; set; }
        public ICollection<CardiologySurgery> CardiologySurgery { get; set; }
        public ICollection<Prescription> Prescription { get; set; }
    }
}