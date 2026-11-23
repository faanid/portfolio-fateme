import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { Suspense } from "react";
import "./globals.css";
import "./pixel-adventure.css";

export const metadata: Metadata = {
  title: "Fateme Kharazmi — A Pixel Adventure Portfolio",
  description:
    "Explore Fateme Kharazmi’s work, experience and skills through a nostalgic side-scrolling pixel adventure.",
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Portfolio",
    "Web Development",
  ],
  authors: [{ name: "Fateme Kharazmi" }],
  creator: "Fateme Kharazmi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fatemedev.com",
    title: "Fateme Kharazmi - Frontend Developer Portfolio",
    description:
      "Frontend Developer with 3+ years experience in React.js, Next.js, and TypeScript.",
    siteName: "Fateme Kharazmi Portfolio",
  },
  generator: "v0.app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <Suspense fallback={null}>
              <div className="relative flex min-h-screen flex-col">
                <main className="flex-1">{children}</main>
              </div>
            </Suspense>
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
