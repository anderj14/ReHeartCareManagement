import { createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import PatientCat from "../../features/patient/Patients";
import PatientDetail from "../../features/patient/PatientDetails";
import AboutPage from "../../features/about/AboutPage";
import ContactPage from "../../features/contact/ContactPage";
import Dashboard from "../../features/dashboard/Dashboard";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Dashboard /> }, 
            { path: 'patients', element: <PatientCat /> },
            { path: 'patients/:id', element: <PatientDetail /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
        ]
    }
]);
