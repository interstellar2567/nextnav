"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  MapPinIcon, 
  MagnifyingGlassIcon, 
  CameraIcon, 
  GlobeAltIcon,
  UserGroupIcon,
  ShieldCheckIcon,
  StarIcon,
  PlayIcon
} from "@heroicons/react/24/outline";

const GetStartedPage = () => {
  const [selectedDestinations, setSelectedDestinations] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const popularDestinations = [
    { name: "Puri", state: "Odisha", image: "/puri-temple.jpg", description: "Sacred city with Jagannath Temple" },
    { name: "Konark", state: "Odisha", image: "/konark-sun.jpg", description: "Ancient Sun Temple UNESCO site" },
    { name: "Bhubaneswar", state: "Odisha", image: "/bhubaneswar.jpg", description: "Temple city of India" },
    { name: "Chilika Lake", state: "Odisha", image: "/chilika.jpg", description: "Asia's largest brackish water lake" }
  ];

  const features = [
    {
      icon: <MapPinIcon className="w-8 h-8" />,
      title: "Smart Route Planning",
      description: "AI-powered multi-stop route optimization with real-time traffic updates"
    },
    {
      icon: <CameraIcon className="w-8 h-8" />,
      title: "AR/VR Previews",
      description: "Experience destinations in augmented and virtual reality before visiting"
    },
    {
      icon: <ShieldCheckIcon className="w-8 h-8" />,
      title: "Safety & SOS",
      description: "24/7 safety monitoring with instant emergency response system"
    },
    {
      icon: <UserGroupIcon className="w-8 h-8" />,
      title: "Travel Community",
      description: "Connect with fellow travelers and share experiences"
    },
    {
      icon: <GlobeAltIcon className="w-8 h-8" />,
      title: "Local Insights",
      description: "Discover hidden gems and local recommendations"
    },
    {
      icon: <StarIcon className="w-8 h-8" />,
      title: "Rewards & Offers",
      description: "Earn points and get exclusive deals on bookings"
    }
  ];

  const addDestination = (destination: string) => {
    if (!selectedDestinations.includes(destination)) {
      setSelectedDestinations([...selectedDestinations, destination]);
    }
  };

  const removeDestination = (destination: string) => {
    setSelectedDestinations(selectedDestinations.filter(d => d !== destination));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Plan Your Perfect
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">
                {" "}Journey
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover, plan, and experience destinations like never before with AI-powered route optimization, 
              AR/VR previews, and comprehensive safety features.
            </p>
          </motion.div>

          {/* Search and Destination Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search destinations, cities, or attractions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Search
                </button>
              </div>

              {/* Selected Destinations */}
              {selectedDestinations.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Trip:</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedDestinations.map((dest, index) => (
                      <div key={dest} className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                        <span className="text-sm font-medium">{dest}</span>
                        <button
                          onClick={() => removeDestination(dest)}
                          className="ml-2 text-blue-600 hover:text-blue-800"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Destinations */}
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Destinations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {popularDestinations.map((destination) => (
                    <motion.div
                      key={destination.name}
                      whileHover={{ scale: 1.05 }}
                      className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors"
                      onClick={() => addDestination(destination.name)}
                    >
                      <div className="w-full h-32 bg-gradient-to-br from-blue-200 to-teal-200 rounded-lg mb-3 flex items-center justify-center">
                        <MapPinIcon className="w-8 h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-800">{destination.name}</h4>
                      <p className="text-sm text-gray-600">{destination.state}</p>
                      <p className="text-xs text-gray-500 mt-1">{destination.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose TOURISTA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of travel with cutting-edge technology and comprehensive safety features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Start Your Adventure?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join thousands of travelers who trust TOURISTA for their journey planning and safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a href="/dashboard" className="bg-white text-blue-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center justify-center">
                <PlayIcon className="w-5 h-5 mr-2" />
                Start Planning
              </a>
              <a href="/about" className="border-2 border-white text-white px-8 py-3 rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
                Learn More
              </a>
            </div>
            
            {/* Quick Access Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
              <a href="/booking" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                <div className="text-white text-sm font-medium">Book Services</div>
              </a>
              <a href="/weather" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                <div className="text-white text-sm font-medium">Weather</div>
              </a>
              <a href="/emergency" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                <div className="text-white text-sm font-medium">Emergency</div>
              </a>
              <a href="/sos" className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center hover:bg-white/30 transition-colors">
                <div className="text-white text-sm font-medium">SOS</div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GetStartedPage;
