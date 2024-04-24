using Core.Entities;

namespace Core.Specification.SurgeryFollowUpSpec
{
    public class SurgeryFollowUpSpecification : BaseSpecification<SurgeryFollowUp>
    {
        public SurgeryFollowUpSpecification(SurgeryFollowUpSpecParams surgeryFollowUpParams)
            : base(x =>
                (string.IsNullOrEmpty(surgeryFollowUpParams.Search) || x.CardiologySurgery.SurgeryName.ToLower().Contains
                (surgeryFollowUpParams.Search))
                && (!surgeryFollowUpParams.CardiologySurgeryId.HasValue || x.CardiologySurgeryId == surgeryFollowUpParams.CardiologySurgeryId)
            )
        {
            AddInclude(sfu => sfu.CardiologySurgery);

            ApplyPaging(surgeryFollowUpParams.PageSize * (surgeryFollowUpParams.PageIndex - 1),
            surgeryFollowUpParams.PageSize);

            if (!string.IsNullOrEmpty(surgeryFollowUpParams.Sort))
            {
                switch (surgeryFollowUpParams.Sort)
                {
                    case "followUpDateAsc":
                        AddOrderBy(sfu => sfu.FollowUpDate);
                        break;
                    case "followUpDateDesc":
                        AddOrderByDescending(sfu => sfu.FollowUpDate);
                        break;

                    default:
                        AddOrderBy(n => n.CardiologySurgery.SurgeryName);
                        break;
                }
            }
        }

        public SurgeryFollowUpSpecification(int cardiologySurgeryId, int surgeryFollowUpId)
        : base(sfu => sfu.CardiologySurgeryId == cardiologySurgeryId && sfu.Id == surgeryFollowUpId)
        {
            AddInclude(sfu => sfu.CardiologySurgery);
        }

        public SurgeryFollowUpSpecification(int cardiologySurgeryId)
        : base(sfu => sfu.CardiologySurgeryId == cardiologySurgeryId)
        {
            AddInclude(sfu => sfu.CardiologySurgery);
        }
    }

}