import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm'; // Import the form
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          
          <Route path="/dashboard" element={<><Navbar /><StudentList /></>} />
          
          <Route path="/profile" element={<><Navbar /><Profile /></>} />
          
          <Route path="/add" element={<><Navbar /><StudentForm /></>} />
          
          <Route path="/edit/:id" element={<><Navbar /><StudentForm /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;