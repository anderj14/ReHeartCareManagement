import axios from "axios";

const baseUrl = "https://localhost:5001/api/v1";

const ApiService = {
    getPatientById: async (id: number) => {
        try {
            const response = await axios.get(`${baseUrl}/patients/notpag/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAppointmentsByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/appointment/patient/${patientId}/appointments`);
            return response.data;
        } catch (error) {
            console.error('Error fetching appointments by patient ID:', error);
            throw error;
        }
    },
    getBloodTestByPatientId: async (patientId: number) => {
        try {
            const response = await axios.get(`${baseUrl}/bloodTest/patient/${patientId}/bloodTests`);
            return response.data;
        } catch (error) {
            console.error('Error fetching blood test by patient Id:', error);
            throw error;
        }
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
    }
};

export default ApiService;
