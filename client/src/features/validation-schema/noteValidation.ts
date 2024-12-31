import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup.string().required("Title is required"),
  content: yup.string().required("Content is required"),
  date: yup.string().required("Date is required"),
  noteStatusId: yup.string().required("Status is required"),
});
