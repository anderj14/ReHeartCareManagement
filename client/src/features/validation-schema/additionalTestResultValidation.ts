import * as yup from "yup";

export const validationSchema = yup.object({
    testName: yup.string().required("Test name is required"),
    results: yup.string().required("Results is required"),
});