// app/layout.tsx - Updated with new color scheme
import { Inter } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Klay | Generative UI Platform",
  description: "The interface that shapeshifts to your intent. Describe the tool you need. Klay builds the UI instantly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="antialiased bg-white text-gray-900 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
