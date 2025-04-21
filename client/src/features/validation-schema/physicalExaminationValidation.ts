import * as yup from "yup";

export const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    duration: yup.string().required("Duration is required"),
    maxHeartRate: yup.string().required("Max heart rate  is required"),
    peakPressure: yup.string().required("Peak pressure is required"),
    exerciseInducedSymptoms: yup.string().required("Exercise induced symptoms is required"),
    abnormalEcgFindings: yup.string().required("Abnormal ecg findings is required"),
    conclusion: yup.string().required("Conclusion is required"),
});