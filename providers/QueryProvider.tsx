'use client';

import { QueryClientProvider } from '@tanstack/react-query';

import { PropsWithChildren } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { getQueryClient } from '@/lib/query';

const QueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default QueryProvider;
