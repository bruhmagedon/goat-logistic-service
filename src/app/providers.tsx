import { apiQueryClient } from '@/shared/api/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return <QueryClientProvider client={apiQueryClient}>{children}</QueryClientProvider>;
}
