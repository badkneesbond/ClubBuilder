import logo from './logo.svg';
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Build from './pages/Build';
import Orders from './pages/Orders';
import About from './pages/About';


function App() {
  return (
    
    <div className="App">
       <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Build />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
