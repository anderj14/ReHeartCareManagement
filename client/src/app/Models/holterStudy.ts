
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

export interface ArrhythmiaEvent {
  id: number
  type: string
  duration: string
  heartRateDuringEvent: number
  description: string
}

export interface MedicationAdministration {
  id: number
  medicationName: string
  administrationDateTime: string
  dosage: string
}

export interface PatientSymptom {
  id: number
  symptomName: string
  symptomDateTime: string
  description: string
}

export interface ClinicalEvaluation {
  id: number
  evaluationDateTime: string
  findings: string
  recommendations: string
}

export interface AdditionalTestResult {
  id: number
  testName: string
  testDateTime: string
  results: string
}
