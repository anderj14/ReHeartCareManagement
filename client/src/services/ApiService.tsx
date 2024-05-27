import axios from "axios";
import agent from "../app/api/agent";

const baseUrl = "https://localhost:5001/api/v1";

const ApiService = {

    getPatientById: async (id: number) => {
        try {
            const response = agent.Patient.details(id);
            return response;
        } catch (error) {
            throw error;
        }
    },
    getAppointmentsByPatientId: async (patientId: number) => {
        const response = await axios.get(`${baseUrl}/appointment/patient/${patientId}/appointments`);
        return response.data;
    },
    getElectrocardiogramByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/electrocardiogram/patient/${patientId}/electrocardiograms`);
            return response.data;
        } catch (error) {
            console.log('Error fetching electrocardiogram by patient Id: ', error);
            throw error;
        }
    },
    getEchocardiogramByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/echocardiogram/patient/${patientId}/echocardiograms`);
            return response.data;
        } catch (error) {
            console.log('Error fetching echocardiogram by patient Id: ', error);
            throw error;
        }
    },
    getCardiacCathStudyByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/cardiaccatheterizationstudy/patient/${patientId}/cardiaccathstudies`);
            return response.data;
        } catch (error) {
            console.log('Error fetching cardiac catheterization study by patient Id: ', error);
            throw error;
        }
    },
    getHolterStudyByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/holterstudy/patient/${patientId}/holterstudies`);
            return response.data;
        } catch (error) {
            console.log('Error fetching holter study by patient Id: ', error);
            throw error;
        }
    },
    getPhysicalExaminationPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/physicalexamination/patient/${patientId}/physicalexaminations`);
            return response.data;
        } catch (error) {
            console.log('Error fetching physical examination by patient Id: ', error);
            throw error;
        }
    },
    getDiseaseHistoryByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/diseasehistory/patient/${patientId}/diseaseshistories`);
            return response.data;
        } catch (error) {
            console.log('Error fetching disease history by patient Id: ', error);
            throw error;
        }
    },
    getMedicalHistoryByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/medicalhistory/patient/${patientId}/medicalhistories`);
            return response.data;
        } catch (error) {
            console.log('Error fetching medical history by patient Id: ', error);
            throw error;
        }
    },
    getDiagnosticByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/diagnostic/patient/${patientId}/diagnostics`);
            return response.data;
        } catch (error) {
            console.log('Error fetching diagnostic by patient Id: ', error);
            throw error;
        }
    },
    getTreatmentByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/treatment/patient/${patientId}/treatments`);
            return response.data;
        } catch (error) {
            console.log('Error fetching treatment by patient Id: ', error);
            throw error;
        }
    },
    getCardiologySurgeryId: async (surgeryId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/cardiologySurgeries/${surgeryId}`);
            return response.data;
        } catch (error) {
            console.log('Error fetching cardiology surgeries: ', error);
            throw error;

        }
    }
};

export default ApiService;
