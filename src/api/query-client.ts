import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 0,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
