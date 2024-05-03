import React from 'react';
import { Login, Register, Dashboard } from './components';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  return <Router>
    <Routes>
      <Route path='/' Component={Dashboard} />
      <Route path='/login' Component={Login} />
      <Route path='/register' Component={Register} />
    </Routes>
  </Router>
};

export default App;
