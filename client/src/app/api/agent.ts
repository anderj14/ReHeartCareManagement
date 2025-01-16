// agent.js
import axios, { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";
import { PaginatedResponse } from "../Models/pagination";
import { router } from "../router/Routes";
import { create } from "domain";

axios.defaults.baseURL = "https://localhost:5001/api/v1/";

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axios.interceptors.response.use(
  async (response) => {
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
      return response;
    }
    return response;
  },
  (error: AxiosError) => {
    const { status, data } = error.response as AxiosResponse;
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
        toast.error(data.title);
        break;
      case 401:
        toast.error(data.title);
        break;
      case 403:
        toast.error("You are not allowed to do that!");
        break;
      case 404:
        toast.error(data.title);
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        break;
    }
    return Promise.reject(error);
  }
);

const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-type": "application/json" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-type": "application/json" },
      })
      .then(responseBody),
};

function createFormData(item: any) {
  const formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}

const Admin = {
  createPatient: (patient: any) =>
    requests.postForm("patients", createFormData(patient)),
  updatePatient: (id: number, patient: any) =>
    requests.putForm(`patients/${id}`, createFormData(patient)),
  deletePatient: (id: number) => requests.delete(`patients/${id}`),
};

const Patient = {
  list: (params: URLSearchParams) => requests.get("patients", params),
  details: (id: number) => requests.get(`patients/${id}`),
  Statuslist: () => requests.get("patientstatuses"),
};

const CardiologySurgery = {
  list: (params: URLSearchParams) =>
    requests.get("cardiologysurgeries", params),
  listall: () => requests.get("patients/all"),
  details: (id: number) => requests.get(`cardiologysurgeries/${id}`),
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(
      `cardiologysurgeries/patient/${patientId}/cardiologysurgeries`,
      params
    ),
  createCardiologySurgery: (surgery: any) =>
    requests.postForm("CardiologySurgeries", createFormData(surgery)),
  updateCardiologySurgery: (id: number, surgery: any) =>
    requests.putForm(`CardiologySurgeries/${id}`, createFormData(surgery)),
  deleteCardiologySurgery: (id: number) =>
    requests.delete(`CardiologySurgeries/${id}`),
};

const SurgeryFollowUp = {
  listBySurgeryId: (params: URLSearchParams,surgeryId: number) =>
    requests.get(`surgeryfollowups/cardiologysurgery/${surgeryId}/followups`, params),
  detailsBySurgeryId: (surgeryId: number, followUpId: number) =>
    requests.get(
      `surgeryfollowups/cardiologysurgery/${surgeryId}/followups/${followUpId}`
    ),
  createSurgeryFollowUp: (surgeryfollowup: any) =>
    requests.postForm("surgeryfollowups", createFormData(surgeryfollowup)),
  updateSurgeryFollowUp: (id: number, followUp: any) =>
    requests.putForm(`surgeryfollowups/${id}`, createFormData(followUp)),
  deleteSurgeryFollowUp: (id: number) =>
    requests.delete(`surgeryfollowups/${id}`)
};

const Medication = {
  listByFollowId: (followId: number) =>
    requests.get(`medications/followup/${followId}/medications`),
  createMedication: ( medication: any) =>
    requests.postForm("medications", createFormData(medication)),
  updateMedication: (id: number, medication: any) =>
    requests.putForm(`medications/${id}`, createFormData(medication)),
  deleteMedication: (id: number) => requests.delete(`medications/${id}`),
}

const Note = {
  list: (params: URLSearchParams) => requests.get("notes", params),
  details: (id: number) => requests.get(`notes/${id}`),
  statuslist: () => requests.get("notestatus"),
  createNote: (note: any) => requests.postForm("notes", createFormData(note)),
  updateNote: (id: number, note: any) =>
    requests.putForm(`notes/${id}`, createFormData(note)),
  deleteNote: (id: number) => requests.delete(`notes/${id}`),
};

const BloodTest = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(`bloodtests/patient/${patientId}/bloodtests`, params),
  detailsByPatientId: (patientId: number, bloodTestId: number) =>
    requests.get(`bloodtests/patient/${patientId}/bloodtests/${bloodTestId}`),
  createBloodTest: (bloodTest: any) => requests.postForm("bloodtests", createFormData(bloodTest)),
  updateBloodTest: (id: number, bloodTest: any) =>
    requests.putForm(`bloodtests/${id}`, createFormData(bloodTest)),
  deleteBloodTest: (id: number) => requests.delete(`bloodtests/${id}`)
};

const CardiacCathStudy = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(
      `cardiaccatheterizationstudies/patient/${patientId}/cardiaccathstudies`,
      params
    ),
  detailsByPatientId: (patientId: number, cardiacCathStudyId: number) =>
    requests.get(
      `cardiaccatheterizationstudies/patient/${patientId}/cardiaccathstudies/${cardiacCathStudyId}`
    ),
  createCardiacCathStudy: (cardiacCathStudy: any) =>
    requests.postForm("cardiaccatheterizationstudies", createFormData(cardiacCathStudy)),
  updateCardiacCathStudy: (id: number, cardiacCathStudy: any) =>
    requests.putForm(`cardiaccatheterizationstudies/${id}`, createFormData(cardiacCathStudy)),
  deleteCardiacCathStudy: (id: number) =>
    requests.delete(`cardiaccatheterizationstudies/${id}`),
};

const Electrocardiogram = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(
      `electrocardiogram/patient/${patientId}/electrocardiograms`,
      params
    ),
  detailsByPatientId: (patientId: number, electrocardiogramId: number) =>
    requests.get(
      `electrocardiogram/patient/${patientId}/electrocardiograms/${electrocardiogramId}`
    ),
};

const Echocardiogram = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(`echocardiogram/patient/${patientId}/echocardiograms`),
  detailsByPatientId: (patientId: number, echocardiogramId: number) =>
    requests.get(
      `echocardiogram/patient/${patientId}/echocardiograms/${echocardiogramId}`
    ),
};

const HolterStudy = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(`holterstudy/patient/${patientId}/holterstudies`),
  detailsByPatientId: (patientId: number, holterStudyId: number) =>
    requests.get(
      `HolterStudy/patient/${patientId}/holterStudies/${holterStudyId}`
    ),
};

const PhysicalExamination = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(
      `physicalexamination/patient/${patientId}/physical-examinations`,
      params
    ),
  detailsByPatientId: (patientId: number, physicalExaminationId: number) =>
    requests.get(
      `physicalexamination/patient/${patientId}/physical-examinations/${physicalExaminationId}`
    ),
};

const DiseaseHistory = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(
      `diseasehistory/patient/${patientId}/diseaseshistories`,
      params
    ),
  detailsByPatientId: (patientId: number, diseaseHistoryId: number) =>
    requests.get(
      `diseasehistory/patient/${patientId}/diseaseshistories/${diseaseHistoryId}`
    ),
};

const MedicalHistory = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(
      `medicalhistory/patient/${patientId}/medicalhistories`,
      params
    ),
  detailsByPatientId: (patientId: number, medicalHistoryId: number) =>
    requests.get(
      `medicalhistory/patient/${patientId}/medicalhistories/${medicalHistoryId}`
    ),
};

const Diagnostic = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(`diagnostic/patient/${patientId}/diagnostics`, params),
  detailsByPatientId: (patientId: number, diagnosticId: number) =>
    requests.get(`diagnostic/patient/${patientId}/diagnostics/${diagnosticId}`),
};

const Treatment = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(`treatment/patient/${patientId}/treatments`, params),
  detailsByPatientId: (patientId: number, treatmentId: number) =>
    requests.get(`treatment/patient/${patientId}/treatments/${treatmentId}`),
};

const Appointment = {
  list: (params: URLSearchParams) => requests.get("appointment", params),
  listCalendar: () => requests.get("appointment/calendar"),
  details: (id: number) => requests.get(`appointment/${id}`),
};

const StressTest = {
  listByPatientId: (params: URLSearchParams, patientId: number) =>
    requests.get(`stresstest/patient/${patientId}/stresstests`, params),
  detailsByPatientId: (patientId: number, treatmentId: number) =>
    requests.get(`stresstest/patient/${patientId}/stresstests/${treatmentId}`),
};

const TestErrors = {
  get400Error: () => requests.get("buggy/badrequest"),
  get401Error: () => requests.get("buggy/unauthorized"),
  get404Error: () => requests.get("buggy/notfound"),
  get500Error: () => requests.get("buggy/servererror"),
};

const Account = {
  login: (values: any) => requests.post("account/login", values),
  register: (values: any) => requests.post("account/register", values),
  currentUser: () => requests.get("account/currentUser"),
};

const agent = {
  Patient,
  CardiologySurgery,
  SurgeryFollowUp,
  Medication,
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
  Appointment,
  StressTest,
  Admin,
};

export default agent;
