import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import './App.css';
import Flood_homepage from './assets/weather_detail'
import Weather_box from './weather_box'
import Notification from './notification';
import Map from './map';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
  <div className="max-w-5x1 mx-auto px-4">        {/* Notification Button at Top Left */}
  <div className="fixed top-5 right-5 z-50">
    <Notification />
  </div>

  {/* Weather Box */}
  <div className="mt-20"> {/* Add margin to avoid overlap */}
    <Weather_box />
  </div>
  <Map />
</div>
}

export default App;