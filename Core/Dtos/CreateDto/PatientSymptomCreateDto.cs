
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class PatientSymptomCreateDto
    {
        [Required]
        public string SymptomName { get; set; }
       
        [Required]
        public DateTime SymptomDateTime { get; set; }
       
        [Required]
        public string Description { get; set; }

        [Required]
        public int HolterStudyId { get; set; }
    }
}