import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { AuthProvider } from "@/lib/contexts/AuthContext"
import { getSessionUser } from "@/lib/actions/auth/user"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider"
import { Toaster } from "@/components/ui/sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })


export const metadata: Metadata = {
  title: "GabaSeal | Secure Document Management",
  description: "Digitally sign, verify, and manage any type of documents securely with PKI technology",
  openGraph: {
    title: "GabaSeal | Secure Document Management",
    description: "Digitally sign, verify, and manage any type of documents securely with PKI technology",
    type: "website",
    siteName: "GabaSeal",
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
    title: "GabaSeal | Secure Document Management",
    description: "Digitally sign, verify, and manage any type of documents securely with PKI technology",
    images: ["/og-image.jpg"], // Same image as OpenGraph
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const {user} = await getSessionUser();
  // Set up pdfjs worker for client-side usage
  if (typeof window !== "undefined") {
    // @ts-ignore
    const pdfjsLib = await import("pdfjs-dist/build/pdf");
    // @ts-ignore
    pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script src="https://cdn.botpress.cloud/webchat/v3.2/inject.js" defer></script>
        <script src="https://files.bpcontent.cloud/2025/07/19/11/20250719114008-SWXV09C3.js" defer></script>
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ReactQueryProvider>
          <AuthProvider authUser={user} >
          <ThemeProvider attribute="class" forcedTheme="light" enableSystem disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <main className="flex-1">{children}</main>
            </div>
            <Toaster/>
          </ThemeProvider>
          <Analytics />
        </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}



