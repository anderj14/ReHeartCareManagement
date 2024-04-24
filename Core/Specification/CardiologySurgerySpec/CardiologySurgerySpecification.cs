using Core.Entities;

namespace Core.Specification.CardiologySurgerySpec
{
    public class CardiologySurgerySpecification : BaseSpecification<CardiologySurgery>
    {
        public CardiologySurgerySpecification(CardiologySurgerySpecParams cardiologySurgeryParams)
            : base(x =>
(            string.IsNullOrEmpty(cardiologySurgeryParams.Search) || x.Patient.PatientName.ToLower().Contains
            (cardiologySurgeryParams.Search))
            )
        {
            AddInclude(cs => cs.Patient);

            ApplyPaging(cardiologySurgeryParams.PageSize * (cardiologySurgeryParams.PageIndex - 1),
            cardiologySurgeryParams.PageSize);

            if (!string.IsNullOrEmpty(cardiologySurgeryParams.Sort))
            {
                switch (cardiologySurgeryParams.Sort)
                {
                    case "dateAsc":
                        AddOrderBy(a => a.Date);
                        break;
                    case "dateDesc":
                        AddOrderByDescending(a => a.Date);
                        break;

                    default:
                        AddOrderBy(n => n.Patient.PatientName);
                        break;
                }
            }
        }

        public CardiologySurgerySpecification(int id)
            : base(cs => cs.Id == id)
        {
            AddInclude(cs => cs.Patient);
        }

        public CardiologySurgerySpecification(int patientId, int cardiologySurgeryId)
            : base(cs => cs.PatientId == patientId && cs.Id == cardiologySurgeryId)
        {
            AddInclude(cs => cs.Patient);
        }
    }
}