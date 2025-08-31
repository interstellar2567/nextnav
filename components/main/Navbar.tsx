"use client";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full h-[65px] fixed top-0 shadow-lg shadow-gray-200/50 bg-white/90 backdrop-blur-md z-50 px-4 sm:px-10 border-b border-gray-100">
      <div className="w-full h-full flex flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <Link
          href="/"
          className="h-auto w-auto flex flex-row items-center group"
        >
          <Image
            src="/NavLogo.png"
            alt="logo"
            width={70}
            height={70}
            className="cursor-pointer group-hover:animate-spin transition-transform duration-500"
          />
          <span className="text-4xl font-bold ml-[10px] hidden md:block bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent group-hover:from-blue-700 group-hover:to-teal-600 transition-colors">
            TOURISTA
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
          <nav className="flex items-center gap-6 bg-white/80 px-6 py-2 rounded-full text-gray-700 border border-gray-200 shadow-md">
            <Link
              href="/about"
              className="text-sm font-medium hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wider"
            >
              About
            </Link>
            <Link
              href="/getstart"
              className="text-sm font-medium hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wider"
            >
              Get Started
            </Link>
            <Link
              href="/booking"
              className="text-sm font-medium hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wider"
            >
              Booking
            </Link>
            <Link
              href="/emergency"
              className="text-sm font-medium hover:text-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wider"
            >
              Emergency
            </Link>
            <Link
              href="/sos"
              className="text-sm font-medium hover:text-red-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wider"
            >
              SOS
            </Link>
            <Link
              href="/navigation"
              className="text-sm font-medium hover:text-blue-600 transition-all duration-300 ease-in-out transform hover:scale-105 hover:tracking-wider"
            >
              Navigation
            </Link>
          </nav>
        </div>

        {/* Authentication Buttons */}
        <div className="flex items-center space-x-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="bg-blue-600 text-white px-5 py-1 rounded-md text-md shadow-md transition-all 
                hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50
                active:scale-95 group"
              >
                <span className="block group-active:translate-y-0.5 transition-transform">
                  Sign In
                </span>
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              Dashboard
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox:
                    "w-10 h-10 hover:scale-110 transition-transform duration-300 cursor-pointer",
                },
              }}
            />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
