// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FirebaseContext } from './store/Context';
import { firebaseApp } from './firebase/config';
import Context from './store/Context';

ReactDOM.render(
  <FirebaseContext.Provider value={{ firebase: firebaseApp }}>
    <Context>
    <App />
    </Context>
  </FirebaseContext.Provider>,
  document.getElementById('root')
);
