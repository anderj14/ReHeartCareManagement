export interface MedicationAdministrationBase {
  medicationName: string;
  administrationDateTime: string;
  dosage: string;
}

export interface MedicationAdministration extends MedicationAdministrationBase {
  id: number;
  holterStudyId: number;
}

export interface FormData extends MedicationAdministrationBase {
  holterStudyId: number;
}

export const mapFormDataToApiData = (data: FormData): any => ({
  medicationName: data.medicationName,
  administrationDateTime: data.administrationDateTime,
  dosage: data.dosage,
  holterStudyId: data.holterStudyId
});
