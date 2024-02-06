'use client';
import { ThemeProvider, createTheme } from '@mui/material';
import React, { ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: "#121212"
      }
    },
  });

  return (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  )
};

export default AuthLayout;
