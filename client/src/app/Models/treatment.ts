export interface Treatment {
  id: number;
  date: string;
  medication: string;
  dosage: string;
  instructions: string;
  otherTreatments: string;
  sideEffects: string;
  treatmentMonitoring: string;
  treatmentDuration: string;
  treatmentOutcome: string;
  patient: string;
}

export interface TreatmentParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}
