import React from 'react';
import { AuthProvider } from './auth';
import { ToastProvider } from './toast';

const AppProvider: React.FC<any> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
);

export default AppProvider;
