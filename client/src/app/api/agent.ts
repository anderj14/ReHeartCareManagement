import axios, { AxiosResponse } from "axios";
import { toast } from "react-toastify";
import { router } from "../router/Routes";

axios.defaults.baseURL = 'https://localhost:5001/api/v1/';

const responseBody = (response: AxiosResponse) => response.data;

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
                toast.error(data.message);
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
    list: () => requests.get('patients/notpag'),
    details: (id: number) => requests.get(`patients/notpag/${id}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/badrequest'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/notfound'),
    get500Error: () => requests.get('buggy/servererror'),
}

const agent = {
    Patient,
    TestErrors
}

export default agent;

function createBrowserHistory() {
    throw new Error("Function not implemented.");
}
