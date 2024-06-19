
namespace Core.Entities
{
    public class Attachment : BaseEntity
    {
        public string FilePath { get; set; }
        public string FileName { get; set; }
        public int DiseaseHistoryId { get; set; }
        public DiseaseHistory DiseaseHistory { get; set; }
    }
}