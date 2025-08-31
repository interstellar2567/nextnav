"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  CalendarIcon, 
  ClockIcon, 
  UserIcon, 
  TruckIcon,
  CameraIcon,
  EyeIcon,
  StarIcon,
  PhoneIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';
import MapplsMap from '../maps/MapplsMap';
import SimpleMapplsMap from '../maps/SimpleMapplsMap';
import WorkingMapplsMap from '../maps/WorkingMapplsMap';
import ARVRExperience from '../ar-vr/ARVRExperience';

interface NearbyPlace {
  id: number;
  name: string;
  type: string;
  distance: string;
  rating: number;
  image: string;
  coordinates: [number, number];
  description: string;
}

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState('');
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [showMap, setShowMap] = useState(false); // Hide map by default
  const [showAR, setShowAR] = useState(false);
  const [showVR, setShowVR] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState<NearbyPlace[]>([]);

  // Mock nearby places data
  useEffect(() => {
    setNearbyPlaces([
      {
        id: 1,
        name: "Jagannath Temple",
        type: "Temple",
        distance: "2.3 km",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
        coordinates: [19.8133, 85.8315],
        description: "Ancient temple dedicated to Lord Jagannath"
      },
      {
        id: 2,
        name: "Puri Beach",
        type: "Beach",
        distance: "3.1 km",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
        coordinates: [19.8233, 85.8415],
        description: "Beautiful golden beach with pristine waters"
      },
      {
        id: 3,
        name: "Konark Sun Temple",
        type: "UNESCO Site",
        distance: "35.2 km",
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop",
        coordinates: [19.8876, 86.0945],
        description: "Ancient sun temple with stunning architecture"
      },
      {
        id: 4,
        name: "Chilika Lake",
        type: "Lake",
        distance: "45.8 km",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        coordinates: [19.7000, 85.3000],
        description: "Asia's largest brackish water lake"
      }
    ]);
  }, []);

  const services = [
    { id: 'taxi', name: 'Taxi', icon: TruckIcon, price: '₹15/km' },
    { id: 'auto', name: 'Auto Rickshaw', icon: TruckIcon, price: '₹12/km' },
    { id: 'bus', name: 'Bus', icon: TruckIcon, price: '₹5/km' },
    { id: 'bike', name: 'Bike Taxi', icon: TruckIcon, price: '₹8/km' }
  ];

  const handleBooking = () => {
    if (pickupLocation && destination) {
      // Redirect to the working HTML map page with parameters
      const startParam = encodeURIComponent(pickupLocation);
      const endParam = encodeURIComponent(destination);
      window.location.href = `/route-map.html?start=${startParam}&end=${endParam}`;
    } else {
      alert('Please enter both pickup location and destination to book your ride.');
    }
  };

  const startARExperience = () => {
    setShowAR(true);
  };

  const startVRExperience = () => {
    setShowVR(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Book Your Ride</h1>
          <p className="text-gray-600">Choose your transportation and explore with AR/VR features</p>
          </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Book Your Ride</h2>
              
              {/* Service Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Choose Service</label>
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                  <button
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        selectedService === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <service.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                      <div className="text-sm font-medium text-gray-800">{service.name}</div>
                      <div className="text-xs text-gray-500">{service.price}</div>
                  </button>
                  ))}
                  </div>
              </div>

              {/* Pickup Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Pickup Location</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    placeholder="Enter pickup location"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Quick Location Presets */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setPickupLocation('Bhubaneswar')}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Bhubaneswar
                  </button>
                  <button
                    onClick={() => setPickupLocation('Cuttack')}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Cuttack
                  </button>
                  <button
                    onClick={() => setPickupLocation('Puri')}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Puri
                  </button>
                </div>
                </div>

              {/* Destination */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
                <div className="relative">
                  <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="Enter destination"
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                {/* Quick Destination Presets */}
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => setDestination('Jagannath Temple')}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Jagannath Temple
                  </button>
                  <button
                    onClick={() => setDestination('Puri Beach')}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Puri Beach
                  </button>
                  <button
                    onClick={() => setDestination('Konark Sun Temple')}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded hover:bg-gray-200 transition-colors"
                  >
                    Konark Temple
                  </button>
                </div>
              </div>

              {/* Date and Time */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <div className="relative">
                    <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <div className="relative">
                    <ClockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Passengers */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
                    ))}
                  </select>
                        </div>
                      </div>

              {/* Book Button */}
              <button
                onClick={handleBooking}
                disabled={!pickupLocation || !destination || !selectedService}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold"
              >
                Book Now
              </button>

              {/* AR/VR Buttons */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={startARExperience}
                  className="flex items-center justify-center gap-2 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  <CameraIcon className="w-4 h-4" />
                  AR View
                </button>
                <button
                  onClick={startVRExperience}
                  className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                  <EyeIcon className="w-4 h-4" />
                  VR Tour
                    </button>
              </div>
                </div>
              </div>

          {/* Map and Nearby Places */}
          <div className="lg:col-span-2 space-y-6">
                         {/* Map Section */}
             {showMap ? (
               <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="flex items-center justify-between mb-4">
                   <h2 className="text-xl font-semibold text-gray-800">Route Map</h2>
                   <button
                     onClick={() => setShowMap(false)}
                     className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                   >
                     Hide Map
                   </button>
            </div>

                 <div>
                   <p className="text-sm text-gray-600 mb-4">
                     Route from <strong>{pickupLocation}</strong> to <strong>{destination}</strong>
                   </p>
                   <div className="h-80 rounded-lg overflow-hidden border border-gray-200">
                     <WorkingMapplsMap
                       height="320px"
                       width="100%"
                     />
                   </div>
                   <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                     <h3 className="font-semibold text-blue-800 mb-2">Route Information</h3>
                     <div className="grid grid-cols-2 gap-4 text-sm">
                       <div>
                         <span className="text-gray-600">Start:</span>
                         <span className="ml-2 font-medium">{pickupLocation}</span>
                       </div>
                       <div>
                         <span className="text-gray-600">Destination:</span>
                         <span className="ml-2 font-medium">{destination}</span>
                       </div>
                       <div>
                         <span className="text-gray-600">Service:</span>
                         <span className="ml-2 font-medium capitalize">{selectedService || 'Not selected'}</span>
                       </div>
                       <div>
                         <span className="text-gray-600">Passengers:</span>
                         <span className="ml-2 font-medium">{passengers}</span>
                       </div>
                     </div>
                   </div>
                 </div>
               </div>
             ) : (
               <div className="bg-white rounded-xl shadow-lg p-6">
                 <div className="text-center py-8">
                   <h2 className="text-xl font-semibold text-gray-800 mb-4">Ready to Book?</h2>
                   <p className="text-gray-600 mb-6">
                     Fill in your pickup location and destination, then click "Book Now" to see your route on the map.
                   </p>
                   <div className="bg-gray-50 rounded-lg p-4">
                     <p className="text-sm text-gray-600">
                       <strong>Current Selection:</strong><br/>
                       From: {pickupLocation || 'Not selected'}<br/>
                       To: {destination || 'Not selected'}<br/>
                       Service: {selectedService ? selectedService.charAt(0).toUpperCase() + selectedService.slice(1) : 'Not selected'}
                     </p>
                   </div>
                 </div>
               </div>
             )}

            {/* Nearby Places */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Nearby Places</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {nearbyPlaces.map((place) => (
                  <motion.div
                    key={place.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={place.image}
                        alt={place.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{place.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{place.type}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{place.rating}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{place.distance}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{place.description}</p>
                                                 <div className="flex gap-2">
                           <button
                             onClick={() => {
                               setDestination(place.name);
                               alert(`Destination set to ${place.name}! Click "Book Now" to see the route on the map.`);
                             }}
                             className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors"
                           >
                             Set as Destination
                           </button>
                           <button
                             onClick={() => {
                               const startParam = encodeURIComponent(pickupLocation || 'Bhubaneswar');
                               const endParam = encodeURIComponent(place.name);
                               window.location.href = `/route-map.html?start=${startParam}&end=${endParam}`;
                             }}
                             className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors"
                           >
                             View Route
                           </button>
                           <button
                             onClick={() => {
                               setDestination(place.name);
                               setShowAR(true);
                             }}
                             className="bg-purple-600 text-white px-3 py-1 rounded text-xs hover:bg-purple-700 transition-colors"
                           >
                             AR View
                           </button>
                         </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              </div>
            </div>
          </div>
        </div>

      {/* AR/VR Experience Modal */}
      <ARVRExperience
        isOpen={showAR}
        onClose={() => setShowAR(false)}
        mode="AR"
        location={destination ? {
          name: destination,
          coordinates: [19.8133, 85.8315],
          image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
          description: `Explore ${destination} with immersive videos and audio guides`
        } : undefined}
      />

      <ARVRExperience
        isOpen={showVR}
        onClose={() => setShowVR(false)}
        mode="VR"
        location={destination ? {
          name: destination,
          coordinates: [19.8133, 85.8315],
          image: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?w=400&h=300&fit=crop",
          description: `Virtual reality tour of ${destination}`
        } : undefined}
      />
    </div>
  );
};

export default BookingPage;
