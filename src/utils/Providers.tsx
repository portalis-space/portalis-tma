"use client"
import React, { ReactNode, useEffect, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DarkModeProvider } from "@/contexts/DarkMode.context";
import { AuthProvider } from "@/contexts/Auth.context";
// WalletConnect Wagmi
import { wagmiAdapter, projectId } from '@/config'
import { createAppKit } from '@reown/appkit/react' 
import { mainnet, polygon } from '@reown/appkit/networks'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'
import { ContractProvider } from "@/contexts/Contract.context";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

if (!projectId) {
  throw new Error('Project ID is not defined')
}
const metadata = {
  name: 'Portalis',
  description: 'Portalis App',
  url: process.env.NEXT_PUBLIC_APP_URL || 'https://portalis.vercel.app', // origin must match your domain & subdomain
  icons: [`${process.env.NEXT_PUBLIC_APP_URL}/assets/portalis-icon.png`]
}
// Create the modal
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [mainnet, polygon],
  defaultNetwork: mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
  featuredWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96', // METAMASK
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0' // TRUSTWALLET
  ]
})
// End WalletConnect Wagmi

const Providers = ({ children, cookies }: { children: ReactNode; cookies: string | null }) => {
  const [queryClient] = useState(new QueryClient());
  const initialState = cookieToInitialState(wagmiAdapter.wagmiConfig as Config, cookies);

  // GLOBAL MODAL
  useEffect(() => {
    const modalRootId = 'modal-root';
    let modalRoot = document.getElementById(modalRootId);

    // If modal-root doesn't exist, create it
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = modalRootId;
      document.body.appendChild(modalRoot);
    }

    return () => {
      // Safely remove modal-root only if it exists in the body
      const modalRootInBody = document.getElementById(modalRootId);
      if (modalRootInBody && modalRootInBody.parentElement === document.body) {
        document.body.removeChild(modalRootInBody);
      }
    };
  }, []);

  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig as Config} initialState={initialState}>
      <TonConnectUIProvider manifestUrl={`${process.env.NEXT_PUBLIC_APP_URL}${process.env.NEXT_PUBLIC_TON_MANIFEST_PATH}`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ContractProvider>
              <DarkModeProvider>
                {children}
                <ReactQueryDevtools initialIsOpen={false} />
              </DarkModeProvider>
            </ContractProvider>
          </AuthProvider>
        </QueryClientProvider>
      </TonConnectUIProvider>
    </WagmiProvider>
  );
}

export default Providers;