export interface MedicalHistory {
  id: number
  date: string
  previousHeartDisease: boolean
  highBloodPressure: boolean
  diabetes: boolean
  hyperlipidemia: boolean
  obesity: boolean
  smoking: boolean
  cardiacProcedures: string
  systemicDiseases: string
  medications: string
  familyDiseases: string
  otherDetails: string
  patient: string
}

export interface MedicalHistoryParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}