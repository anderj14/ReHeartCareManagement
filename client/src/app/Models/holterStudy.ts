import { AdditionalTestResult } from "./additionalTestResult"
import { ArrhythmiaEvent } from "./arrhythmiaEvent"
import { ClinicalEvaluation } from "./clinicalEvaluation"
import { MedicationAdministration } from "./medicationAdministration"
import { PatientSymptom } from "./patientSymptom"

export interface HolterStudyBase {
  date: string
  time: string
  studyDuration: string
  averageHeartRate: string
  maximumHeartRate: string
  typeHeartRhythm: string
  physicalActivity: string
  conclusion: string
  arrhythmiaEvents: ArrhythmiaEvent[]
  medicationAdministrations: MedicationAdministration[]
  patientSymptoms: PatientSymptom[]
  clinicalEvaluations: ClinicalEvaluation[]
  additionalTestResults: AdditionalTestResult[]
}

export interface HolterStudy extends HolterStudyBase {
  id: number
  patient: string
}

export interface FormData extends HolterStudyBase {
  patientId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  date: data.date,
  studyDuration: data.studyDuration,
  averageHeartRate: data.averageHeartRate,
  maximumHeartRate: data.maximumHeartRate,
  typeHeartRhythm: data.typeHeartRhythm,
  physicalActivity: data.physicalActivity,
  conclusion: data.conclusion,
  patientId: data.patientId,
})

export interface HolterStudyParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}