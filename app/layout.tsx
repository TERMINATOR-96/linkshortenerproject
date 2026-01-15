import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LinkShortener - Shorten Your Links, Amplify Your Reach",
  description: "Create short, memorable links in seconds. Track analytics, customize URLs, and share with confidence. Fast, secure, and reliable link shortening service.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      signInFallbackRedirectUrl="/dashboard"
      signUpFallbackRedirectUrl="/dashboard"
      appearance={{
        layout: {
          socialButtonsPlacement: 'bottom',
          socialButtonsVariant: 'iconButton',
        },
        variables: {
          colorPrimary: '#e5e5e5',
          colorBackground: '#171717',
          colorInputBackground: '#262626',
          colorInputText: '#fafafa',
          colorText: '#fafafa',
          colorTextSecondary: '#a1a1a1',
          colorDanger: '#ff6568',
          colorSuccess: '#00bb7f',
          colorWarning: '#f99c00',
          colorNeutral: '#0a0a0a',
          borderRadius: '0.625rem',
          fontFamily: 'var(--font-geist-sans)',
        },
      }}
    >
      <html lang="en" className="dark">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
