"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  CameraIcon,
  EyeIcon,
  PlayIcon,
  PauseIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  StarIcon,
  ArrowsPointingOutIcon
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
  selectedVideoId?: number | null;
}

const ARVRExperience: React.FC<ARVRExperienceProps> = ({
  isOpen,
  onClose,
  mode,
  location,
  selectedVideoId = null
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
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
  
  useEffect(() => {
    if (selectedVideoId !== null) {
      const index = videos.findIndex(video => video.id === selectedVideoId);
      if (index !== -1) {
        setCurrentView(index);
        setIsPlaying(false);
        // Automatically enter fullscreen when AR view opens
        if (videoRef.current && !document.fullscreenElement) {
          videoRef.current.requestFullscreen().catch(err => {
            console.error('Error attempting to enable fullscreen:', err);
          });
        }
      }
    }
  }, [selectedVideoId]);

  const videos = [
    {
      id: 1,
      name: "Konark Temple Video",
      src: "/WhatsApp Video 2025-08-31 at 07.29.00_1bd3072b.mp4",
      description: "Explore the magnificent Konark Sun Temple"
    },
    {
      id: 2,
      name: "Puri Temple Video",
      src: "/WhatsApp Video 2025-08-31 at 07.29.00_3276b93d.mp4",
      description: "Discover the sacred Jagannath Temple in Puri"
    },
    {
      id: 3,
      name: "Lingraj Temple Video",
      src: "/WhatsApp Video 2025-08-31 at 07.29.00_aabc3adf.mp4",
      description: "Experience the ancient Lingraj Temple"
    }
  ];

  // Audiobook data for each location
  const audiobooks = [
    {
      id: 1,
      location: "Jagannath Temple",
      title: "Jagannath Temple History & Legends",
      description: "Discover the sacred history and divine legends of Lord Jagannath",
      src: "/Puri Jagannath Temple Full Story in English _History Miracles_Other Details _Neel Madhav_Odisha - .mp3"
    },
    {
      id: 2,
      location: "Puri Beach",
      title: "Puri Beach: Golden Sands & Sacred Waters",
      description: "Learn about the spiritual significance and natural beauty of Puri Beach",
      src: "/Puri Jagannath Temple Full Story in English _History Miracles_Other Details _Neel Madhav_Odisha - .mp3"
    },
    {
      id: 3,
      location: "Konark Sun Temple",
      title: "Konark Sun Temple: Architectural Marvel",
      description: "Explore the astronomical significance and architectural brilliance of Konark",
      src: "/Puri Jagannath Temple Full Story in English _History Miracles_Other Details _Neel Madhav_Odisha - .mp3"
    }
  ];

  const currentAudiobook = audiobooks[currentView];

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

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!document.fullscreenElement) {
        videoRef.current.requestFullscreen().catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      } else {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div className="w-full h-full bg-black flex flex-col">
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
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
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

            {/* Demo Video */}
            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <video
                ref={videoRef}
                src={videos[currentView].src}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                controls
                poster="https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=600&h=400&fit=crop"
              />
              <p className="text-sm text-gray-600 mt-2">
                {videos[currentView].description}
              </p>
              {/* Video Navigation */}
              <div className="flex justify-center gap-2 mt-4">
                <button
                  onClick={() => setCurrentView((prev) => (prev - 1 + videos.length) % videos.length)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowLeftIcon className="w-4 h-4" />
                </button>
                <span className="px-3 py-2 bg-gray-200 rounded-lg text-sm">
                  {currentView + 1} / {videos.length}
                </span>
                <button
                  onClick={() => setCurrentView((prev) => (prev + 1) % videos.length)}
                  className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <ArrowRightIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  title="Fullscreen"
                >
                  <ArrowsPointingOutIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Audiobook Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <PlayIcon className="w-5 h-5" />
                Audiobook: {currentAudiobook.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {currentAudiobook.description}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      if (isAudioPlaying) {
                        audioRef.current.pause();
                      } else {
                        audioRef.current.play();
                      }
                      setIsAudioPlaying(!isAudioPlaying);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isAudioPlaying ? (
                    <>
                      <PauseIcon className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-4 h-4" />
                      Play Audio
                    </>
                  )}
                </button>
                <span className="text-sm text-gray-500">
                  About {views[currentView].name}
                </span>
              </div>
              <audio
                ref={audioRef}
                src={currentAudiobook.src}
                controls
                className="w-full"
                onPlay={() => setIsAudioPlaying(true)}
                onPause={() => setIsAudioPlaying(false)}
                onEnded={() => setIsAudioPlaying(false)}
              />
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

            {/* Audiobook Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <PlayIcon className="w-5 h-5" />
                Audiobook: {currentAudiobook.title}
              </h4>
              <p className="text-sm text-gray-600 mb-3">
                {currentAudiobook.description}
              </p>
              <div className="flex items-center gap-3 mb-3">
                <button
                  onClick={() => {
                    if (audioRef.current) {
                      if (isAudioPlaying) {
                        audioRef.current.pause();
                      } else {
                        audioRef.current.play();
                      }
                      setIsAudioPlaying(!isAudioPlaying);
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isAudioPlaying ? (
                    <>
                      <PauseIcon className="w-4 h-4" />
                      Pause
                    </>
                  ) : (
                    <>
                      <PlayIcon className="w-4 h-4" />
                      Play Audio
                    </>
                  )}
                </button>
                <span className="text-sm text-gray-500">
                  About {views[currentView].name}
                </span>
              </div>
              <audio
                ref={audioRef}
                src={currentAudiobook.src}
                controls
                className="w-full"
                onPlay={() => setIsAudioPlaying(true)}
                onPause={() => setIsAudioPlaying(false)}
                onEnded={() => setIsAudioPlaying(false)}
              />
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-4 border-t">
        <p className="text-sm text-gray-600">
          {mode === 'AR' ? 'AR requires camera access' : 'VR works best with VR headset'}
        </p>
      </div>
    </div>
  );
};

export default ARVRExperience;
