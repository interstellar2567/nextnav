import React from "react";
import {
  RxDiscordLogo,
  RxGithubLogo,
  RxInstagramLogo,
  RxTwitterLogo,
  RxLinkedinLogo,
} from "react-icons/rx";
import { FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="w-full h-full bg-gray-50 text-gray-700 shadow-lg p-[15px] relative overflow-hidden border-t border-gray-200">
      {/* Light-themed background effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-blue-200 opacity-30 blur-3xl top-10 left-20 rounded-full"></div>
        <div className="absolute w-96 h-96 bg-teal-200 opacity-30 blur-3xl bottom-20 right-20 rounded-full"></div>
      </div>

      <div className="w-full flex flex-col items-center justify-center m-auto relative z-10">
        <div className="w-full h-full flex flex-row items-center justify-around flex-wrap">
          {/* Community Section */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px] text-blue-600">Community</div>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <FaYoutube />
              <span className="text-[15px] ml-[6px]">Youtube</span>
            </p>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <RxGithubLogo />
              <span className="text-[15px] ml-[6px]">Github</span>
            </p>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <RxDiscordLogo />
              <span className="text-[15px] ml-[6px]">Discord</span>
            </p>
          </div>

          {/* Social Media Section */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px] text-blue-600">Social Media</div>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <RxInstagramLogo />
              <span className="text-[15px] ml-[6px]">Instagram</span>
            </p>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <RxTwitterLogo />
              <span className="text-[15px] ml-[6px]">Twitter</span>
            </p>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <RxLinkedinLogo />
              <span className="text-[15px] ml-[6px]">Linkedin</span>
            </p>
          </div>

          {/* About Section */}
          <div className="min-w-[200px] h-auto flex flex-col items-center justify-start">
            <div className="font-bold text-[16px] text-blue-600">About</div>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <span className="text-[15px] ml-[6px]">Become Our Sponsor</span>
            </p>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <span className="text-[15px] ml-[6px]">Learn about us</span>
            </p>
            <p className="flex flex-row items-center my-[15px] cursor-pointer hover:text-blue-600 transition-all">
              <span className="text-[15px] ml-[6px]">tourista@gmail.com</span>
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mb-[20px] text-[15px] text-center text-gray-500 mt-8">
          &copy; TOURISTA 2025 Inc. All rights reserved
        </div>
      </div>
    </div>
  );
};

export default Footer;