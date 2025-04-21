import * as yup from "yup";

export const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    duration: yup.string().required("Test duration is required"),
    maxHeartRate: yup.string().required("Max heart rate is required"),
    peakPressure: yup.string().required("Peak pressure is required"),
    exerciseInducedSymptoms: yup.string().required("Exercise-induced symptoms are required"),
    restingHeartRate: yup.number().required("Resting heart rate is required").positive("Resting heart rate must be a positive number"),
    maxBloodPressureSystolic: yup.number().required("Max blood pressure (systolic) is required").positive("Max blood pressure (systolic) must be a positive number"),
    maxBloodPressureDiastolic: yup.number().required("Max blood pressure (diastolic) is required").positive("Max blood pressure (diastolic) must be a positive number"),
    exerciseProtocol: yup.string().required("Exercise protocol is required"),
    indications: yup.string().required("Indications are required"),
    abnormalEcgFindings: yup.string().required("Abnormal ECG findings are required"),
    conclusion: yup.string().required("Conclusion is required"),
});