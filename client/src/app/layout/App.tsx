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
                <Route path='/bloodtests/patient/:id/bloodtests' element={< BloodTests />}></Route>
                <Route path="/bloodtests/patient/:id/bloodtests/:bloodTestId" element={<BloodTestDetails />} />
                <Route path='/cardiaccatheterizationstudy/patient/:id/cardiaccathstudies' element={< CardiacCathStudy />}></Route>
                <Route path="/cardiaccatheterizationstudy/patient/:id/cardiaccathstudies/:cardiacCathStudyId" element={<CardiacCathStudyDetails />} />
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
