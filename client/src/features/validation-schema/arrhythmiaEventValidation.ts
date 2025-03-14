import * as yup from "yup";

export const validationSchema = yup.object({
  type: yup.string().required("Arrhythmia type is required"),
  duration: yup.string().required("Duration is required"),
  heartRateDuringEvent: yup.number().required("Heart rate is required"),
  description: yup.string().required("Description is required."),
});
