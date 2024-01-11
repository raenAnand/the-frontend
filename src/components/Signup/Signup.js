// src/components/Signup/Signup.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Validate textfield values
      if (!username || !password || !confirmPassword) {
        toast.error("All fields are required.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      // Call API for signup
      // Replace 'your_signup_api_endpoint' with your actual signup API endpoint
      // Replace the payload structure according to your API requirements
      const response = await fetch('your_signup_api_endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      // Check if API call is successful
      if (response.ok) {
        // Show success message using toast
        toast.success("Registration successful!");

        // Move to Login screen (You might want to use react-router or other navigation methods)
      } else {
        // On API failure, handle error
        const errorData = await response.json();
        toast.error(errorData.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('An unexpected error occurred.');
    }
  };

  return (
    <div className="center-container">
      <div className="signup-container">
        <Link to="/login" className="back-link">&#8592; Back to Login</Link>
        <h2>Signup</h2>
        <form className="signup-form">
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
          <label>
            Confirm Password:
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          </label>
          <br />
          <button type="button" onClick={handleSignup}>Signup</button>
        </form>

        {/* ToastContainer for displaying messages */}
        <ToastContainer />
      </div>
    </div>
  );
};

export default Signup;
