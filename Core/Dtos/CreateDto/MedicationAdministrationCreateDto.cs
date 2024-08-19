using System.ComponentModel.DataAnnotations;

namespace Core.Dtos.CreateDto
{
    public class MedicationAdministrationCreateDto
    {
        [Required]
        public string MedicationName { get; set; }
        
        [Required]
        public DateTime AdministrationDateTime { get; set; }
       
        [Required]
        public string Dosage { get; set; }
       
        [Required]
        public int HolterStudyId { get; set; }
    }
}