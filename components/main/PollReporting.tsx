import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button, Card, CardContent } from "@mui/material";
import { Report, Place } from "@mui/icons-material";
import LiveStatusPage from "./LiveStatusPage";
import PollPage from "./PollPage";

// Floating animation for planets/stars
const floatingAnimation = {
  initial: { y: 0 },
  animate: {
    y: [0, -15, 0],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

// Shooting stars animation
const shootingStarAnimation = {
  initial: { opacity: 0, x: 100 },
  animate: {
    opacity: [0, 1, 0],
    x: [-100, 100],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  },
};

// Glow effect for buttons
const buttonEffect = {
  whileHover: { scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.6)" },
  whileTap: { scale: 0.95 },
};

const PollAndLiveStatus = () => {
  const [currentView, setCurrentView] = useState("poll");
  const [pollData, setPollData] = useState([]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-black via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Floating Planets */}
      <motion.div
        {...floatingAnimation}
        className="absolute w-64 h-64 bg-blue-500 opacity-30 rounded-full -top-32 left-20"
      />
      <motion.div
        {...floatingAnimation}
        className="absolute w-48 h-48 bg-purple-400 opacity-30 rounded-full bottom-20 right-32"
      />

      {/* Shooting Stars */}
      <motion.div
        {...shootingStarAnimation}
        className="absolute w-2 h-16 bg-white opacity-40 rounded-full top-10 right-10"
      />
      <motion.div
        {...shootingStarAnimation}
        className="absolute w-1 h-12 bg-gray-300 opacity-50 rounded-full top-40 left-20"
      />

      {/* Main Content */}
      <div className="w-full max-w-3xl mx-auto p-6 relative z-10">
        <div className="flex justify-center space-x-4 mb-8">
          <motion.div {...buttonEffect}>
            <Button
              onClick={() => setCurrentView("poll")}
              variant={currentView === "poll" ? "contained" : "outlined"}
              startIcon={<Report />}
              className="rounded-xl px-8 py-4 font-bold shadow-2xl text-white"
              sx={{
                "&.MuiButton-contained": {
                  background:
                    "linear-gradient(135deg, #9333ea 0%, #4c1d95 100%)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(147, 51, 234, 0.8)",
                },
              }}
            >
              Report Conditions
            </Button>
          </motion.div>
          <motion.div {...buttonEffect}>
            <Button
              onClick={() => setCurrentView("status")}
              variant={currentView === "status" ? "contained" : "outlined"}
              startIcon={<Place />}
              className="rounded-xl px-8 py-4 font-bold shadow-2xl text-white"
              sx={{
                "&.MuiButton-contained": {
                  background:
                    "linear-gradient(135deg, #06b6d4 0%, #0284c7 100%)",
                  color: "white",
                  boxShadow: "0 0 20px rgba(23, 166, 191, 0.8)",
                },
              }}
            >
              Live Status
            </Button>
          </motion.div>
        </div>

        {/* Page Transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20, rotateX: -5 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -20, rotateX: 5 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
            {currentView === "poll" ? (
              <PollPage />
            ) : (
              <LiveStatusPage  />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PollAndLiveStatus;
