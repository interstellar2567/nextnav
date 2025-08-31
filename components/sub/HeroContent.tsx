"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const HeroContent = () => {
  return (
    <motion.div
     id="hero-content"
      initial="hidden"
      animate="visible"
      className="flex flex-row items-center justify-center px-20 mt-40 w-full z-[20]"
    >
      <div className="h-full w-full flex flex-col gap-5 justify-center m-auto text-start">
        <motion.div
          variants={slideInFromTop}
          className="Welcome-box py-[8px] px-[7px] border border-blue-200 opacity-[0.9] bg-white/20 backdrop-blur-sm"
        >
          <SparklesIcon className="text-blue-500 mr-[10px] h-5 w-5" />
          <h1 className="text-blue-700 text-[13px] font-semibold">Advanced-AI Based Route</h1>
        </motion.div>

        <motion.div
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-6 mt-6 text-6xl font-bold text-gray-800 max-w-[600px] w-auto h-auto"
        >
          <span>
            <span className="text-6xl font-extrabold">
              Providing
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                {" "}
                Best Way To{" "}
              </span>
            </span>
            <br />
            <span className="text-5xl font-bold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-cyan-500">
                Destination...
              </span>
            </span>
            <br />
            <span className="text-5xl font-semibold">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                Navigating Smarter,
              </span>
            </span>
            <br />
            <span className="text-5xl font-medium">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                Arriving Faster!
              </span>
            </span>
          </span>
        </motion.div>
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-600 my-5 max-w-[600px] font-light leading-relaxed"
        >
          We&apos;re skilled in providing the best route for the user to reach
          their destination. We provide the best route through our
          <span className="font-semibold text-blue-600"> Advanced AI-System</span>
        </motion.p>
        <motion.div
          variants={slideInFromLeft(1)}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="/getstart"
            className="py-3 px-8 bg-blue-600 text-center text-white cursor-pointer rounded-lg font-bold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Get Started
          </a>
          <a
            href="/dashboard"
            className="py-3 px-8 border-2 border-blue-600 text-blue-600 text-center cursor-pointer rounded-lg font-bold hover:bg-blue-50 transition-all duration-300"
          >
            View Dashboard
          </a>
        </motion.div>
      </div>
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center"
      >
        {/* Image placeholder */}
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
