"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPinIcon,
  CameraIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  StarIcon,
  PlusIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  PhoneIcon,
  ChatBubbleLeftRightIcon,
  HeartIcon,
  BookmarkIcon,
  SpeakerWaveIcon
} from "@heroicons/react/24/outline";
import ARVRExperience from "../../components/ar-vr/ARVRExperience";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("trips");
  const [showSOS, setShowSOS] = useState(false);
  const [showARVR, setShowARVR] = useState(false);
  const [arvrMode, setArvrMode] = useState<'AR' | 'VR'>('AR');
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const userTrips = [
    {
      id: 1,
      name: "Odisha Temple Tour",
      destinations: ["Puri", "Konark", "Bhubaneswar"],
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      status: "active",
      progress: 60
    },
    {
      id: 2,
      name: "Chilika Adventure",
      destinations: ["Chilika Lake", "Puri Beach"],
      startDate: "2025-02-10",
      endDate: "2025-02-12",
      status: "planned",
      progress: 0
    }
  ];

  const nearbyTravelers = [
    { id: 1, name: "Sarah K.", destination: "Puri", distance: "2.3 km", avatar: "/avatar1.jpg" },
    { id: 2, name: "Mike R.", destination: "Konark", distance: "5.1 km", avatar: "/avatar2.jpg" },
    { id: 3, name: "Priya S.", destination: "Bhubaneswar", distance: "1.8 km", avatar: "/avatar3.jpg" }
  ];

  const safetyContacts = [
    { name: "Emergency Services", number: "112", type: "emergency" },
    { name: "Local Police", number: "100", type: "emergency" },
    { name: "Tourist Helpline", number: "1363", type: "support" }
  ];

  const renderTripsTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">My Trips</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <PlusIcon className="w-4 h-4 mr-2" />
          New Trip
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {userTrips.map((trip) => (
          <motion.div
            key={trip.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800">{trip.name}</h4>
                <p className="text-sm text-gray-600">{trip.destinations.join(" → ")}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                trip.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {trip.status}
              </span>
            </div>
            
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-1">
                <span>Progress</span>
                <span>{trip.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${trip.progress}%` }}
                ></div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                View Details
              </button>
              <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <EyeIcon className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderSafetyTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Safety & Emergency</h3>
        <button 
          onClick={() => setShowSOS(true)}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors flex items-center"
        >
          <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
          SOS
        </button>
      </div>

      {/* Safety Contacts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Emergency Contacts</h4>
        <div className="space-y-3">
          {safetyContacts.map((contact) => (
            <div key={contact.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-800">{contact.name}</p>
                <p className="text-sm text-gray-600">{contact.number}</p>
              </div>
              <button className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors">
                <PhoneIcon className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <CameraIcon className="w-6 h-6 text-blue-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Incident Reporting</h4>
          </div>
          <p className="text-gray-600 mb-4">Report incidents with photo/video for quick response</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Report Incident
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-green-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Location Sharing</h4>
          </div>
          <p className="text-gray-600 mb-4">Share your location with trusted contacts</p>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Share Location
          </button>
        </div>
      </div>
    </div>
  );

  const renderCommunityTab = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800">Travel Community</h3>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Find Travelers
        </button>
      </div>

      {/* Nearby Travelers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Nearby Travelers</h4>
        <div className="space-y-4">
          {nearbyTravelers.map((traveler) => (
            <div key={traveler.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center mr-3">
                  <UserGroupIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{traveler.name}</p>
                  <p className="text-sm text-gray-600">Going to {traveler.destination} • {traveler.distance}</p>
                </div>
              </div>
              <div className="flex gap-2 items-center">
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <ChatBubbleLeftRightIcon className="w-4 h-4" />
                </button>
                <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                  <HeartIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    const audio = new Audio(`/audio/${traveler.destination.toLowerCase().replace(/\s+/g, '-')}.mp3`);
                    audio.play();
                  }}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Play Audiobook"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AR/VR Experience Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">AR/VR Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            onClick={() => {
              setArvrMode('AR');
              setShowARVR(true);
              setSelectedLocation(null);
            }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <CameraIcon className="w-6 h-6 text-cyan-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-800">AR Experience</h4>
            </div>
            <p className="text-gray-600 mb-4">Augmented reality tours</p>
            <span className="text-blue-600 font-medium">Start AR →</span>
          </div>

          <div
            onClick={() => {
              setArvrMode('VR');
              setShowARVR(true);
              setSelectedLocation(null);
            }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <EyeIcon className="w-6 h-6 text-indigo-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-800">VR Experience</h4>
            </div>
            <p className="text-gray-600 mb-4">Virtual reality tours with 360° views</p>
            <span className="text-blue-600 font-medium">Start VR →</span>
          </div>
        </div>
      </div>

      {/* Audiobooks Section */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Audiobooks</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-4">
              <SpeakerWaveIcon className="w-6 h-6 text-purple-600 mr-3" />
              <h4 className="text-lg font-semibold text-gray-800">Jagannath Temple Full Story</h4>
            </div>
            <p className="text-gray-600 mb-4">Listen to the full story of Jagannath Temple</p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (!audio) {
                    const newAudio = new Audio('/audio/puri.mp3');
                    newAudio.onended = () => setIsPlaying(false);
                    setAudio(newAudio);
                    newAudio.play();
                    setIsPlaying(true);
                  } else if (!isPlaying) {
                    audio.play();
                    setIsPlaying(true);
                  }
                }}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Start Hearing
              </button>
              <button
                onClick={() => {
                  if (audio && isPlaying) {
                    audio.pause();
                    audio.currentTime = 0;
                    setIsPlaying(false);
                  }
                }}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Stop Hearing
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <a href="/booking" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <BookmarkIcon className="w-6 h-6 text-blue-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Book Services</h4>
          </div>
          <p className="text-gray-600 mb-4">Book hotels, tours, and transportation</p>
          <span className="text-blue-600 font-medium">Book Now →</span>
        </a>

        <a href="/weather" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <StarIcon className="w-6 h-6 text-yellow-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Weather</h4>
          </div>
          <p className="text-gray-600 mb-4">Check weather conditions for your trip</p>
          <span className="text-blue-600 font-medium">Check Weather →</span>
        </a>

        <a href="/route-prediction" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <MapPinIcon className="w-6 h-6 text-green-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Route Prediction</h4>
          </div>
          <p className="text-gray-600 mb-4">AI-powered route optimization</p>
          <span className="text-blue-600 font-medium">Predict Route →</span>
        </a>

        <a href="/3d-navigation" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <CameraIcon className="w-6 h-6 text-purple-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">3D Navigation</h4>
          </div>
          <p className="text-gray-600 mb-4">Immersive 3D navigation experience</p>
          <span className="text-blue-600 font-medium">Explore 3D →</span>
        </a>

        <a href="/voice-assistant" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <ChatBubbleLeftRightIcon className="w-6 h-6 text-teal-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Voice Assistant</h4>
          </div>
          <p className="text-gray-600 mb-4">Voice-controlled navigation and assistance</p>
          <span className="text-blue-600 font-medium">Start Voice →</span>
        </a>

        <a href="/live-status" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <EyeIcon className="w-6 h-6 text-orange-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Live Status</h4>
          </div>
          <p className="text-gray-600 mb-4">Real-time travel status and updates</p>
          <span className="text-blue-600 font-medium">View Status →</span>
        </a>

        <div
          onClick={() => {
            setArvrMode('AR');
            setShowARVR(true);
          }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="flex items-center mb-4">
            <CameraIcon className="w-6 h-6 text-cyan-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">AR Experience</h4>
          </div>
          <p className="text-gray-600 mb-4">Augmented reality tours with audiobooks</p>
          <span className="text-blue-600 font-medium">Start AR →</span>
        </div>

        <div
          onClick={() => {
            setArvrMode('VR');
            setShowARVR(true);
          }}
          className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
        >
          <div className="flex items-center mb-4">
            <EyeIcon className="w-6 h-6 text-indigo-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">VR Experience</h4>
          </div>
          <p className="text-gray-600 mb-4">Virtual reality tours with 360° views</p>
          <span className="text-blue-600 font-medium">Start VR →</span>
        </div>
      </div>

      {/* Emergency Quick Access */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <a href="/emergency" className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 mr-3" />
            <h4 className="text-lg font-semibold text-red-800">Emergency</h4>
          </div>
          <p className="text-red-600 mb-4">Emergency services and assistance</p>
          <span className="text-red-600 font-medium">Get Help →</span>
        </a>

        <a href="/sos" className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <PhoneIcon className="w-6 h-6 text-red-600 mr-3" />
            <h4 className="text-lg font-semibold text-red-800">SOS Alert</h4>
          </div>
          <p className="text-red-600 mb-4">Send emergency SOS alerts</p>
          <span className="text-red-600 font-medium">SOS →</span>
        </a>

        <a href="/hospitals" className="bg-red-50 border border-red-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <ShieldCheckIcon className="w-6 h-6 text-red-600 mr-3" />
            <h4 className="text-lg font-semibold text-red-800">Hospitals</h4>
          </div>
          <p className="text-red-600 mb-4">Find nearby hospitals and clinics</p>
          <span className="text-red-600 font-medium">Find Hospitals →</span>
        </a>
      </div>

      {/* Community Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <a href="/poll" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <StarIcon className="w-6 h-6 text-yellow-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Travel Polls</h4>
          </div>
          <p className="text-gray-600 mb-4">Participate in travel community polls</p>
          <span className="text-blue-600 font-medium">Join Polls →</span>
        </a>

        <a href="/create-event" className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-4">
            <BookmarkIcon className="w-6 h-6 text-purple-600 mr-3" />
            <h4 className="text-lg font-semibold text-gray-800">Create Events</h4>
          </div>
          <p className="text-gray-600 mb-4">Create and join travel events</p>
          <span className="text-blue-600 font-medium">Create Event →</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h1>
          <p className="text-gray-600">Plan your next adventure with TOURISTA</p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b border-gray-200">
            {[
              { id: "trips", label: "My Trips", icon: MapPinIcon },
              { id: "safety", label: "Safety", icon: ShieldCheckIcon },
              { id: "community", label: "Community", icon: UserGroupIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center px-6 py-4 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <tab.icon className="w-5 h-5 mr-2" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === "trips" && renderTripsTab()}
          {activeTab === "safety" && renderSafetyTab()}
          {activeTab === "community" && renderCommunityTab()}
        </motion.div>

        {/* SOS Modal */}
        {showSOS && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-8 max-w-md w-full mx-4"
            >
              <div className="text-center">
                <ExclamationTriangleIcon className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Emergency SOS</h3>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to send an emergency alert? This will notify emergency services and your contacts.
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowSOS(false)}
                    className="flex-1 bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                  <button className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition-colors">
                    Send SOS
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* AR/VR Experience Modal */}
        {showARVR && (
          <div className="fixed inset-0 bg-black bg-opacity-75 z-50">
            <div className="w-full h-full relative">
              <button
                onClick={() => setShowARVR(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
                aria-label="Close AR/VR Experience"
              >
                ✕
              </button>
              <ARVRExperience
                isOpen={showARVR}
                onClose={() => setShowARVR(false)}
                mode={arvrMode}
                location={selectedLocation}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
