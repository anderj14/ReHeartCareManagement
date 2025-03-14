export interface ClinicalEvaluationBase {
  evaluationDateTime: string;
  findings: string;
  recommendations: string;
}

export interface ClinicalEvaluation extends ClinicalEvaluationBase {
  id: number;
  holterStudyId: number;
}

export interface FormData extends ClinicalEvaluationBase {
  holterStudyId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  evaluationDateTime: data.evaluationDateTime,
  findings: data.findings,
  recommendations: data.recommendations,
  holterStudyId: data.holterStudyId,
});
