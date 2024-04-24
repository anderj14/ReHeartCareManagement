using Core.Entities;

namespace Core.Specification.SurgeryFollowUpSpec
{
    public class SurgeryFollowUpFilterForCountSpecification : BaseSpecification<SurgeryFollowUp>
    {
        public SurgeryFollowUpFilterForCountSpecification(SurgeryFollowUpSpecParams surgeryFollowUpParams)
        : base(x =>
                string.IsNullOrEmpty(surgeryFollowUpParams.Search) || x.CardiologySurgery.SurgeryName.ToLower().Contains
                (surgeryFollowUpParams.Search)
                && (!surgeryFollowUpParams.CardiologySurgeryId.HasValue || x.CardiologySurgeryId == surgeryFollowUpParams.CardiologySurgeryId)
            )
        {
        }
    }
}