import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useHistory
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the styles
import './Login.css';
import { LOGIN_API } from '../../Constents';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate(); // Initialize useHistory

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        toast.error("Username and password are required.");
        return;
      }

      const response = await axios.post(LOGIN_API, {
        username,
        password,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        localStorage.setItem('access_token', accessToken);
        onLogin();
        toast.success("Login successful!");
        // Call the navigate function to redirect
        navigate('/items');
      } else {
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
