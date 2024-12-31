import * as yup from "yup";

export const validationSchema = yup.object({
    surgeryName: yup.string().required("Surgery name is required"),
    time: yup.string().required("Time is required"),
    procedureDescription: yup.string().required("Procedure description is required"),
    notes: yup.string().required("Notes is required"),
    operationRoom: yup.string().required("Operation room is required"),
    preOpDiagnosis: yup.string().required("Pre-Operative diagnosis is required"),
    postOpDiagnosis: yup.string().required("Post-Operative diagnosis is required"),
    duration: yup.number().required("Duration is required").positive("Duration must be a positive number"),
    cardiacCondition: yup.string().required("Cardiac condition is required"),
    complications: yup.string().optional(),
    postOperativeStatus: yup.string().required("Post-operative status is required"),
    anesthesiaType: yup.string().required("Anesthesia type is required"),
    surgicalTeam: yup.string().required("Surgical team is required"),
    intraoperativeFindings: yup.string().optional(),
    postOperativeInstructions: yup.string().required("Post-operative instructions are required"),
    patientId: yup.number().required("Patient is required"),
  });