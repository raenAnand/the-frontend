// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import ItemList from './components/Items/ItemList'; // Import your Items component

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<ItemList />} />
          ) : (
            <Route path="/" element={<Login onLogin={handleLogin} />} />
          )}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          {isLoggedIn ? (
            <Route path="/items" element={<ItemList />} />
          ) : (
            <Route path="/items" element={<Login onLogin={handleLogin} />} />
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
