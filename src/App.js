import React from 'react';
import Login from './components/Login/Login'; 
import Dashboard from './components/Dashboard/Dashboard';
import Users from './components/Users/Users'
import Parks from './components/Parks/Parks'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // React Router


function App() {
  localStorage.setItem('authenticated', false);
  
  function requireAuth(nextState, replace, next){
    debugger;
    console.log(localStorage.getItem('authenticated'));
    if (localStorage.getItem('authenticated') !== true ) {
      debugger;
      replace({
        pathname: "/login",
        state: {nextPathname: nextState.location.pathname}
      });
      
    }
  }

  return (
   
    <Router>
      <Routes>
        <Route path="/login"      element={<Login />}     onEnter={requireAuth()}/>  
        <Route path="/"           element={<Login />}     onEnter={requireAuth()}/>  
        <Route path="/dashboard"  element={<Dashboard />} onEnter={requireAuth()}/> 
        <Route path="/users"      element={<Users />}     onEnter={requireAuth()}/> 
        <Route path="/parks"      element={<Parks />}     onEnter={requireAuth()}/> 
      </Routes>
    </Router>

   
  );
}

export default App;