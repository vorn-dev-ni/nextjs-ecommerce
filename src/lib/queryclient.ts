import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 2,
      refetchOnWindowFocus: false,
      enabled: false,
    },
  },
});
