import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/Login';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
    <Route exact path="/" element={< LoginPage />} />
    <Route exact path="/dashboard" element={<Dashboard />} />     
    <Route exact path="/orders" element={<Dashboard />} />
    <Route exact path="/home" element={<Dashboard />} />
    <Route exaxt path="/manage" element={<Dashboard />}/>
    <Route exact path="/inventory" element={<Dashboard />}/>
    </Routes>
  </Router>
  );
}

export default App;
