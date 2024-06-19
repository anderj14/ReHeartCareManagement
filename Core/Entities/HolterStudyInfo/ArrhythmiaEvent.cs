
namespace Core.Entities.HolterStudyInfo
{
    public class ArrhythmiaEvent : BaseEntity
    {
         public string Type { get; set; }
        public string Duration { get; set; }
        public int HeartRateDuringEvent { get; set; }
        public string Description { get; set; }

        public int HolterStudyId { get; set; }
        public HolterStudy HolterStudy { get; set; }
    }
}