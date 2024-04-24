using Core.Entities;

namespace Core.Specification.CardiologySurgerySpec
{
    public class CardiologySurgeryFilterForCountSpecification : BaseSpecification<CardiologySurgery>
    {
        public CardiologySurgeryFilterForCountSpecification(CardiologySurgerySpecParams cardiologySurgeryParams)
            : base(x =>
(                string.IsNullOrEmpty(cardiologySurgeryParams.Search) || x.Patient.PatientName.ToLower().Contains
                (cardiologySurgeryParams.Search))
                )
        {
        }
    }
}