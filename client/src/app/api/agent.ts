// agent.js
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { store } from '../store/configureStore';
import { PaginatedResponse } from '../Models/pagination';

axios.defaults.baseURL = 'https://localhost:5001/api/v1/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    async (response) => {
        const pagination = response.headers['pagination'];
        if (pagination) {
            response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
            return response;
        }
        return response;
    },
    (error) => {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key]);
                        }
                    }
                    throw modelStateErrors.flat();
                }
                toast.error(data.message);
                break;
            case 401:
                toast.error('Unauthorized. Please log in again.');
                store.dispatch({ type: 'account/signOut' });
                break;
            case 404:
                toast.error(data.message);
                break;
            case 500:
                toast.error(data.message);
                break;
            default:
                break;
        }
        return Promise.reject(error);
    }
);

const requests = {
    get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
};

const Patient = {
    list: (params: URLSearchParams) => requests.get('patients', params),
    details: (id: number) => requests.get(`patients/${id}`),
};

const CardiologySurgery = {
    list: (params: URLSearchParams) => requests.get('cardiologysurgeries', params),
    details: (id: number) => requests.get(`cardiologysurgeries/${id}`),
};

const Note = {
    list: (params: URLSearchParams) => requests.get('notes', params),
    details: (id: number) => requests.get(`notes/${id}`),
};

const BloodTest = {
    list: (params: URLSearchParams) => requests.get('bloodtests', params),
    details: (id: number) => requests.get(`bloodtests/${id}`),
    listByPatientId: (patientId: number) => requests.get(`bloodtest/patient/${patientId}/bloodtests`),
    detailsByPatientId: (patientId: number, bloodTestId: number) => requests.get(`bloodtest/patient/${patientId}/bloodtests/${bloodTestId}`),
};

const CardiacCathStudy = {
    list: (params: URLSearchParams) => requests.get('cardiaccatheterizationstudy', params),
    details: (id: number) => requests.get(`cardiaccatheterizationstudy/${id}`),
    listByPatientId: (patientId: number) => requests.get(`cardiaccatheterizationstudy/patient/${patientId}/cardiaccathstudies`),
    detailsByPatientId: (patientId: number, cardiacCathStudyId: number) => requests.get(`cardiaccatheterizationstudy/patient/${patientId}/cardiaccathstudies/${cardiacCathStudyId}`),
};

const Electrocardiogram = {
    listByPatientId: (patientId: number) => requests.get(`electrocardiogram/patient/${patientId}/electrocardiograms`),
    detailsByPatientId: (patientId: number, electrocardiogramId: number) => requests.get(`electrocardiogram/patient/${patientId}/electrocardiograms/${electrocardiogramId}`),
};

const Echocardiogram = {
    listByPatientId: (patientId: number) => requests.get(`echocardiogram/patient/${patientId}/echocardiograms`),
    detailsByPatientId: (patientId: number, echocardiogramId: number) => requests.get(`echocardiogram/patient/${patientId}/echocardiograms/${echocardiogramId}`),
};

const HolterStudy = {
    listByPatientId: (patientId: number) => requests.get(`holterstudy/patient/${patientId}/holterstudies`),
    detailsByPatientId: (patientId: number, holterStudyId: number) => requests.get(`HolterStudy/patient/${patientId}/holterStudies/${holterStudyId}`),
};

const PhysicalExamination = {
    listByPatientId: (patientId: number) => requests.get(`physicalexamination/patient/${patientId}/physicalexaminations`),
    detailsByPatientId: (patientId: number, physicalExaminationId: number) => requests.get(`physicalexamination/patient/${patientId}/physicalexaminations/${physicalExaminationId}`),
};

const DiseaseHistory = {
    listByPatientId: (patientId: number) => requests.get(`diseasehistory/patient/${patientId}/diseaseshistories`),
    detailsByPatientId: (patientId: number, diseaseHistoryId: number) => requests.get(`diseasehistory/patient/${patientId}/diseaseshistories/${diseaseHistoryId}`),
};

const MedicalHistory = {
    listByPatientId: (patientId: number) => requests.get(`medicalhistory/patient/${patientId}/medicalhistories`),
    detailsByPatientId: (patientId: number, medicalHistoryId: number) => requests.get(`medicalhistory/patient/${patientId}/medicalhistories/${medicalHistoryId}`),
};

const Diagnostic = {
    listByPatientId: (patientId: number) => requests.get(`diagnostic/patient/${patientId}/diagnostics`),
    detailsByPatientId: (patientId: number, diagnosticId: number) => requests.get(`diagnostic/patient/${patientId}/diagnostics/${diagnosticId}`),
};

const Treatment = {
    listByPatientId: (patientId: number) => requests.get(`treatment/patient/${patientId}/treatments`),
    detailsByPatientId: (patientId: number, treatmentId: number) => requests.get(`treatment/patient/${patientId}/treatments/${treatmentId}`),
};

const TestErrors = {
    get400Error: () => requests.get('buggy/badrequest'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/notfound'),
    get500Error: () => requests.get('buggy/servererror'),
};

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser'),
};

const agent = {
    Patient,
    CardiologySurgery,
    Note,
    TestErrors,
    Account,
    BloodTest,
    CardiacCathStudy,
    Electrocardiogram,
    Echocardiogram,
    HolterStudy,
    PhysicalExamination,
    DiseaseHistory,
    MedicalHistory,
    Diagnostic,
    Treatment,
};

export default agent;
