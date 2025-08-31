"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  EyeIcon,
  CameraIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const ThreeDNavigationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">3D Navigation</h1>
          <p className="text-gray-600">Explore destinations in immersive 3D</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* 3D Map View */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <MapPinIcon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">3D Map View</h3>
            <p className="text-gray-600 mb-4">
              Navigate with enhanced 3D terrain and building models
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Explore 3D Map
            </button>
          </motion.div>

          {/* AR Navigation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <CameraIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">AR Navigation</h3>
            <p className="text-gray-600 mb-4">
              Point your camera to see directions overlaid on real world
            </p>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm">
              Start AR View
            </button>
          </motion.div>

          {/* VR Experience */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
              <EyeIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">VR Experience</h3>
            <p className="text-gray-600 mb-4">
              Immerse yourself in virtual reality tours of destinations
            </p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors text-sm">
              Enter VR
            </button>
          </motion.div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/booking" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowRightIcon className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-800">Book Ride</span>
            </a>
            <a href="/emergency" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowRightIcon className="w-5 h-5 text-red-600" />
              <span className="font-medium text-gray-800">Emergency</span>
            </a>
            <a href="/navigation" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowRightIcon className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-800">Navigation</span>
            </a>
            <a href="/dashboard" className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <ArrowRightIcon className="w-5 h-5 text-purple-600" />
              <span className="font-medium text-gray-800">Dashboard</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreeDNavigationPage;