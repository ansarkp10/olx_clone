// src/Components/Signup/Signup.js
import React, { useState, useContext } from 'react';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function Signup() {
  const history = useHistory()
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const { firebase } = useContext(FirebaseContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result) => {
      console.log("User created:", result.user);
      result.user.updateProfile({ displayName: username }).then(() => {
        firebase.firestore().collection('olxusers').add({
          id: result.user.uid,
          username: username,
          phone: phone,
        }).then(() => {
          console.log("Document added to Firestore");
          history.push("/login");
        }).catch((error) => {
          console.error("Error adding document to Firestore: ", error);
        });
      }).catch((error) => {
        console.error("Error updating profile: ", error);
      });
    }).catch((error) => {
      console.error("Error creating user: ", error);
    });
  };

  return (
    <div>
      <div className="signupParentDiv">
      <img width="200px" height="200px" src={Logo} alt="OLX logo" style={{ display: 'block', margin: 'auto' }} />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="fname"
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            id="phone"
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
          />
          <br />
          <button type="submit">Signup</button>
        </form>
        <a href="/login">Login</a>
      </div>
    </div>
  );
}
