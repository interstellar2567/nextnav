"use client";
import React from "react";

const EmergencySimplePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Emergency Services</h1>
        <p className="text-gray-600 mb-8">Access emergency services and assistance.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Hospitals</h3>
            <p className="text-gray-600 mb-4">Find the nearest hospitals and medical facilities.</p>
            <a href="/hospitals" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Find Hospitals
            </a>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">SOS Alert</h3>
            <p className="text-gray-600 mb-4">Send emergency SOS alerts to contacts.</p>
            <a href="/sos" className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Send SOS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencySimplePage;
