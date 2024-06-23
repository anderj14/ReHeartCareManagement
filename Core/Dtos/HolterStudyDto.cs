
using Core.Dtos.HolterStudyDtos;

namespace Core.Dtos
{
    public class HolterStudyDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string StudyDuration { get; set; }
        public string AverageHeartRate { get; set; }
        public string MaximumHeartRate { get; set; }
        public string TypeHeartRhythm { get; set; }
        public string PhysicalActivity { get; set; }
        public string Conclusion { get; set; }
        public string Patient { get; set; }
        public ICollection<ArrhythmiaEventDto> ArrhythmiaEvents { get; set; }
        public ICollection<MedicationAdministrationDto> MedicationAdministrations { get; set; }
        public ICollection<PatientSymptomDto> PatientSymptoms { get; set; }
        public ICollection<ClinicalEvaluationDto> ClinicalEvaluations { get; set; }
        public ICollection<AdditionalTestResultDto> AdditionalTestResults { get; set; }
    }
}