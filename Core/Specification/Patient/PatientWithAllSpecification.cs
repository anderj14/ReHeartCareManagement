using Core.Entities;

namespace Core.Specification
{
    public class PatientWithAllSpecification : BaseSpecification<Patient>
    {
        public PatientWithAllSpecification(PatientSpecParams patientParams)
            : base(x =>
                (string.IsNullOrEmpty(patientParams.Search) || x.PatientName.ToLower().Contains(patientParams.Search.ToLower())) &&
                (!patientParams.StatusId.HasValue || x.StatusId == patientParams.StatusId)
            )
        {
            // Add all the related entities for eager loading
            AddCommonIncludes();

            // Default ordering by PatientName
            AddOrderBy(p => p.PatientName);

            // Apply sorting based on the provided Sort parameter
            if (!string.IsNullOrEmpty(patientParams.Sort))
            {
                switch (patientParams.Sort)
                {
                    case "dobAsc":
                        AddOrderBy(p => p.DOB);
                        break;
                    case "dobDesc":
                        AddOrderByDescending(p => p.DOB);
                        break;
                    default:
                        AddOrderBy(n => n.PatientName);
                        break;
                }
            }
        }

        public PatientWithAllSpecification(int id)
            : base(x => x.Id == id)
        {
            // Add all the related entities for eager loading
            AddCommonIncludes();
        }

        private void AddCommonIncludes()
        {
            AddInclude(p => p.Appointments);
            AddInclude(p => p.BloodTests);
            AddInclude(p => p.CardiacCatheterizationStudies);
            AddInclude(p => p.Diagnostics);
            AddInclude(p => p.DiseaseHistories);
            AddInclude(p => p.Echocardiograms);
            AddInclude(p => p.Electrocardiograms);
            AddInclude(p => p.HolterStudies);
            AddInclude(p => p.MedicalHistories);
            AddInclude(p => p.PhysicalExaminations);
            AddInclude(p => p.StressTests);
            AddInclude(p => p.Treatments);
            AddInclude(p => p.CardiologySurgery);
            AddInclude(p => p.Prescription);
            AddInclude(p => p.PatientStatus);
        }
    }
}
