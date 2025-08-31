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
  StarIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon
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
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  const videos = [
    {
      id: 1,
      name: "Temple Tour Video 1",
      src: "/WhatsApp Video 2025-08-31 at 07.29.00_aabc3adf.mp4",
      description: "Explore the majestic Jagannath Temple"
    },
    {
      id: 2,
      name: "Temple Tour Video 2", 
      src: "/WhatsApp Video 2025-08-31 at 07.29.00_1bd3072b.mp4",
      description: "Discover the spiritual atmosphere"
    },
    {
      id: 3,
      name: "Temple Tour Video 3",
      src: "/WhatsApp Video 2025-08-31 at 07.29.00_3276b93d.mp4", 
      description: "Experience the divine presence"
    }
  ];

  const audioBook = {
    name: "Puri Jagannath Temple Full Story",
    src: "/Puri Jagannath Temple Full Story in English _History Miracles_Other Details _Neel Madhav_Odisha - .mp3",
    description: "Complete history and miracles of Jagannath Temple"
  };

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

  const handleAudioPlayPause = () => {
    if (audioRef.current) {
      if (isAudioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsAudioPlaying(!isAudioPlaying);
    }
  };

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % views.length);
  };

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + views.length) % views.length);
  };

  const nextVideo = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
    setIsPlaying(false);
  };

  const prevVideo = () => {
    setCurrentVideo((prev) => (prev - 1 + videos.length) % videos.length);
    setIsPlaying(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden"
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {mode === 'AR' ? (
            /* AR Experience with Videos */
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <VideoCameraIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  AR Video Experience
                </h3>
                <p className="text-gray-600 mb-4">
                  Watch immersive videos of tourist destinations
                </p>
              </div>

              {/* Video Player */}
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  src={videos[currentVideo].src}
                  className="w-full h-80 object-cover"
                  onEnded={() => setIsPlaying(false)}
                />
                
                {/* Video Controls */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-black bg-opacity-50 rounded-full px-4 py-2">
                  <button
                    onClick={prevVideo}
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
                    onClick={nextVideo}
                    className="p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-colors"
                  >
                    <ArrowRightIcon className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Video Info */}
                <div className="absolute top-4 left-4 bg-black bg-opacity-50 rounded-lg p-3 text-white">
                  <h4 className="font-semibold">{videos[currentVideo].name}</h4>
                  <p className="text-sm opacity-90">{videos[currentVideo].description}</p>
                </div>
              </div>

              {/* Video Navigation */}
              <div className="grid grid-cols-3 gap-4">
                {videos.map((video, index) => (
                  <button
                    key={video.id}
                    onClick={() => {
                      setCurrentVideo(index);
                      setIsPlaying(false);
                    }}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      currentVideo === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <VideoCameraIcon className="w-6 h-6 text-gray-600 mb-2" />
                    <div className="text-sm font-medium text-gray-800">{video.name}</div>
                    <div className="text-xs text-gray-500">{video.description}</div>
                  </button>
                ))}
              </div>

              {/* Audio Book Section */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 text-lg">Audio Guide</h4>
                    <p className="text-sm text-gray-600">{audioBook.description}</p>
                  </div>
                  <button
                    onClick={handleAudioPlayPause}
                    className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    {isAudioPlaying ? (
                      <SpeakerXMarkIcon className="w-5 h-5" />
                    ) : (
                      <SpeakerWaveIcon className="w-5 h-5" />
                    )}
                    {isAudioPlaying ? 'Pause Audio' : 'Play Audio Guide'}
                  </button>
                </div>
                <audio
                  ref={audioRef}
                  src={audioBook.src}
                  onEnded={() => setIsAudioPlaying(false)}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  <strong>{audioBook.name}</strong> - Complete history and miracles of the Jagannath Temple
                </div>
              </div>

              {/* AR Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Video Tours</h4>
                  <p className="text-sm text-gray-600">
                    Watch immersive videos of temples and landmarks
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Audio Guides</h4>
                  <p className="text-sm text-gray-600">
                    Listen to detailed stories and historical information
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Interactive Controls</h4>
                  <p className="text-sm text-gray-600">
                    Navigate between different videos and audio content
                  </p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">Immersive Experience</h4>
                  <p className="text-sm text-gray-600">
                    Feel like you're actually at the destination
                  </p>
                </div>
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
              {mode === 'AR' ? 'AR includes videos and audio guides' : 'VR works best with VR headset'}
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
