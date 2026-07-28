import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="1071859334413-tn4a5er2m19dlvoj7r4n2ijmks4ivafm.apps.googleusercontent.com">
  <App />
</GoogleOAuthProvider>
  </React.StrictMode>
);

