import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'; // For navigation
import Logo from '../../olx-logo.png';
import './Login.css';
import { FirebaseContext } from '../../store/Context'; // Assuming Firebase is set up

function Login() {
  const history = useHistory(); // Initialize useHistory for navigation
  const { firebase } = useContext(FirebaseContext); // Access Firebase context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // For handling errors

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    // Firebase authentication logic
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log("User logged in successfully");
        history.push('/'); // Redirect to Home page after successful login
      })
      .catch((err) => {
        console.error("Login error:", err);
        setError("Invalid email or password"); // Display error message
      });
  };

  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo} alt="OLX logo" />
        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Update email state
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
          <br />
          <br />
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
        <a href="/signup">Signup</a>
      </div>
    </div>
  );
}

export default Login;
