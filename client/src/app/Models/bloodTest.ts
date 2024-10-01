
export interface BloodTest {
    id: number
    date: string
    hemoglobin: number
    hematocrit: number
    whiteBloodCell: number
    platelets: number
    glucose: number
    cholesterolHDL: number
    cholesterolLDL: number
    triglycerides: number
    redBloodCell: number
    meanCorpuscularVolume: number
    meanCorpuscularHemoglobin: number
    meanCorpuscularHemoglobinConcentration: number
    redCellDistributionWidth: number
    bloodUreaNitrogen: number
    creatinine: number
    sodium: number
    potassium: number
    chloride: number
    bicarbonate: number
    calcium: number
    magnesium: number
    neutrophils: number
    lymphocytes: number
    monocytes: number
    eosinophils: number
    basophils: number
    patient: string
}

export interface BloodTestParams {
    sort: string;
    pageIndex: number;
    pageSize: number;
}