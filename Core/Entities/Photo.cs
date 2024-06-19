
using Core.Entities.Identity;

namespace Core.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        public string Url { get; set; }
        public bool IsMain { get; set; }
        public string PublicId { get; set; }

        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }

        public int PhysicalExaminationStressId { get; set; }
        public PhysicalExamination PhysicalExaminationStress { get; set; }

        public int? ElectrocardiogramId { get; set; }
        public Electrocardiogram Electrocardiogram { get; set; }

        public int StressTestId { get; set; }
        public StressTest StressTest { get; set; }

        public int EcocardiogramId { get; set; }
        public Echocardiogram Echocardiogram { get; set; }
        
        public int CardiacCatheterizationStudyId { get; set; }
        public CardiacCatheterizationStudy CardiacCatheterizationStudy { get; set; }

        public int BloodTestId { get; set; }
        public BloodTest BloodTest { get; set; }

        public int CardiologySurgeryId { get; set; }
        public CardiologySurgery CardiologySurgery { get; set; }
    }
}