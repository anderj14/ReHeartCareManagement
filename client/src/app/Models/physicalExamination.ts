export interface PhysicalExamination {
    id: number
    date: string
    time: string
    duration: string
    maxHeartRate: string
    peakPressure: string
    exerciseInducedSymptoms: string
    abnormalEcgFindings: string
    conclusion: string
    patient: string
}

export interface PhysicalExaminationParams {
    sort: string;
    pageIndex: number;
    pageSize: number;
  }