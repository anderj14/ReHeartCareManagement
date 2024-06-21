using Core.Entities;

namespace Core.Dtos
{
    public class DiseaseHistoryDto
    {
        public int Id { get; set; }
        public DateTime StartDate { get; set; }
        public string Description { get; set; }
        public string Treatment { get; set; }
        public string Patient { get; set; }

        public ICollection<Attachment> Attachments { get; set; }

    }
}