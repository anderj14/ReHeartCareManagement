import * as yup from "yup";

export const validationSchema = yup.object({
  symptomName: yup.string().required("Symptom name is required"),
  symptomDateTime: yup.string().required("Date is required"),
  description: yup.string().required("Description is required"),
});