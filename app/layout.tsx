import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: "Insight | Secure Document Management",
  description: "Digitally sign, verify, and manage any type of documents securely with PKI technology",
  openGraph: {
    title: "Insight | Secure Document Management",
    description: "Digitally sign, verify, and manage any type of documents securely with PKI technology",
    type: "website",
    siteName: "Insight",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg", // You'll need to add this image to your public folder
        width: 1200,
        height: 630,
        alt: "Digitally sign, verify, and manage any type of documents securely",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Insight | Secure Document Management",
    description: "Digitally sign, verify, and manage any type of documents securely with PKI technology",
    images: ["/og-image.jpg"], // Same image as OpenGraph
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" defer></script>
        <script src="https://files.bpcontent.cloud/2025/07/19/11/20250719114008-SWXV09C3.js" defer></script>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="flex min-h-screen flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

import "./globals.css"
