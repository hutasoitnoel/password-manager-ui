import React from 'react';
import { Login, Dashboard } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tabs/style/react-tabs.css';
import CommonToast from './components/CommonToast';
import './App.css';

const App = () => {
  return <>
    <Router>
      <Routes>
        <Route path='/' Component={Dashboard} />
        <Route path='/login' element={<Login type='LOGIN' />} />
        <Route path='/register' element={<Login type='REGISTER' />} />
      </Routes>
    </Router>
    <CommonToast />
  </>
};

export default App;
