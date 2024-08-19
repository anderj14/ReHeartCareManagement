
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class ArrhythmiaEventCreateDto
    {
        [Required]
        public string Type { get; set; }
        
        [Required]
        public string Duration { get; set; }
        
        [Required]
        public int HeartRateDuringEvent { get; set; }
        
        [Required]
        public string Description { get; set; }

        [Required]
        public int HolterStudyId { get; set; }
    }
}