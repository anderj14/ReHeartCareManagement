import * as yup from "yup";

export const validationSchema = yup.object({
  medicationName: yup.string().required("Medication name is required"),
  administrationDateTime: yup.string().required("Date time is required"),
  dosage: yup.string().required("Dosage is required"),
});
