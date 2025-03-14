import * as yup from "yup";

export const validationSchema = yup.object({
  findings: yup.string().required("Findings is required"),
  recommendations: yup.string().required("Recommendations is required"),
});
