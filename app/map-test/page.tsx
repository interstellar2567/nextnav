"use client";
import React from 'react';
import MapplsMap from '../../components/maps/MapplsMap';

const MapTestPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Map Test Page</h1>
        <p className="text-gray-600 mb-8">Testing Mappls map integration</p>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Mappls Map Test</h2>
          <div className="h-96 rounded-lg overflow-hidden border border-gray-200">
            <MapplsMap
              center={[20.2961, 85.8245]}
              zoom={10}
              showDirections={true}
              startPoint="20.2961,85.8245"
              endPoint="19.8133,85.8315"
              height="100%"
              width="100%"
              onMapLoad={(map) => {
                console.log('Map loaded successfully:', map);
              }}
              onDirectionsLoad={(directions) => {
                console.log('Directions loaded:', directions);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapTestPage;
