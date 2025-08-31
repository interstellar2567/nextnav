"use client";

import React from "react";
import { motion } from "framer-motion";

const Encryption = () => {
  return (
    <div className="flex flex-col relative items-center justify-center min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-50 to-white">
      {/* Dynamic background with eco-friendly patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.15),transparent)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(6,182,212,0.15),transparent)]"></div>
        
        {/* Leaf particles floating in background */}
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-400 opacity-70"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '0 0 15px 2px rgba(59, 130, 246, 0.3)',
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite alternate`
            }}
          />
        ))}
      </div>
      
      {/* Floating path connections */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
                      <div 
              key={i}
              className="absolute w-px h-16 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 20}s`
            }}
          />
        ))}
      </div>

      {/* Main content with 3D effects */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6 max-w-6xl mx-auto">
        {/* Main 3D Title with enhanced depth effect */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative text-center mb-16 w-full perspective-[1000px]"
        >
          <div 
            className="transform-gpu rotate-x-12 transition-all duration-700 hover:rotate-x-2 cursor-default"
          >
            <h1 className="text-[3.5rem] md:text-[6rem] font-black uppercase tracking-tighter
                           text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500
                           [text-shadow:0_8px_30px_rgba(59, 130, 246, 0.7)] mb-2">
              <div className="relative inline-block">
                <span className="absolute -top-1 -left-1 text-blue-400 opacity-50 blur-[2px]">ECO</span>
                <span className="absolute -bottom-1 -right-1 text-blue-400 opacity-50 blur-[2px]">ECO</span>
                <span className="relative">ECO</span>
              </div>{" "}
              <div className="relative inline-block">
                <span className="absolute -top-1 -left-1 text-blue-400 opacity-50 blur-[2px]">ROUTES</span>
                <span className="absolute -bottom-1 -right-1 text-blue-400 opacity-50 blur-[2px]">ROUTES</span>
                <span className="relative">ROUTES</span>
              </div>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mt-2 relative">
              <span className="absolute -top-px -left-px text-gray-400 blur-[1px]">AI-Powered Carbon Reduction Path Prediction</span>
              <span className="relative">AI-Powered Carbon Reduction Path Prediction</span>
            </p>
          </div>
        </motion.div>
        
        {/* Floating 3D Cards with Carbon Reduction Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mx-auto">
          {[
            {
              title: "Carbon Tracking",
              description: "Real-time monitoring of carbon emissions saved on every journey you take",
              icon: "🌿",
              color: "from-blue-100/80 to-blue-200/80",
              border: "border-blue-300/50",
              shadow: "shadow-blue-200/30",
              highlight: "blue-600"
            },
            {
              title: "Smart Routing",
              description: "AI algorithms that optimize both time efficiency and environmental impact",
              icon: "🧠",
              color: "from-teal-100/80 to-teal-200/80",
              border: "border-teal-300/50",
              shadow: "shadow-teal-200/30",
              highlight: "teal-600"
            },
            {
              title: "Emission Insights",
              description: "Personalized analytics showing your contribution to a cleaner planet",
              icon: "📊",
              color: "from-cyan-100/80 to-cyan-200/80",
              border: "border-cyan-300/50",
              shadow: "shadow-cyan-200/30",
              highlight: "cyan-600"
            }
          ].map((card, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.7 }}
              className={`backdrop-blur-md bg-gradient-to-br ${card.color} p-6 rounded-xl border ${card.border} 
                        shadow-xl ${card.shadow} overflow-hidden group relative perspective-[1000px]`}
            >
              {/* Card with 3D hover effect */}
              <div className="transform-gpu transition-transform duration-500 group-hover:rotate-y-3 group-hover:rotate-x-3 h-full">
                {/* Glass surface reflections */}
                <div className="absolute -inset-full top-0 right-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[1000%] skew-x-12 group-hover:animate-[shine_2.5s_ease_forwards]"></div>
                
                {/* Icon with floating animation */}
                <div className="text-5xl mb-4 relative w-16 h-16 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-transparent to-black/20"></div>
                  <span className="relative animate-float-slow">{card.icon}</span>
                </div>
                
                {/* Title with 3D text effect */}
                <h3 className={`text-${card.highlight} text-2xl font-bold mb-3 relative`}>
                  <span className="absolute -top-px -left-px text-white/20 blur-[1px]">{card.title}</span>
                  <span className="relative">{card.title}</span>
                </h3>
                
                <p className="text-gray-600 text-sm relative">
                  {card.description}
                </p>
                
                {/* Animated corner accents */}
                <div className={`absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-${card.highlight} opacity-70`}></div>
                <div className={`absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-${card.highlight} opacity-70`}></div>
                <div className={`absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-${card.highlight} opacity-70`}></div>
                <div className={`absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-${card.highlight} opacity-70`}></div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Route Visualization with Carbon Impact */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="w-full max-w-3xl mx-auto mt-16 perspective-[1200px]"
        >
          <div className="relative h-48 transform-gpu rotate-x-30 hover:rotate-x-20 transition-transform duration-700">
            {/* Route comparison */}
            <div className="absolute left-[10%] right-[10%] top-1/3 h-1 bg-red-500/50 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.4)]"></div>
            <div className="absolute left-[10%] right-[10%] top-2/3 h-1.5 bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 transform rounded-full overflow-hidden shadow-[0_0_15px_rgba(59,130,246,0.6)]">
              {/* Animated eco route elements */}
              <div className="absolute h-full w-16 bg-white/30 animate-[data-flow_3s_linear_infinite]"></div>
              <div className="absolute h-full w-8 bg-white/20 animate-[data-flow_2.5s_linear_infinite_0.7s]"></div>
              <div className="absolute h-full w-12 bg-white/25 animate-[data-flow_3.2s_linear_infinite_1.5s]"></div>
            </div>
            
            {/* Start/End points */}
            <div className="absolute top-1/3 left-[10%] w-4 h-4 rounded-full bg-white border-2 border-red-500 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-1/3 right-[10%] w-4 h-4 rounded-full bg-white border-2 border-red-500 transform translate-x-1/2 -translate-y-1/2"></div>
            
            <div className="absolute top-2/3 left-[10%] w-4 h-4 rounded-full bg-white border-2 border-blue-500 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-2/3 right-[10%] w-4 h-4 rounded-full bg-white border-2 border-blue-500 transform translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Route labels */}
            <div className="absolute top-1/3 left-[5%] text-xs text-red-400 transform -translate-y-6">
              Standard Route
            </div>
            <div className="absolute top-2/3 left-[5%] text-xs text-blue-600 transform -translate-y-6">
              Eco Route
            </div>
            
            {/* Carbon emissions comparison */}
            <div className="absolute top-1/3 right-[5%] text-xs text-red-400 transform -translate-y-6">
              +2.8kg CO₂
            </div>
            <div className="absolute top-2/3 right-[5%] text-xs text-blue-600 transform -translate-y-6">
              -42% emissions
            </div>
            
            {/* Route waypoints */}
            {[30, 50, 70].map((position, i) => (
              <React.Fragment key={i}>
                <div className="absolute top-1/3 w-2 h-2 rounded-full bg-red-400/70 transform -translate-y-1/2" 
                     style={{ left: `${position}%` }}></div>
                <div className="absolute top-2/3 w-2 h-2 rounded-full bg-blue-400/70 transform -translate-y-1/2" 
                     style={{ left: `${position}%` }}></div>
              </React.Fragment>
            ))}
          </div>
        </motion.div>
        
        {/* Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.7 }}
          className="w-full max-w-4xl mt-8 grid grid-cols-3 gap-4"
        >
          {[
            { value: "30%", label: "Lower Carbon Footprint", color: "blue" },
            { value: "25%", label: "Faster Routes", color: "teal" },
            { value: "40%", label: "Energy Efficient", color: "cyan" }
          ].map((stat, i) => (
            <div key={i} className={`bg-${stat.color}-100/80 backdrop-blur-sm border border-${stat.color}-300/50 rounded-lg p-4 flex flex-col items-center
                                    transform transition-transform duration-300 hover:scale-105 hover:shadow-lg hover:shadow-${stat.color}-200/30`}>
              <div className={`text-${stat.color}-600 text-2xl font-bold mb-2 relative`}>
                <span className="absolute -top-px -left-px blur-[1px] opacity-70">{stat.value}</span>
                <span className="relative">{stat.value}</span>
              </div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
        
        {/* CTA Button with 3D effect */}
        <motion.button
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12 px-10 py-4 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full text-white font-medium text-lg
                   relative overflow-hidden group transition-all duration-300 transform-gpu
                   hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-105"
        >
          <span className="relative z-10">Find Your Eco Route</span>
          
          {/* Button hover effects */}
          <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
          <span className="absolute -inset-full top-0 left-1/2 w-1/4 z-0 transform -translate-x-1/2 bg-white/20 skew-x-12 h-full 
                         transition-transform duration-700 ease-in-out group-hover:left-full"></span>
          <span className="absolute inset-0 rounded-full border border-white/30 blur-[1px] group-hover:opacity-0 transition-opacity duration-300"></span>
        </motion.button>
      </div>
      
      {/* Footer info */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-gray-500 text-xs">
        <div>Eco-friendly routing • Carbon reduction • Sustainable choices</div>
        <div>AI-powered • Route optimization • Carbon tracking</div>
      </div>
    </div>
  );
};

export default Encryption;