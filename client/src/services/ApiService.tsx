import axios from "axios";

const baseUrl = "https://localhost:5001/api/v1";

const ApiService = {

    getAppointmentsByPatientId: async (patientId: number) => {
        const response = await axios.get(`${baseUrl}/appointment/patient/${patientId}/appointments`);
        return response.data;
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
