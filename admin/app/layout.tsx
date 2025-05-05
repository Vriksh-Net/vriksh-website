import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  title: "Admin - Vriksh Consulting",
  description:
    "Vriksh Consulting provides expert business consulting services including funding, sales enablement, digital solutions, training, and market research.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} font-sans`}>
        <Navbar />
        <hr />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
