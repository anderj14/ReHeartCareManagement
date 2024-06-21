
using Core.Entities;

namespace Core.Specification
{
    public class PatientWithAllSpecification : BaseSpecification<Patient>
    {
        public PatientWithAllSpecification()
        {
        }

        public PatientWithAllSpecification(PatientSpecParams patientParams)
            : base(x =>
            string.IsNullOrEmpty(patientParams.Search) || x.PatientName.ToLower().Contains(patientParams.Search)
            && (!patientParams.PatientStatusId.HasValue || x.StatusId == patientParams.PatientStatusId)
            )
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
            AddOrderBy(p => p.PatientName);

            // It was implemented in Generic Repository
            // ApplyPaging(patientParams.PageSize * (patientParams.PageIndex - 1), patientParams.PageSize);

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