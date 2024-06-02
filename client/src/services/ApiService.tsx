import axios from "axios";

const baseUrl = "https://localhost:5001/api/v1";

const ApiService = {

    getAppointmentsByPatientId: async (patientId: number) => {
        const response = await axios.get(`${baseUrl}/appointment/patient/${patientId}/appointments`);
        return response.data;
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
};

export default ApiService;
