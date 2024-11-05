export interface StressTest {
  id: number;
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
  patient: number;
}

export interface StressTestParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}
