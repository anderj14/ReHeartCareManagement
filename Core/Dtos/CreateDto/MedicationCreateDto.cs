
using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class MedicationCreateDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Dosage { get; set; }
        [Required]
        public string Frequency { get; set; }
        [Required]
        public string Route { get; set; }
        [Required]
        public string Notes { get; set; }
        [Required]
        public int SurgeryFollowUpId { get; set; }
    }
}