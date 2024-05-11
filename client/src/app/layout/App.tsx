import '../styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import Patients from '../../features/patient/Patients';
import PatientDetail from '../../features/patient/PatientDetails';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';
import Notes from '../../features/notes/Notes';
import CardiologySurgeries from '../../features/surgery/CardiologySurgeries';
import CardiologySurgeryDetails from '../../features/surgery/CardiologySurgeryDetails';

function App() {
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  }

  return (
    <Router>
      <div className="App">
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
                <Route path='/notes' element={< Notes />}></Route>
                {/* <Route path='/about' element={< AboutPage />}></Route> */}
                {/* <Route path='/contact' element={< ContactPage />}></Route> */}
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
