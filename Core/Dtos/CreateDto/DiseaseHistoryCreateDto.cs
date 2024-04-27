
namespace Core.Dtos.CreateDto
{
    public class DiseaseHistoryCreateDto
    {
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public string Treatment { get; set; }
        public int PatientId { get; set; }
    }
}