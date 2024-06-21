
using Core.Entities.HolterStudyInfo;

namespace Core.Dtos
{
    public class HolterStudyDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public string Time { get; set; }
        public string StudyDuration { get; set; }
        public string AverageHeartRate { get; set; }
        public string MaximumHeartRate { get; set; }
        public string TypeHeartRhythm { get; set; }
        public string ArrhythmiaEpisodes { get; set; }
        public string PhysicalActivity { get; set; }
        public string Conclusion { get; set; }
        public string Patient { get; set; }
        public IReadOnlyList<ArrhythmiaEvent> ArrhythmiaEvents { get; set; }
        public IReadOnlyList<MedicationAdministration> MedicationAdministrations { get; set; }
        public IReadOnlyList<PatientSymptom> PatientSymptoms { get; set; }
        public IReadOnlyList<ClinicalEvaluation> ClinicalEvaluations { get; set; }
        public IReadOnlyList<AdditionalTestResult> AdditionalTestResults { get; set; }
    }
}