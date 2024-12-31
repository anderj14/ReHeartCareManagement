import * as yup from "yup";

export const validationSchema = yup.object({
  // surgeryDate: yup.string().required("Follow-up date is required"),
  complications: yup.string().required("Complications is required"),
  recommendations: yup.string().required("Recommendations is required"),
  functionalAssessment: yup
    .string()
    .required("Functional assessment is required"),
  followUpNotes: yup.string().required("Follow-up notes is required"),
});
