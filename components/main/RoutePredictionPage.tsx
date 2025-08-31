"use client";
import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, ThumbsUp, Car, MapPin, Home, Droplet, Navigation, Info } from "lucide-react";
import MapplsMap from "../maps/MapplsMap";

interface RouteFeature {
  id: number;
  name: string;
  distance: string;
  duration: string;
  complexityScore: number;
  recommendation: string;
  futurePrediction: string;
  imageUrl: string;
  startPoint: string;
  destination: string;
  petrolPumps: Record<string, string>;
  hotels: Record<string, string>;
  roadCoordinates: string[];
}

const RoutePredictionPage: React.FC = () => {
  const [startPoint, setStartPoint] = useState("20.2961,85.8245"); // Bhubaneswar
  const [endPoint, setEndPoint] = useState("19.8133,85.8315"); // Puri
  const [selectedRoute, setSelectedRoute] = useState(0);
  const [showDirections, setShowDirections] = useState(true);

  // Mock route data
  const mockRoutes: RouteFeature[] = [
    {
      id: 1,
      name: "NH16 Route",
      distance: "65 km",
      duration: "1h 15m",
      complexityScore: 3,
      recommendation: "Best route with moderate traffic",
      futurePrediction: "Traffic expected to increase by 20% in next 2 hours",
      imageUrl: "/route1.jpg",
      startPoint: "20.2961,85.8245",
      destination: "19.8133,85.8315",
      petrolPumps: {
        "HP Station": "20.1234,85.5678",
        "BP Station": "20.2345,85.6789"
      },
      hotels: {
        "Hotel Puri": "19.8133,85.8315",
        "Beach Resort": "19.8233,85.8415"
      },
      roadCoordinates: ["20.2961,85.8245", "20.1234,85.5678", "19.8133,85.8315"]
    },
    {
      id: 2,
      name: "Coastal Route",
      distance: "72 km",
      duration: "1h 30m",
      complexityScore: 2,
      recommendation: "Scenic route with less traffic",
      futurePrediction: "Clear traffic conditions expected",
      imageUrl: "/route2.jpg",
      startPoint: "20.2961,85.8245",
      destination: "19.8133,85.8315",
      petrolPumps: {
        "Shell Station": "20.3456,85.7890",
        "IOC Station": "20.4567,85.8901"
      },
      hotels: {
        "Seaside Hotel": "19.8033,85.8215",
        "Ocean View": "19.7933,85.8115"
      },
      roadCoordinates: ["20.2961,85.8245", "20.3456,85.7890", "19.8133,85.8315"]
    }
  ];

  const getComplexityColor = (score: number) => {
    if (score <= 2) return "text-green-600 bg-green-100";
    if (score <= 4) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getComplexityText = (score: number) => {
    if (score <= 2) return "Low";
    if (score <= 4) return "Medium";
    return "High";
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Route Prediction</h1>
          <p className="text-gray-600">Get intelligent route recommendations with traffic predictions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Route Options */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Options</h2>
              
              <div className="space-y-4">
                {mockRoutes.map((route, index) => (
                  <div
                    key={route.id}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedRoute === index
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => setSelectedRoute(index)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-800">{route.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(route.complexityScore)}`}>
                        {getComplexityText(route.complexityScore)} Complexity
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{route.distance}</span>
                      <span className="mx-2">•</span>
                      <Clock className="w-4 h-4 mr-1" />
                      <span>{route.duration}</span>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{route.recommendation}</p>
                    
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <div className="flex items-start">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5" />
                        <div>
                          <p className="text-xs font-medium text-yellow-800">Traffic Prediction</p>
                          <p className="text-xs text-yellow-700">{route.futurePrediction}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Route Details */}
            <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Route Details</h2>
              
              {mockRoutes[selectedRoute] && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Distance</span>
                    <span className="font-semibold">{mockRoutes[selectedRoute].distance}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Duration</span>
                    <span className="font-semibold">{mockRoutes[selectedRoute].duration}</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Complexity</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getComplexityColor(mockRoutes[selectedRoute].complexityScore)}`}>
                      {getComplexityText(mockRoutes[selectedRoute].complexityScore)}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-800 mb-2">Petrol Pumps</h4>
                    <div className="space-y-1">
                      {Object.keys(mockRoutes[selectedRoute].petrolPumps).map((name) => (
                        <div key={name} className="flex items-center text-sm text-gray-600">
                          <Droplet className="w-3 h-3 mr-2 text-blue-500" />
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-gray-800 mb-2">Hotels</h4>
                    <div className="space-y-1">
                      {Object.keys(mockRoutes[selectedRoute].hotels).map((name) => (
                        <div key={name} className="flex items-center text-sm text-gray-600">
                          <Home className="w-3 h-3 mr-2 text-green-500" />
                          {name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Interactive Route Map</h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapplsMap
                  center={[20.2961, 85.8245]} // Bhubaneswar
                  zoom={10}
                  showDirections={showDirections}
                  startPoint={startPoint}
                  endPoint={endPoint}
                  height="384px"
                  width="100%"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePredictionPage;