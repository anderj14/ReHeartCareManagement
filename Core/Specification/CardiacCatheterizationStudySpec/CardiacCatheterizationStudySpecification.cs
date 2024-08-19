using Core.Entities;

namespace Core.Specification.CardiacCatheterizationStudySpec
{
    public class CardiacCatheterizationStudySpecification : BaseSpecification<CardiacCatheterizationStudy>
    {
        public CardiacCatheterizationStudySpecification(int id)
            : base(bt => bt.Id == id)
        {
            AddInclude(bt => bt.Patient);
        }

        // Constructor to get an cardiac catheterization study by ID or by patient ID and params.
        public CardiacCatheterizationStudySpecification(int patientId, CardiacCatheterizationStudySpecParams cardiacCatheterizationStudySpecParams)
            : base(cct => cct.PatientId == patientId)
        {
            AddInclude(cct => cct.Patient);
            ApplySorting(cardiacCatheterizationStudySpecParams.Sort);
        }

        // Constructor to get a specific cardiac catheterization study by patient ID and cardiac catheterization study ID.
        public CardiacCatheterizationStudySpecification(int patientId, int cardiacCathStudyId)
            : base(cct => cct.PatientId == patientId && cct.Id == cardiacCathStudyId)
        {
            AddInclude(cct => cct.Patient);
        }

        // Private method to apply sorting logic.
        private void ApplySorting(string sort)
        {
            if (!string.IsNullOrEmpty(sort))
            {
                switch (sort)
                {
                    case "dateAsc":
                        AddOrderBy(a => a.Date);
                        break;
                    case "dateDesc":
                        AddOrderBy(a => a.Date);
                        break;
                    default:
                        AddOrderBy(n => n.Patient.PatientName);
                        break;

                }
            }
        }
    }
}