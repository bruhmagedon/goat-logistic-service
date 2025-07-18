import { apiQueryClient } from '@/shared/api/query-client';
import { ThemeProvider } from '@/shared/hooks/useTheme/ThemeProviders';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider>
      <QueryClientProvider client={apiQueryClient}>{children}</QueryClientProvider>
      <Toaster richColors />
    </ThemeProvider>
  );
}
