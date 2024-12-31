import { Medication } from "./medication";

export interface SurgeryFollowUp {
  id: number;
  followUpDate: string;
  followUpNotes: string;
  complications: string;
  recommendations: string;
  functionalAssessment: string;
  isFollowUpComplete: boolean;
  cardiologySurgeryId: number;
  medicationId: number;
  medications: Medication[];
}

export interface SurgeryFolowUpParams {
  sort: string;
  pageIndex: number;
  pageSize: number;
}
