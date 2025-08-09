import type { Metadata } from "next";
import { Inter, Roboto_Mono } from "next/font/google";

import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

// ✅ Use Inter and Roboto Mono from Google Fonts
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Niptado",
  description: "Niptado Consumer Complaint System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${robotoMono.variable} antialiased`}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
