using Core.Entities;

namespace Core.Specification
{
    public class ElectrocardiogramSpecification : BaseSpecification<Electrocardiogram>
    {
        public ElectrocardiogramSpecification(int patientId)
            : base(a => a.PatientId == patientId)
        {
            AddInclude(a => a.Patient);
        }

        public ElectrocardiogramSpecification(int patientId, int electrocardiogramId)
            : base(a => a.PatientId == patientId && a.Id == electrocardiogramId)
        {
            AddInclude(a => a.Patient);
        }
    }
}