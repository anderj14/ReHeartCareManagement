import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import Patients from "../../features/patient/Patients";
import PatientDetail from "../../features/patient/PatientDetails";
import AboutPage from "../../features/about/AboutPage";
import Dashboard from "../../features/dashboard/Dashboard";
import CardiologySurgeries from "../../features/surgery/CardiologySurgeries";
import CardiologySurgeryDetails from "../../features/patient/cardiologySurgery/CardiologySurgeryDetails";
import AppointmentCalendar from "../../features/appointment/AppointmentCalendar";
import BloodTestDetails from "../../features/patient/bloodTest/BloodTestDetails";
import BloodTests from "../../features/patient/bloodTest/BloodTests";
import CardiacCathStudy from "../../features/patient/cardiacTestsPatient/CardiacCathStudy";
import CardiacCathStudyDetails from "../../features/patient/cardiacTestsPatient/CardiacCathStudyDetails";
import ElectrocardiogramDetails from "../../features/patient/electrocardiogram/ElectrocardiogramDetails";
import Electrocardiograms from "../../features/patient/electrocardiogram/Electrocardiograms";
import Echocardiograms from "../../features/patient/echocardiogram/Echocardiograms";
import EchocardiogramDetails from "../../features/patient/echocardiogram/EchocardiogramDetails";
import HolterStudies from "../../features/patient/holterStudy/HolterStudies";
import HolterStudyDetails from "../../features/patient/holterStudy/HolterStudyDetails";
import PhysicalExaminations from "../../features/patient/physicalExamination/PhysicalExaminations";
import PhysicalExaminationDetails from "../../features/patient/physicalExamination/PhysicalExaminationDetails";
import DiseaseHistoryDetails from "../../features/patient/diseaseHistory/DiseaseHistoryDetails";
import DiseaseHistories from "../../features/patient/diseaseHistory/DiseaseHistories";
import MedicalHistories from "../../features/patient/medicalHistory/MedicalHistories";
import MedicalHistoryDetails from "../../features/patient/medicalHistory/MedicalHistoryDetails";
import Diagnostics from "../../features/patient/diagnostic/Diagnostics";
import DiagnosticDetails from "../../features/patient/diagnostic/DiagnosticDetails";
import TreatmentDetails from "../../features/patient/treatment/TreatmentDetails";
import Treatments from "../../features/patient/treatment/Treatments";
import CardiologySurgery from "../../features/patient/cardiologySurgery/CardiologySurgery";
import StressTestDetails from "../../features/patient/stressTest/StressTestDetails";
import StressTest from "../../features/patient/stressTest/StressTests";
import NotFound from "../errors/NotFound";
import ServerError from "../errors/ServerError";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import UserNotes from "../../features/notes/UserNotes";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '', element: <Dashboard /> },
            { path: 'patients', element: <Patients /> },
            { path: 'patients/:id', element: <PatientDetail /> },
            { path: 'cardiologysurgeries', element: <CardiologySurgeries /> },
            { path: 'cardiologysurgeries/:id', element: <CardiologySurgeryDetails /> },
            { path: 'appointments', element: <AppointmentCalendar /> },
            { path: '/bloodtests/patient/:id/bloodtests', element: <BloodTests /> },
            { path: '/bloodtests/patient/:id/bloodtests/:bloodTestId', element: <BloodTestDetails /> },
            { path: '/cardiaccatheterizationstudy/patient/:id/cardiaccathstudies', element: <CardiacCathStudy /> },
            { path: '/cardiaccatheterizationstudy/patient/:id/cardiaccathstudies/:cardiacCathStudyId', element: <CardiacCathStudyDetails /> },
            { path: '/electrocardiogram/patient/:id/electrocardiograms', element: <Electrocardiograms /> },
            { path: '/electrocardiogram/patient/:id/electrocardiograms/:electrocardiogramId', element: <ElectrocardiogramDetails /> },
            { path: '/echocardiogram/patient/:id/echocardiograms', element: <Echocardiograms /> },
            { path: '/echocardiogram/patient/:id/echocardiograms/:echocardiogramId', element: <EchocardiogramDetails /> },
            { path: '/holterstudy/patient/:id/holterstudies', element: <HolterStudies /> },
            { path: '/holterstudy/patient/:id/holterstudies/:holterStudyId', element: <HolterStudyDetails /> },
            { path: '/physicalexamination/patient/:id/physicalexaminations', element: <PhysicalExaminations /> },
            { path: '/physicalexamination/patient/:id/physical-examinations/:physicalExaminationId', element: <PhysicalExaminationDetails /> },
            { path: '/diseasehistory/patient/:id/diseaseshistories', element: <DiseaseHistories /> },
            { path: '/diseasehistory/patient/:id/diseaseshistories/:diseaseHistoryId', element: <DiseaseHistoryDetails /> },
            { path: '/medicalhistory/patient/:id/medicalhistories', element: <MedicalHistories /> },
            { path: '/medicalhistory/patient/:id/medicalhistories/:medicalHistoryId', element: <MedicalHistoryDetails /> },
            { path: 'diagnostic/patient/:id/diagnostics', element: <Diagnostics /> },
            { path: 'diagnostic/patient/:id/diagnostics/:diagnosticId', element: <DiagnosticDetails /> },
            { path: '/treatment/patient/:id/treatments', element: <Treatments /> },
            { path: '/treatment/patient/:id/treatments/:treatmentId', element: <TreatmentDetails /> },
            { path: '/cardiologysurgery/patient/:id/cardiologysurgeries', element: <CardiologySurgery /> },
            { path: '/cardiologysurgery/patient/:id/cardiologysurgeries/:cardiologySurgeryId', element: <CardiologySurgeryDetails /> },
            { path: '/stresstest/patient/:id/stresstests', element: <StressTest /> },
            { path: '/stresstest/patient/:id/stresstests/:stressTestId', element: <StressTestDetails /> },
            { path: 'notes', element: <UserNotes /> },
            { path: 'about', element: <AboutPage /> },
            { path: '/server-error', element: <ServerError /> },
            { path: '/not-found', element: <NotFound /> },
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
            { path: '*', element: <Navigate replace to="/not-found" /> },
        ]
    }
]);
