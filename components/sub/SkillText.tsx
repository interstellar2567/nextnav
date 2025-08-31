"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "../../utils/motion";
import { SparklesIcon } from "@heroicons/react/24/solid";

const SkillText = () =>{
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <motion.div
        variants={slideInFromTop}
        className="Welcome-box py-[8px] px-[7px] border border-blue-200 opacity-[0.9] bg-white/20 backdrop-blur-sm"
      >
        <SparklesIcon className="text-blue-500 mr-[10px] h-5 w-5" />
        <h1 className="Welcome-text text-[13px]">
          Think best with our AI-Driven System!
        </h1>
      </motion.div>
      <motion.div
        variants={slideInFromLeft(0.5)}
        className="text-[30px] text-gray-800 font-medium mt-[10px] text-center mb-[15px]"
      >
        Made with Modern Technologies
      </motion.div>
      <motion.div
        variants={slideInFromRight(0.5)}
        className="cursive text-[20px] text-gray-600 mb-10 mt-[10px] text-center"
      >
        Never misses
      </motion.div>
    </div>
  );
};

export default SkillText;
