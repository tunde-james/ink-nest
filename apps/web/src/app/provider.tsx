'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface ProviderProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

function Provider({ children }: ProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Provider;
