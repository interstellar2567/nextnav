"use client";
import { useState, useEffect, useRef } from "react";
import { Mic, StopCircle } from "lucide-react";

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
  onDetectRoute: (start: string, destination: string) => void;
  className?: string;
}

// 🔹 Predefined List of Known Locations for Better Recognition
const knownLocations = [
  "Bhubaneswar",
  "Puri",
  "Cuttack",
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Bangalore",
  "Chennai",
  "Hyderabad",
  "Pune",
  "Ahmedabad",
];

const VoiceAssistant: React.FC<VoiceAssistantProps> = ({
  onDetectRoute,
  className = "",
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Cleanup recognition instance on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const startListening = () => {
    if (isListening) {
      stopListening();
      return;
    }

    try {
      recognitionRef.current = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();
      if (!recognitionRef.current) {
        console.error("Speech recognition not supported in this browser");
        return;
      }

      recognitionRef.current.lang = "en-US";
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => setIsListening(false);

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        console.log("User said:", transcript);

        // 🔍 Extract Start & Destination
        const { start, destination } = extractLocations(transcript);

        if (start && destination) {
          onDetectRoute(start, destination);
          speak(`Setting your route from ${start} to ${destination}`);
        } else {
          speak("I couldn't detect the locations. Please try again.");
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech Recognition Error:", event);
        setIsListening(false);
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error("Error initializing speech recognition:", error);
      setIsListening(false);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const speak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <button
      onClick={startListening}
      className={`flex items-center justify-center gap-2 ${
        isListening
          ? "bg-red-500 hover:bg-red-600"
          : "bg-purple-600 hover:bg-purple-500"
      } text-white py-4 rounded-lg font-semibold transition-all shadow-md hover:shadow-purple-400/50 ${className}`}
    >
      {isListening ? (
        <>
          <StopCircle className="w-6 h-6" />
          Listening...
        </>
      ) : (
        <>
          <Mic className="w-6 h-6" />
          Speak Your Destination
        </>
      )}
    </button>
  );
};

export default VoiceAssistant;

/////////////////////////////////////////////////
// ✅ Location Extraction Logic (Below Component)
/////////////////////////////////////////////////

const extractLocations = (text: string) => {
  let start = "";
  let destination = "";

  // 🔍 Regular Expressions for Extracting Locations
  const matches = text.match(
    /(?:from|between)\s+([\w\s]+)\s+(?:to|and)\s+([\w\s]+)/i
  );
  if (matches) {
    start = cleanText(matches[1]);
    destination = cleanText(matches[2]);
  } else {
    // Handle reversed order (e.g., "to Bhubaneswar from Puri")
    const reverseMatches = text.match(/to\s+([\w\s]+)\s+from\s+([\w\s]+)/i);
    if (reverseMatches) {
      start = cleanText(reverseMatches[2]);
      destination = cleanText(reverseMatches[1]);
    }
  }

  // Cross-check with known locations
  start = findClosestMatch(start);
  destination = findClosestMatch(destination);

  return { start, destination };
};

// 🔹 Remove Unnecessary Words & Special Characters
const cleanText = (input: string) => {
  return input.replace(/[^a-zA-Z\s]/g, "").trim();
};

// 🔹 Find Closest Match from Known Locations
const findClosestMatch = (input: string) => {
  const match = knownLocations.find((location) =>
    location.toLowerCase().includes(input.toLowerCase())
  );
  return match || input;
};
