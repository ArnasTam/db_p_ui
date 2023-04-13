import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { FC, useMemo } from 'react';
import './App.css';
import AuthProvider from 'src/components/auth/auth_provider';
import Router from 'src/components/router/router';

const App: FC = () => {
  const queryClient = useMemo(() => new QueryClient(), []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider>
          <Router />
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
