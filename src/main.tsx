import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';
import './index.css';

const queryClient = new QueryClient(
  // {
  //   defaultOptions: {
  //     queries: {
  //       retry: 3, // Retry failed queries 3 times
  //       cacheTime: 1000 * 60 * 5, // Cache data for 5 minutes. If a query is not used in any component for 5 minutes it will be removed from the cache.
  //       staleTime: 1000 * 10, // Data is considered fresh for 10 seconds. If a query is not used in any component for 10 seconds it will be considered stale and will be refetched when used again.
  //       refetchOnWindowFocus: false, // Do not refetch data when the window is focused. This is useful for performance reasons.
  //       refetchOnReconnect: false, // Do not refetch data when the user reconnects to the internet. This is useful for performance reasons.
  //       refetchOnMount: false, // Do not refetch data when the component is mounted. This is useful for performance reasons.
  //     }
  //   }
  // }
);

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
