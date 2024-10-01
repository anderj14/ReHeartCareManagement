namespace Core.DTOs
{
    public class BloodTestDto
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal Hemoglobin { get; set; }
        public decimal Hematocrit { get; set; }
        public int WhiteBloodCell { get; set; }
        public int Platelets { get; set; }
        public decimal Glucose { get; set; }
        public decimal CholesterolHDL { get; set; }
        public decimal CholesterolLDL { get; set; }
        public decimal Triglycerides { get; set; }
        public decimal RedBloodCell { get; set; }
        public decimal MeanCorpuscularVolume { get; set; }
        public decimal MeanCorpuscularHemoglobin { get; set; }
        public decimal MeanCorpuscularHemoglobinConcentration { get; set; }
        public decimal RedCellDistributionWidth { get; set; }
        public decimal BloodUreaNitrogen { get; set; }
        public decimal Creatinine { get; set; }
        public decimal Sodium { get; set; }
        public decimal Potassium { get; set; }
        public decimal Chloride { get; set; }
        public decimal Bicarbonate { get; set; }
        public decimal Calcium { get; set; }
        public decimal Magnesium { get; set; }
        public decimal Neutrophils { get; set; }
        public decimal Lymphocytes { get; set; }
        public decimal Monocytes { get; set; }
        public decimal Eosinophils { get; set; }
        public decimal Basophils { get; set; }
        public string Patient { get; set; }
    }
}
