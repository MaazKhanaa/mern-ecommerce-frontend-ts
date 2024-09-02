import React from 'react';
import './App.css'
import { RoutesPage } from 'src/routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  return (
    <div className="main-app h-100">
      <RoutesPage />  
      <ToastContainer />
    </div>
  );
};

export default App;