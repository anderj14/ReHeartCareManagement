
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class AdditionalTestResultCreateDto
    {
        [Required]
        public string TestName { get; set; }
        [Required]
        public DateTime TestDateTime { get; set; }
        [Required]
        public string Results { get; set; }
        [Required]
        public int HolterStudyId { get; set; }
    }
}