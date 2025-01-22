import type { Metadata } from "next";
import { GeistSans } from 'geist/font/sans';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

export const metadata: Metadata = {
  title: "Gitignore Generator - Create .gitignore Files for Any Project",
  description: "Generate custom .gitignore files instantly for your development projects. Support for 500+ languages and frameworks including Node.js, Python, React, and more.",
  keywords: "gitignore, git ignore generator, github, git, development tools, node gitignore, python gitignore, react gitignore",
  authors: [{ name: "Haseeb Ahmed Raza Khan" }],
  creator: "Haseeb Ahmed Raza Khan",
  publisher: "Haseeb Ahmed Raza Khan",
  openGraph: {
    type: "website",
    url: "https://gitignore-generator.vercel.app",
    title: "Gitignore Generator - Create .gitignore Files for Any Project",
    description: "Generate custom .gitignore files instantly for your development projects. Support for 500+ languages and frameworks.",
    siteName: "Gitignore Generator",
    images: [{
      url: "/og-image.png", // You'll need to create this image
      width: 1200,
      height: 630,
      alt: "Gitignore Generator Preview"
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Gitignore Generator - Create .gitignore Files for Any Project",
    description: "Generate custom .gitignore files instantly for your development projects.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-site-verification", // Add this after setting up Google Search Console
  },
  alternates: {
    canonical: 'https://gitignore-generator.vercel.app',
    languages: {
      'en-US': '/en-US',
    },
  },
  category: 'technology',
  metadataBase: new URL('https://gitignore-generator.vercel.app'),
  other: {
    'google-site-verification': 'your-verification-code',
    'msvalidate.01': 'your-bing-verification-code',
  },
  applicationName: 'Gitignore Generator',
  referrer: 'origin-when-cross-origin',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={GeistSans.className} 
      suppressHydrationWarning
    >
      <head>
        <link rel="canonical" href="https://gitignore-generator.vercel.app" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link 
          rel="preload" 
          href="/logo.png" 
          as="image" 
          type="image/png"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="FPMvDVpfB5Ct27ZXFhx2byEyxCdkcKzytxzN72BRbGE" />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
