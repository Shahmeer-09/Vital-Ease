import type { Metadata } from "next";
import "./globals.css";
import {Plus_Jakarta_Sans} from 'next/font/google'
import { Toaster } from "sonner";
const fontSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Vitalease",
  description: "A patient Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html style={{colorScheme:"dark"}} lang="en">
      <body className={`${fontSans.variable} bg-dark-300 min-h-screen font-sans antialiased`}>
        <Toaster/>
        {children}
      </body>
    </html>
  );
}


