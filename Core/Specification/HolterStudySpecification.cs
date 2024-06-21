using Core.Entities.HolterStudyInfo;

namespace Core.Specification
{
    public class HolterStudySpecification : BaseSpecification<HolterStudy>
    {
        public HolterStudySpecification(int patientId, int appointmentId)
            : base(a => a.PatientId == patientId && a.Id == appointmentId)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.ArrhythmiaEvents);
            AddInclude(a => a.MedicationAdministrations);
            AddInclude(a => a.PatientSymptoms);
            AddInclude(a => a.ClinicalEvaluations);
            AddInclude(a => a.AdditionalTestResults);
        }

        public HolterStudySpecification(int patientId)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
            AddInclude(a => a.ArrhythmiaEvents);
            AddInclude(a => a.MedicationAdministrations);
            AddInclude(a => a.PatientSymptoms);
            AddInclude(a => a.ClinicalEvaluations);
            AddInclude(a => a.AdditionalTestResults);
        }
    }
}