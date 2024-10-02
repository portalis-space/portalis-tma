"use client"
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "@/contexts/DarkMode.context";
import { AuthProvider } from "@/contexts/Auth.context";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DarkModeProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </DarkModeProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default Providers;