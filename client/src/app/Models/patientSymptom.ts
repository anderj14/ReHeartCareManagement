export interface PatientSymptomBase {
  symptomName: string;
  symptomDateTime: string;
  description: string;
}

export interface PatientSymptom extends PatientSymptomBase {
  id: number;
  holterStudyId: number;
}

export interface FormData extends PatientSymptomBase {
  holterStudyId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  symptomName: data.symptomName,
  symptomDateTime: data.symptomDateTime,
  description: data.description,
  holterStudyId: data.holterStudyId
});
