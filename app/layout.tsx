import "@/styles/globals.css"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { SiteHeader } from "@/components/site-header"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import getCurrentUser from "./actions/getCurrentUser"
import QueryWrapper from "@/components/QueryWrapper"
import Footer from "@/components/footer"
import Script from 'next/script';
import Toasters from "@/components/Toaser"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {

  const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_API_KEY}&autoload=false`;
  const currentUser = await getCurrentUser();

  return (
    <>
      <html lang="ko" suppressHydrationWarning>
        <head />
        <QueryWrapper>
          <body
            className={cn(
              "min-h-screen bg-background font-sans antialiased",
              fontSans.variable
            )}
          >
            <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div className="relative flex min-h-screen flex-col">
                <Toasters />
                <SiteHeader currentUser={currentUser} />
                <div className="flex-1">{children}</div>
                <Footer />
              </div>
              <TailwindIndicator />
            </ThemeProvider>
          </body>
        </QueryWrapper>
      </html>
    </>
  )
}
