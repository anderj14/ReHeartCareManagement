import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './app/layout/App';
import { Provider } from 'react-redux';
import { store } from './app/store/configureStore';
import { fetchPatientsAsync } from './features/patient/patientSlice';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

store.dispatch(fetchPatientsAsync());

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
