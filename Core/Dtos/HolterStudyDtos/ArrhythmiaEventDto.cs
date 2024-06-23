
namespace Core.Dtos.HolterStudyDtos
{
    public class ArrhythmiaEventDto
    {
        public int ID { get; set; }
        public string Type { get; set; }
        public string Duration { get; set; }
        public int HeartRateDuringEvent { get; set; }
        public string Description { get; set; }
    }
}