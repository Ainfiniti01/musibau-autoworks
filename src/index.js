import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import './index.css';
import './styles.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from './context/AppContext';
import { HelmetProvider } from 'react-helmet-async';

// Initialize Google Analytics 4
// TODO: Replace with your actual Measurement ID
const GA_MEASUREMENT_ID = "G-XXXXXXXXXX"; 
ReactGA.initialize(GA_MEASUREMENT_ID);
ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search });

const isGitHub = window.location.hostname.includes("github.io");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <AppProvider>
          <App />
      </AppProvider>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
