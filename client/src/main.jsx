// client/src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Register from './register.jsx'; 
import Login from './login.jsx'; 
import Review from './review.jsx'; 
import Home from './home.jsx'; 
import Navbar from './components/Navbar.jsx'; 
import './App.css';
import { AuthProvider } from './AuthContext.jsx'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/app" element={<App />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </>
    </BrowserRouter>
  </AuthProvider>
);
