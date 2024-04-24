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

        public IReadOnlyList<AppointmentDto> Appointments { get; set; }
        public IReadOnlyList<DiseaseHistoryDto> DiseaseHistories { get; set; }
        public IReadOnlyList<MedicalHistoryDto> MedicalHistories { get; set; }
        public IReadOnlyList<PhysicalExaminationDto> PhysicalExaminations { get; set; } 
        public IReadOnlyList<ElectrocardiogramDto> Electrocardiograms { get; set; }
        public IReadOnlyList<EchocardiogramDto> Echocardiograms { get; set; }
        public IReadOnlyList<StressTestDto> StressTests { get; set; } 
        public IReadOnlyList<HolterStudyDto> HolterStudies { get; set; }
        public IReadOnlyList<CardiacCatheterizationStudyDto> CardiacCatheterizationStudies { get; set; }
        public IReadOnlyList<BloodTestDto> BloodTests { get; set; }         
        public IReadOnlyList<DiagnosticDto> Diagnostics { get; set; }
        public IReadOnlyList<TreatmentDto> Treatments { get; set; }
        public IReadOnlyList<CardiologySurgeryDto> CardiologySurgeries { get; set; }


    }
}