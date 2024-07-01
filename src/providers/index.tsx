import { ThemeProvider } from '@mui/material/styles';
import React, { PropsWithChildren } from 'react';
import theme from '../theme';
import ReactQueryProvider from './ReactQueryProvider';

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <React.StrictMode>
      <ReactQueryProvider>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ReactQueryProvider>
    </React.StrictMode>
  );
};

export default Providers;
