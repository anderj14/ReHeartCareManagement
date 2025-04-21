export interface PhysicalExaminationBase {
  date: string;
  time: string;
  duration: string;
  maxHeartRate: string;
  peakPressure: string;
  exerciseInducedSymptoms: string;
  abnormalEcgFindings: string;
  conclusion: string;
}

export interface PhysicalExamination extends PhysicalExaminationBase {
  id: number;
  patient: string;
}

export interface FormData extends PhysicalExaminationBase {
  patientId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  date: data.date,
  time: data.time,
  duration: data.duration,
  maxHeartRate: data.maxHeartRate,
  peakPressure: data.peakPressure,
  exerciseInducedSymptoms: data.exerciseInducedSymptoms,
  abnormalEcgFindings: data.abnormalEcgFindings,
  conclusion: data.conclusion,
  patientId: data.patientId,
});

export interface PhysicalExaminationParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}
