export interface AdditionalTestResultBase {
  testName: string;
  testDateTime: string;
  results: string;
}

export interface AdditionalTestResult extends AdditionalTestResultBase {
  id: number;
  holterStudyId: number;
}

export interface FormData extends AdditionalTestResultBase {
  holterStudyId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  testName: data.testName,
  testDateTime: data.testDateTime,
  results: data.results,
  holterStudyId: data.holterStudyId
});
