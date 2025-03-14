import * as yup from "yup";

export const validationSchema = yup.object({
    date: yup.string().required("Date is required"),
    studyDuration: yup.string().required("Study duration is required"),
    averageHeartRate: yup.string().required("Average heart rate is required"),
    maximumHeartRate: yup.string().required("Maximum heart rate is required"),
    typeHeartRhythm: yup.string().required("Type of heart rhythm is required"),
    physicalActivity: yup.string().required("Physical activity is required"),
    conclusion: yup.string().required("Conclusion is required"),
});