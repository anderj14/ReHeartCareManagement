
namespace Core.Entities.HolterStudyInfo
{
    public class HolterStudy : BaseEntity
    {
        public DateTime Date { get; set; }
        public TimeSpan Time { get; set; }
        public string StudyDuration { get; set; }
        public int AverageHeartRate { get; set; }
        public int MaximumHeartRate { get; set; }
        public string TypeHeartRhythm { get; set; }
        public string PhysicalActivity { get; set; }
        public string Conclusion { get; set; }

        public int PatientId { get; set; }
        public Patient Patient { get; set; }

        public ICollection<ArrhythmiaEvent> ArrhythmiaEvents { get; set; } // Arrhythmia events recorded during the study
        public ICollection<MedicationAdministration> MedicationAdministrations { get; set; } // Medication administrations during the study
        public ICollection<PatientSymptom> PatientSymptoms { get; set; } // Symptoms reported by the patient during the study
        public ICollection<ClinicalEvaluation> ClinicalEvaluations { get; set; } // Clinical evaluations before, during, or after the study
        public ICollection<AdditionalTestResult> AdditionalTestResults { get; set; } // Additional test results during the study
    }
}