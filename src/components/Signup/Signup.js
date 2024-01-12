import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import { REGISTER_API } from '../../Constents';

const Signup = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate(); // Initialize useHistory


  const handleSignup = async () => {
    try {
      // Validate textfield values
      if (!firstname || !lastname || !username || !password || !confirmPassword) {
        toast.error("All fields are required.");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }

      const FormData = require('form-data');
      let data = new FormData();
      data.append('username', username);
      data.append('password', password);
      data.append('password2', confirmPassword);
      data.append('email', email);
      data.append('first_name', firstname);
      data.append('last_name', lastname);


      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: REGISTER_API,
        data: data
      };

      axios.request(config)
        .then((response) => {
          toast.success("Registration successful!");
          navigate('/login');

        })
        .catch((error) => {
          console.log(error)
          toast.error( JSON.stringify(error.response.data));
        });
      
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
            First Name:
            <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
          </label>
          <label>
            Last Name:
            <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
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
