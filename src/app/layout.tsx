import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Providers from '@/utils/Providers';
import { cn } from '@/utils/cn';
import { OpenSans } from '@/fonts/Fonts';
import Header from '@/components/organisms/Header.organism';

import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
    <html lang="en" className=''>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={cn(OpenSans.className, "min-h-screen bg-neutral-50 dark:bg-neutral-950")}>
        <Suspense>
          <Providers>
            <Header />
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-0 bg-neutral-100 dark:bg-neutral-900">
              {children}
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
