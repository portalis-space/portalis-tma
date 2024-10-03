import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Providers from '@/utils/Providers';
import { cn } from '@/utils/cn';
import { OpenSans } from '@/fonts/Fonts';
import './globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Nav from '@/components/organisms/Nav.organism';

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
      <body className={cn(OpenSans.className, "min-h-screen bg-primary-blue-100  dark:bg-primary-blue-900")}>
        <Suspense>
          <Providers>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-0 bg-primary-blue-400 dark:bg-neutral-950 pt-6 pb-20">
                {children}
              <Nav />
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
