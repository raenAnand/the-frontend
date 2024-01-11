// src/components/Login/Login.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Validate textfield values
      if (!username || !password) {
        toast.error("Username and password are required.");
        return;
      }

      // Call API for authentication using Axios
      const response = await axios.post('your_auth_api_endpoint', {
        username,
        password,
      });

      // Check if API call is successful
      if (response.status === 200) {
        // Parse the response to get the access token
        const accessToken = response.data.access_token;

        // Save access token (you might want to use a secure storage mechanism)
        localStorage.setItem('access_token', accessToken);

        // Call the onLogin callback to update the state in the parent component
        onLogin();

        // Show success message using toast
        toast.success("Login successful!");

        
      } else {
        // On API failure, handle error
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="center-container">
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form">
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleLogin}>Login</button>
          <p>Don't have an account? <Link to="/signup">Signup</Link></p>
        </form>

        {/* ToastContainer for displaying messages */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
