using Core.Entities;

namespace Core.Specification
{
    public class CardiacCatheterizationStudySpecification : BaseSpecification<CardiacCatheterizationStudy>
    {
        public CardiacCatheterizationStudySpecification(int patientId)
            : base(cct => cct.PatientId == patientId)
        {
            AddInclude(cct => cct.Patient);
        }

        public CardiacCatheterizationStudySpecification(int patientId, int cardiacCathStudyId)
            : base(cct => cct.PatientId == patientId && cct.Id == cardiacCathStudyId)
        {
            AddInclude(cct => cct.Patient);
        }
    }
}