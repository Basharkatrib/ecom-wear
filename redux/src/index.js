import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from 'react-redux';
import store from './Store/store';
import { GoogleOAuthProvider } from '@react-oauth/google';

// قم بوضع مفتاح Google OAuth Client ID الخاص بك هنا
const googleClientId = '1040196912465-7vkj997a9ct6mljecpa7vsd6homu9pc7.apps.googleusercontent.com';

// إعداد Stripe

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId={googleClientId}>
          <Provider store={store}>
            <App />
          </Provider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
