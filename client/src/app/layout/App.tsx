import '../styles/main.scss';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import Patients from '../../features/patient/Patients';
import PatientDetail from '../../features/patient/PatientDetails';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import Notes from '../../features/notes/Notes';
import CardiologySurgeries from '../../features/surgery/CardiologySurgeries';
import CardiologySurgeryDetails from '../../features/surgery/CardiologySurgeryDetails';
import { ContactPage } from '@mui/icons-material';
import AboutPage from '../../features/about/AboutPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import Login from '../../features/account/Login';
import Register from '../../features/account/Register';
import { useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import BloodTests from '../../features/patient/bloodTest/BloodTests';
import BloodTestDetails from '../../features/patient/bloodTest/BloodTestDetails';
import CardiacCathStudy from '../../features/patient/cardiacTestsPatient/CardiacCathStudy';
import CardiacCathStudyDetails from '../../features/patient/cardiacTestsPatient/CardiacCathStudyDetails';
import Electrocardiograms from '../../features/patient/electrocardiogram/Electrocardiograms';
import ElectrocardiogramDetails from '../../features/patient/electrocardiogram/ElectrocardiogramDetails';
import Echocardiograms from '../../features/patient/echocardiogram/Echocardiograms';
import EchocardiogramDetails from '../../features/patient/echocardiogram/EchocardiogramDetails';
import HolterStudies from '../../features/patient/holterStudy/HolterStudies';
import HolterStudyDetails from '../../features/patient/holterStudy/HolterStudyDetails';
import PhysicalExaminations from '../../features/patient/physicalExamination/PhysicalExaminations';
import PhysicalExaminationDetails from '../../features/patient/physicalExamination/PhysicalExaminationDetails';
import DiseaseHistories from '../../features/patient/diseaseHistory/DiseaseHistories';
import DiseaseHistoryDetails from '../../features/patient/diseaseHistory/DiseaseHistoryDetails';
import MedicalHistories from '../../features/patient/medicalHistory/MedicalHistories';
import MedicalHistoryDetails from '../../features/patient/medicalHistory/MedicalHistoryDetails';
import Diagnostics from '../../features/patient/diagnostic/Diagnostics';
import DiagnosticDetails from '../../features/patient/diagnostic/DiagnosticDetails';
import Treatments from '../../features/patient/treatment/Treatments';
import TreatmentDetails from '../../features/patient/treatment/TreatmentDetails';
import Appointments from '../../features/appointment/AppointmentCalendar';
import AppointmentCalendar from '../../features/appointment/AppointmentCalendar';
import PatientForm from '../../features/patient/admin-patient/PatientForm';

function App() {
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch])

  return (
    <Router>
      <div className="App">
        <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
        <div className="flex">
          <Sidebar closeMenu={closeMenu} handleCloseMenu={handleCloseMenu} />
          <div className="content-wrapper">
            <div className={closeMenu ? "content" : "content expanded"}>
              <Routes>
                <Route path='/' element={< Dashboard />}></Route>
                <Route path='/patients' element={< Patients />}></Route>
                <Route path='/patients/:id' element={< PatientDetail />}></Route>
                <Route path='/cardiologysurgeries' element={< CardiologySurgeries />}></Route>
                <Route path='/cardiologysurgeries/:id' element={< CardiologySurgeryDetails />}></Route>
                <Route path='/appointments' element={< AppointmentCalendar />}></Route>
                <Route path='/bloodtests/patient/:id/bloodtests' element={< BloodTests />}></Route>
                <Route path="/bloodtests/patient/:id/bloodtests/:bloodTestId" element={<BloodTestDetails />} />
                <Route path='/cardiaccatheterizationstudy/patient/:id/cardiaccathstudies' element={< CardiacCathStudy />}></Route>
                <Route path="/cardiaccatheterizationstudy/patient/:id/cardiaccathstudies/:cardiacCathStudyId" element={<CardiacCathStudyDetails />} />
                <Route path='/electrocardiogram/patient/:id/electrocardiograms' element={< Electrocardiograms />}></Route>
                <Route path='/electrocardiogram/patient/:id/electrocardiograms/:electrocardiogramId' element={< ElectrocardiogramDetails />}></Route>
                <Route path='/echocardiogram/patient/:id/echocardiograms' element={< Echocardiograms />}></Route>
                <Route path='/echocardiogram/patient/:id/echocardiograms/:echocardiogramId' element={< EchocardiogramDetails />}></Route>
                <Route path='/holterstudy/patient/:id/holterstudies' element={< HolterStudies />}></Route>
                <Route path='/holterstudy/patient/:id/holterstudies/:holterStudyId' element={< HolterStudyDetails />}></Route>
                <Route path='/physicalexamination/patient/:id/physicalexaminations' element={< PhysicalExaminations />}></Route>
                <Route path='/physicalexamination/patient/:id/physicalexaminations/:physicalExaminationId' element={< PhysicalExaminationDetails />}></Route>
                <Route path='/diseasehistory/patient/:id/diseaseshistories' element={< DiseaseHistories />}></Route>
                <Route path='/diseasehistory/patient/:id/diseaseshistories/:diseaseHistoryId' element={< DiseaseHistoryDetails />}></Route>
                <Route path='/medicalhistory/patient/:id/medicalhistories' element={< MedicalHistories />}></Route>
                <Route path='/medicalhistory/patient/:id/medicalhistories/:medicalHistoryId' element={< MedicalHistoryDetails />}></Route>
                <Route path='/diagnostic/patient/:id/diagnostics' element={< Diagnostics />}></Route>
                <Route path='/diagnostic/patient/:id/diagnostics/:diagnosticId' element={< DiagnosticDetails />}></Route>
                <Route path='/treatment/patient/:id/treatments' element={< Treatments />}></Route>
                <Route path='/treatment/patient/:id/treatments/:treatmentId' element={< TreatmentDetails />}></Route>
                <Route path='/notes' element={< Notes />}></Route>
                <Route path='/about' element={< AboutPage />}></Route>
                <Route path='/contact' element={< ContactPage />}></Route>
                <Route path='/server-error' element={< ServerError />}></Route>
                <Route path='/not-found' element={< NotFound />}></Route>
                <Route path='/login' element={< Login />}></Route>
                <Route path='/register' element={< Register />}></Route>
                <Route path='*' element={< Navigate replace to={'/not-found'} />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
