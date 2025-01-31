import React, { Suspense } from "react";
import { Metadata } from "next";
import Providers from "@/utils/Providers";
import { cn } from "@/utils/cn";
import { OpenSans } from "@/fonts/Fonts";
import "./globals.css"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-datepicker/dist/react-datepicker.css";
import Nav from "@/components/organisms/Nav.organism";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: 'Portalis',
  description: 'Portalis',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookies = headers().get('cookie')
  return (
    <html lang="en" className=''>
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={cn(OpenSans.className, "min-h-screen bg-white  dark:bg-black")}>
        <Suspense>
          <Providers cookies={cookies}>
            <div className="w-full md:w-3/4 lg:w-2/3 xl:w-1/2 mx-auto my-0 bg-neutral-100 dark:bg-neutral-900 pt-6 pb-20">
                {children}
              <Nav />
            </div>
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}
