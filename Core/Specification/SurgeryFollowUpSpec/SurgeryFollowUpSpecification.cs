using Core.Entities;

namespace Core.Specification.SurgeryFollowUpSpec
{
    /// <summary>
    /// Specification for filtering and retrieving surgery follow-ups.
    /// </summary>
    public class SurgeryFollowUpSpecification : BaseSpecification<SurgeryFollowUp>
    {
        /// <summary>
        /// Creates a new specification to filter and retrieve surgery follow-ups based on the provided parameters.
        /// </summary>
        /// <param name="surgeryFollowUpParams">Parameters for filtering and sorting surgery follow-ups.</param>
        public SurgeryFollowUpSpecification(int cardiologySurgeryId, BaseSpecParams baseSpecParams)
            : base(a => a.CardiologySurgeryId == cardiologySurgeryId)
        {
            // Include related entities in the query
            AddInclude(sfu => sfu.CardiologySurgery);
            AddInclude(sfu => sfu.MedicationsPrescribed);

            // Apply pagination based on the provided parameters
            ApplyPaging(
                baseSpecParams.PageSize * (baseSpecParams.PageIndex - 1),
                baseSpecParams.PageSize
            );

            // Apply sorting based on the provided sorting criteria
            if (!string.IsNullOrEmpty(baseSpecParams.Sort))
            {
                switch (baseSpecParams.Sort)
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

        /// <summary>
        /// Creates a new specification to retrieve a specific surgery follow-up for a given cardiology surgery.
        /// </summary>
        /// <param name="cardiologySurgeryId">ID of the cardiology surgery.</param>
        /// <param name="surgeryFollowUpId">ID of the surgery follow-up.</param>
        public SurgeryFollowUpSpecification(int cardiologySurgeryId, int surgeryFollowUpId)
            : base(sfu => sfu.CardiologySurgeryId == cardiologySurgeryId && sfu.Id == surgeryFollowUpId)
        {
            // Include related entities in the query
            AddInclude(sfu => sfu.CardiologySurgery);
            AddInclude(sfu => sfu.MedicationsPrescribed);
        }

        /// <summary>
        /// Creates a new specification to retrieve all surgery follow-ups for a given cardiology surgery.
        /// </summary>
        /// <param name="cardiologySurgeryId">ID of the cardiology surgery.</param>
        public SurgeryFollowUpSpecification(int id)
            : base(sfu => sfu.Id == id)
        {
            // Include related entities in the query
            AddInclude(sfu => sfu.CardiologySurgery);
            AddInclude(sfu => sfu.MedicationsPrescribed);
        }
    }
}
