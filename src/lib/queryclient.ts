import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      enabled: true,
      refetchOnMount: false, // don't refetch if cache exists
    },
  },
});
