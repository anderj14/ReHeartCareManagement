import { AdditionalTestResult } from "./additionalTestResult"
import { ArrhythmiaEvent } from "./arrhythmiaEvent"
import { ClinicalEvaluation } from "./clinicalEvaluation"
import { MedicationAdministration } from "./medicationAdministration"
import { PatientSymptom } from "./patientSymptom"

export interface HolterStudy {
  id: number
  date: string
  time: string
  studyDuration: string
  averageHeartRate: string
  maximumHeartRate: string
  typeHeartRhythm: string
  physicalActivity: string
  conclusion: string
  patient: string
  arrhythmiaEvents: ArrhythmiaEvent[]
  medicationAdministrations: MedicationAdministration[]
  patientSymptoms: PatientSymptom[]
  clinicalEvaluations: ClinicalEvaluation[]
  additionalTestResults: AdditionalTestResult[]
}

export interface HolterStudyParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}