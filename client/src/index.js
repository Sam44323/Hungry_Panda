import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.module.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const app = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));
