import React from 'react';
import { Metadata } from 'next';

import './globals.css'
import Providers from '@/utils/Providers';
import { cn } from '@/utils/cn';
import { OpenSans } from '@/fonts/Fonts';

export const metadata: Metadata = {
  title: 'Portalis',
  description: 'Portalis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={cn(OpenSans.className, "min-h-screen")}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
