import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Navigation from "@/components/Navigation";
import "@/app/globals.css";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <div className="min-h-screen bg-background">{children}</div>
      <Footer />
    </ThemeProvider>
  );
}
