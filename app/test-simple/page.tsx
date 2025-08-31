"use client";
import React from "react";

const TestSimplePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Test Page</h1>
        <p className="text-gray-600 mb-8">This is a simple test page to check if routing works.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Component 1</h3>
            <p className="text-gray-600 mb-4">This is a test component.</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Test Button
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Test Component 2</h3>
            <p className="text-gray-600 mb-4">This is another test component.</p>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Test Button 2
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestSimplePage;
