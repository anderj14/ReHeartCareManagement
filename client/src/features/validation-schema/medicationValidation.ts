import * as yup from "yup";

export const validationSchema = yup.object({
  name: yup.string().required("Medication name is required"),
  dosage: yup.string().required("Dosage is required"),
  frequency: yup.string().required("Frequency is required"),
  route: yup.string().required("Route is required"),
  notes: yup.string().required("Notes is required"),
});
