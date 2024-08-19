
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class ClinicalEvaluationCreateDto
    {
        [Required]
        public DateTime EvaluationDateTime { get; set; }
        [Required]
        public string Findings { get; set; }
        [Required]
        public string Recommendations { get; set; }
        [Required]
        public int HolterStudyId { get; set; }
    }
}