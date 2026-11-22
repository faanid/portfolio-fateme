import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { I18nProvider } from "@/lib/i18n/context";
import { Suspense } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fateme Kharazmi — Software Engineer",
  description:
    "Fateme Kharazmi is a software engineer working across frontend development, backend engineering, and interactive systems.",
  keywords: [
    "Fateme Kharazmi",
    "Software Engineer",
    "Frontend Engineering",
    "Backend Development",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Portfolio",
  ],
  authors: [{ name: "Fateme Kharazmi" }],
  creator: "Fateme Kharazmi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fatemedev.com",
    title: "Fateme Kharazmi — Software Engineer",
    description:
      "Building experiences. Engineering possibilities. Explore the work and journey of Fateme Kharazmi.",
    siteName: "Fateme Kharazmi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            <Suspense fallback={null}>
              <main className="min-h-screen">{children}</main>
            </Suspense>
          </I18nProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
