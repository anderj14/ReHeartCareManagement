
import '../styles/main.scss';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '../store/configureStore';
import { fetchCurrentUser } from '../../features/account/accountSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [closeMenu, setCloseMenu] = useState(false);

  const handleCloseMenu = () => {
    setCloseMenu(!closeMenu);
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="App">
      <ToastContainer position='bottom-right' hideProgressBar theme='colored' />
      <div className="flex">
        <Sidebar closeMenu={closeMenu} handleCloseMenu={handleCloseMenu} />
        <div className="content-wrapper">
          <div className={closeMenu ? "content" : "content expanded"}>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
