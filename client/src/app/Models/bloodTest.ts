
export interface BloodTestBase {
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
}

export interface BloodTest extends BloodTestBase {
    id: number;
    patient: string;
}

export interface FormData extends BloodTestBase {
    patientId: number
}

export const mapFormDataToApiData = (data: FormData): any => ({
    date: data.date,
    hemoglobin: data.hemoglobin,
    hematocrit: data.hematocrit,
    whiteBloodCell: data.whiteBloodCell,
    platelets: data.platelets,
    glucose: data.glucose,
    cholesterolHDL: data.cholesterolHDL,
    cholesterolLDL: data.cholesterolLDL,
    triglycerides: data.triglycerides,
    redBloodCell: data.redBloodCell,
    meanCorpuscularVolume: data.meanCorpuscularVolume,
    meanCorpuscularHemoglobin: data.meanCorpuscularHemoglobin,
    meanCorpuscularHemoglobinConcentration: data.meanCorpuscularHemoglobinConcentration,
    redCellDistributionWidth: data.redCellDistributionWidth,
    bloodUreaNitrogen: data.bloodUreaNitrogen,
    creatinine: data.creatinine,
    sodium: data.sodium,
    potassium: data.potassium,
    chloride: data.chloride,
    bicarbonate: data.bicarbonate,
    calcium: data.calcium,
    magnesium: data.magnesium,
    neutrophils: data.neutrophils,
    lymphocytes: data.lymphocytes,
    monocytes: data.monocytes,
    eosinophils: data.eosinophils,
    basophils: data.basophils,
    patientId: data.patientId
})

export interface BloodTestParams {
    sort: string;
    pageIndex: number;
    pageSize: number;
}