export interface ArrhythmiaEventBase {
  type: string;
  duration: string;
  heartRateDuringEvent: number;
  description: string;
}

export interface ArrhythmiaEvent extends ArrhythmiaEventBase {
  id: number;
  holterStudyId: number;
}

export interface FormData extends ArrhythmiaEventBase {
  holterStudyId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  type: data.type,
  duration: data.duration,
  heartRateDuringEvent: data.heartRateDuringEvent,
  description: data.description,
  holterStudyId: data.holterStudyId,
});
