import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/navbar";
import PageTransition from "@/components/page-transition";
import Footer from "@/components/footer";
import BackToTop from "@/components/back-to-top";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  title: "Vriksh Consulting - Helping Businesses Grow",
  description: "Vriksh Consulting provides expert business consulting services including funding, sales enablement, digital solutions, training, and market research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rubik.className} font-sans`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Navbar />
          <PageTransition>
            <main className="min-h-screen">{children}</main>
          </PageTransition>
          <Footer />
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
