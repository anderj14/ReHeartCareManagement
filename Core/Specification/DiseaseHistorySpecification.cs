
using Core.Entities;

namespace Core.Specification
{
    public class DiseaseHistorySpecification : BaseSpecification<DiseaseHistory>
    {
        public DiseaseHistorySpecification()
        {
            AddInclude(dh => dh.Patient);
            AddInclude(dh => dh.Attachments);
        }

        public DiseaseHistorySpecification(int patientId)
            : base(dh => dh.PatientId == patientId)
        {
            AddInclude(dh => dh.Patient);
            AddInclude(dh => dh.Attachments);
        }

        public DiseaseHistorySpecification(int patientId, int diseaseHistoryId)
            : base(dh => dh.PatientId == patientId && dh.Id == diseaseHistoryId)
        {
            AddInclude(dh => dh.Patient);
            AddInclude(dh => dh.Attachments);
        }
    }
}