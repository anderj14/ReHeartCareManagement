import * as yup from "yup";

export const validationSchema = yup.object({
  patientName: yup.string().required("Patient name is required"),
  carnetIdentification: yup.string().required("Carnet identification is required"),
  dob: yup.string().required("Date of birth is required"),
  gender: yup.string().required("Gender is required"),
  address: yup.string().required("Address is required"),
  phone: yup.number().typeError("Phone must be a number").required("Phone number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  socialSecurity: yup.string().required("Social security number is required"),
  policyNumber: yup.string().required("Policy number is required"),
  fax: yup.string().optional(), // Optional field
  referringDoctor: yup.string().required("Referring doctor is required"),
  assignedDoctor: yup.string().required("Assigned doctor is required"),
  familyDoctor: yup.string().required("Family doctor is required"),
  emergencyContactName: yup.string().required("Emergency contact name is required"),
  emergencyContactNumber: yup.string().required("Emergency contact number is required"),
  emergencyContactRelation: yup.string().required("Emergency contact relation is required"),
  maritalStatus: yup.string().required("Marital status is required"),
  occupation: yup.string().required("Occupation is required"),
  statusId: yup.string().required("Status is required"),
});
