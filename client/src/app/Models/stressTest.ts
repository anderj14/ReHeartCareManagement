export interface StressTestBase {
  date: string;
  time: string;
  duration: string;
  maxHeartRate: string;
  peakPressure: string;
  exerciseInducedSymptoms: string;
  restingHeartRate: number;
  maxBloodPressureSystolic: number;
  maxBloodPressureDiastolic: number;
  exerciseProtocol: string;
  indications: string;
  abnormalEcgFindings: string;
  conclusion: string;
}

export interface StressTest extends StressTestBase{
  id: number
  patient: string
}

export interface FormData extends StressTestBase {
  patientId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  date: data.date,
  time: data.time,
  duration: data.duration,
  maxHeartRate: data.maxHeartRate,
  peakPressure: data.peakPressure,
  exerciseInducedSymptoms: data.exerciseInducedSymptoms,
  restingHeartRate: data.restingHeartRate,
  maxBloodPressureSystolic: data.maxBloodPressureSystolic,
  maxBloodPressureDiastolic: data.maxBloodPressureDiastolic,
  exerciseProtocol: data.exerciseProtocol,
  indications: data.indications,
  abnormalEcgFindings: data.abnormalEcgFindings,
  conclusion: data.conclusion,
  patientId: data.patientId,
})

export interface StressTestParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}
