"use client"
import React, { useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
// import AuthProvider from "@/services/auth/Auth.context";

const Providers = ({ children }: React.PropsWithChildren) => {
  const [queryClient] = useState(new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* <AuthProvider> */}
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      {/* </AuthProvider> */}
    </QueryClientProvider>
  );
}

export default Providers;