import Link from "next/link";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navigation from "@/components/Navigation";
import "@/app/globals.css";
import Footer from "@/components/ui/Footer";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Greenify - Make Earth Green Again",
  description: "Join the green revolution. Recycle, earn points, and make a difference!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navigation />
          <main className="min-h-screen bg-background">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
