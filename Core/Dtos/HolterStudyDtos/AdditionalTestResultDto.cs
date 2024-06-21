
namespace Core.Dtos.HolterStudyDtos
{
    public class AdditionalTestResultDto
    {
        public int Id { get; set; }
        public string TestName { get; set; }
        public DateTime TestDateTime { get; set; }
        public string Results { get; set; }

        public int HolterStudyId { get; set; }
    }
}