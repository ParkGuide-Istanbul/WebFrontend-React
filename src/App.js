import React from 'react';
import Login from './components/Login/Login'; 
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users'
import Parks from './components/Parks/Parks'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router


function App() {

  return (
   
        <Router>
      <Routes>
        <Route path="/" element={<Login />} />  
        <Route path="/login" element={<Login />} />  
        <Route path="/dashboard" element={<Dashboard />}/> 
        <Route path="/users" element={<Users />}/> 
        <Route path="/parks" element={<Parks />}/> 
      </Routes>
    </Router>

      
    
   
   
  );
}

export default App;