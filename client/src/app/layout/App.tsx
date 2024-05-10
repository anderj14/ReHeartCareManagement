import '../styles/main.scss';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../../features/dashboard/Dashboard';
import Patients from '../../features/patient/Patients';
import PatientDetail from '../../features/patient/PatientDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import Sidebar from '../components/Sidebar';
import { useState } from 'react';

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
                <Route path='/about' element={< AboutPage />}></Route>
                <Route path='/contact' element={< ContactPage />}></Route>
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>

  );
}

export default App;
