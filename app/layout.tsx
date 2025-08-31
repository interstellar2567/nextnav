import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import Footer from "@/components/main/Footer";
import "../styles/globals.css"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

 
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TOURISTA - Smart Travel Navigation",
  description: "Advanced AI-based route optimization for seamless travel experiences",
};

export default function RootLayout({ children,}: {
  children: React.ReactNode; }) {

  return (
    <ClerkProvider signInUrl="/sign-in">
    <html lang="en">
      <body
        className={`${inter.className} bg-white overflow-y-scroll overflow-x-hidden`}
      >
        <StarsCanvas />
        <Navbar />
        {/* Authentication buttons moved to Navbar component */}
        {children}
        <Footer />
      </body>
    </html>
    </ClerkProvider>
  );
}
