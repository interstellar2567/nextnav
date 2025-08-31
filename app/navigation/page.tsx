"use client";
import React, { useState } from "react";
import MapplsMap from "@/components/maps/MapplsMap";
import WorkingMapplsMap from "@/components/maps/WorkingMapplsMap";

const NavigationPage = () => {
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [showDirections, setShowDirections] = useState(false);

  const popularDestinations = [
    { name: "Bhubaneswar", coords: "20.2961,85.8245" },
    { name: "Puri", coords: "19.8133,85.8315" },
    { name: "Konark", coords: "19.8876,86.0945" },
    { name: "Cuttack", coords: "20.4625,85.8830" },
    { name: "Rourkela", coords: "22.2492,84.8828" },
    { name: "Sambalpur", coords: "21.4704,83.9701" }
  ];

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartPoint(e.target.value);
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndPoint(e.target.value);
  };

  const handleGetDirections = () => {
    if (startPoint && endPoint) {
      setShowDirections(true);
    }
  };

  const setDestination = (coords: string, type: 'start' | 'end') => {
    if (type === 'start') {
      setStartPoint(coords);
    } else {
      setEndPoint(coords);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Navigation</h1>
          <p className="text-gray-600">Plan your route with AI-powered navigation using Mappls</p>
        </div>

        {/* Route Input Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Plan Your Route</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Point</label>
              <input
                type="text"
                value={startPoint}
                onChange={handleStartChange}
                placeholder="Enter start coordinates (e.g., 20.2961,85.8245)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Point</label>
              <input
                type="text"
                value={endPoint}
                onChange={handleEndChange}
                placeholder="Enter end coordinates (e.g., 19.8133,85.8315)"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <button
            onClick={handleGetDirections}
            disabled={!startPoint || !endPoint}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Get Directions
          </button>
        </div>

        {/* Popular Destinations */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Destinations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {popularDestinations.map((dest) => (
              <div key={dest.name} className="text-center">
                <button
                  onClick={() => setDestination(dest.coords, 'start')}
                  className="w-full bg-blue-100 text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-200 transition-colors text-sm mb-2"
                >
                  Set as Start
                </button>
                <button
                  onClick={() => setDestination(dest.coords, 'end')}
                  className="w-full bg-green-100 text-green-800 px-3 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm"
                >
                  Set as End
                </button>
                <p className="text-xs text-gray-600 mt-1">{dest.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Interactive Map</h2>
          <div className="h-96 rounded-lg overflow-hidden">
            <WorkingMapplsMap
              height="384px"
              width="100%"
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Real-time Traffic</h3>
            <p className="text-gray-600">Get live traffic updates and alternative routes</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Multiple Transport Modes</h3>
            <p className="text-gray-600">Driving, biking, walking, and public transport options</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Voice Navigation</h3>
            <p className="text-gray-600">Turn-by-turn voice guidance for hands-free navigation</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationPage;
