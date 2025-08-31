"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  CameraIcon, 
  EyeIcon, 
  XMarkIcon,
  PlayIcon,
  PauseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  StarIcon
} from '@heroicons/react/24/outline';

interface ARVRExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'AR' | 'VR';
  location?: {
    name: string;
    coordinates: [number, number];
    image: string;
    description: string;
  };
}

const ARVRExperience: React.FC<ARVRExperienceProps> = ({
  isOpen,
  onClose,
  mode,
  location
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const views = [
    {
      id: 1,
      name: "Jagannath Temple",
      image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=800&h=600&fit=crop",
      description: "Ancient temple dedicated to Lord Jagannath"
    },
    {
      id: 2,
      name: "Puri Beach",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      description: "Beautiful golden beach with pristine waters"
    },
    {
      id: 3,
      name: "Konark Sun Temple",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=800&h=600&fit=crop",
      description: "Ancient sun temple with stunning architecture"
    }
  ];

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % views.length);
  };

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + views.length) % views.length);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {mode === 'AR' ? (
              <CameraIcon className="w-6 h-6" />
            ) : (
              <EyeIcon className="w-6 h-6" />
            )}
            <div>
              <h2 className="text-xl font-bold">{mode} Experience</h2>
              <p className="text-sm opacity-90">
                {mode === 'AR' ? 'Point your camera at landmarks' : 'Explore in virtual reality'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {mode === 'AR' ? (
            /* AR Experience */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CameraIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  AR Camera View
                </h3>
                <p className="text-gray-600 mb-4">
                  Point your camera at landmarks to see virtual information and directions
                </p>
              </div>

              {/* AR Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Landmark Recognition</h4>
                  <p className="text-sm text-gray-600">
                    Automatically identify temples, beaches, and historical sites
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Virtual Directions</h4>
                  <p className="text-sm text-gray-600">
                    See arrows and paths overlaid on the real world
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Information Overlay</h4>
                  <p className="text-sm text-gray-600">
                    Historical facts and tourist information appear on screen
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Photo Capture</h4>
                  <p className="text-sm text-gray-600">
                    Take photos with AR elements and share them
                  </p>
                </div>
              </div>

              {/* Demo Image */}
              <div className="bg-gray-100 rounded-lg p-4 text-center">
                <img
                  src="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&h=400&fit=crop"
                  alt="AR Demo"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Point camera at Jagannath Temple to see AR overlay
                </p>
              </div>
            </div>
          ) : (
            /* VR Experience */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <EyeIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Virtual Reality Tour
                </h3>
                <p className="text-gray-600 mb-4">
                  Explore destinations in immersive 360° virtual reality
                </p>
              </div>

              {/* VR Viewer */}
              <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                <img
                  src={views[currentView].image}
                  alt={views[currentView].name}
                  className="w-full h-80 object-cover"
                />
                
                {/* VR Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-50 rounded-full px-4 py-2">
                  <button
                    onClick={prevView}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <ArrowLeftIcon className="w-5 h-5 text-white" />
                  </button>
                  
                  <button
                    onClick={handlePlayPause}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    {isPlaying ? (
                      <PauseIcon className="w-5 h-5 text-white" />
                    ) : (
                      <PlayIcon className="w-5 h-5 text-white" />
                    )}
                  </button>
                  
                  <button
                    onClick={nextView}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <ArrowRightIcon className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Location Info */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3 text-white">
                  <h4 className="font-semibold">{views[currentView].name}</h4>
                  <p className="text-sm opacity-90">{views[currentView].description}</p>
                </div>
              </div>

              {/* VR Features */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <MapPinIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">360° Views</h4>
                  <p className="text-xs text-gray-600">Explore every angle</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <StarIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">Interactive</h4>
                  <p className="text-xs text-gray-600">Click to explore</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <EyeIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-800 text-sm">Immersive</h4>
                  <p className="text-xs text-gray-600">Full VR experience</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-4 border-t">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              {mode === 'AR' ? 'AR requires camera access' : 'VR works best with VR headset'}
            </p>
            <button
              onClick={onClose}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close Experience
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ARVRExperience;
