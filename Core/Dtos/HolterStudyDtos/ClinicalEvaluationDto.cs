
namespace Core.Dtos.HolterStudyDtos
{
    public class ClinicalEvaluationDto
    {
        public int Id { get; set; }
        public DateTime EvaluationDateTime { get; set; }
        public string Findings { get; set; }
        public string Recommendations { get; set; }

        public int HolterStudyId { get; set; }
    }
}