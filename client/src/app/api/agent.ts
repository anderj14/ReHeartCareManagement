import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { store } from "../store/configureStore";

axios.defaults.baseURL = 'https://localhost:5001/api/v1/';

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {
    const token = store.getState().account.user?.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

axios.interceptors.response.use(
    response => response,
    error => {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                if (data.errors) {
                    const modelStateErrors: string[] = [];
                    for (const key in data.errors) {
                        if (data.errors[key]) {
                            modelStateErrors.push(data.errors[key])
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
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
}

const Patient = {
    list: () => requests.get('patients'),
    details: (id: number) => requests.get(`patients/${id}`)
}

const CardiologySurgery = {
    list: () => requests.get('cardiologysurgeries'),
    details: (id: number) => requests.get(`cardiologysurgeries/${id}`)
}

const Note = {
    list: () => requests.get('notes'),
    details: (id: number) => requests.get(`notes/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/badrequest'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/notfound'),
    get500Error: () => requests.get('buggy/servererror'),
}

const Account = {
    login: (values: any) => requests.post('account/login', values),
    register: (values: any) => requests.post('account/register', values),
    currentUser: () => requests.get('account/currentUser')
};

const agent = {
    Patient,
    CardiologySurgery,
    Note,
    TestErrors,
    Account
}

export default agent;
