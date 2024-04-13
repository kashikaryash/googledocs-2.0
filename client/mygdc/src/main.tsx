window.global ||= window;
import 'global';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import React from 'react';
import ReactDOM from 'react-dom';
import Register from './pages/register';
import { AuthProvider } from './contexts/auth-context';
import { ToastProvider } from './contexts/toast-context';
import VerifyEmail from './pages/user/verify-email';
import AuthRoute from './components/molecules/auth-route';
import Create from './pages/document/create';
import { DocumentProvider } from './contexts/document-context';
import { EditorProvider } from './contexts/editor-context';
import Document from './pages/document'; // Import the Document component

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path="/user/verify-email/:token" element={<VerifyEmail />} />
            <Route
              path="/document/create"
              element={<AuthRoute element={<Create />} />}
            />
            <Route
              path="/document/:id"
              element={
                <AuthRoute
                  element={
                    <DocumentProvider>
                      <EditorProvider>
                        <Document />
                      </EditorProvider>
                    </DocumentProvider>
                  }
                />
              }
            />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
