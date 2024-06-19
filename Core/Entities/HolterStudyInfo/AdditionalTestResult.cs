
namespace Core.Entities.HolterStudyInfo
{
    public class AdditionalTestResult: BaseEntity
    {
        public string TestName { get; set; }
        public DateTime TestDateTime { get; set; }
        public string Results { get; set; }

        public int HolterStudyId { get; set; }
        public HolterStudy HolterStudy { get; set; }
    }
}