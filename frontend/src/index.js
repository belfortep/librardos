import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId='256165484325-2tdsmus7bh8quses6gi7om56251fgpl8.apps.googleusercontent.com'>
    <React.StrictMode>
      <AuthContextProvider>
      <App />
      </AuthContextProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);


