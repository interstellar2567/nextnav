"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  PhoneIcon, 
  MapPinIcon, 
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  StarIcon,
  CameraIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import MapplsMap from '../maps/MapplsMap';
import WorkingMapplsMap from '../maps/WorkingMapplsMap';

interface EmergencyContact {
  id: number;
  name: string;
  type: string;
  phone: string;
  distance: string;
  rating: number;
  image: string;
  coordinates: [number, number];
  description: string;
}

const Emergency = () => {
  const [showSOS, setShowSOS] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number]>([20.2961, 85.8245]);
  const [showMap, setShowMap] = useState(false);

  // Mock emergency contacts data
  useEffect(() => {
    setEmergencyContacts([
      {
        id: 1,
        name: "City Police Station",
        type: "Police",
        phone: "100",
        distance: "1.2 km",
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
        coordinates: [20.2961, 85.8245],
        description: "24/7 emergency police services"
      },
      {
        id: 2,
        name: "City Hospital",
        type: "Hospital",
        phone: "108",
        distance: "2.1 km",
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
        coordinates: [20.2861, 85.8145],
        description: "Emergency medical services"
      },
      {
        id: 3,
        name: "Fire Station",
        type: "Fire",
        phone: "101",
        distance: "3.5 km",
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
        coordinates: [20.3061, 85.8345],
        description: "Fire and rescue services"
      },
      {
        id: 4,
        name: "Tourist Helpline",
        type: "Tourism",
        phone: "1363",
        distance: "0.8 km",
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
        coordinates: [20.2961, 85.8145],
        description: "Tourist assistance and information"
      }
    ]);
  }, []);

  // Get user location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleSOS = () => {
    setShowSOS(true);
    const countdown = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          alert('SOS Alert Sent! Emergency services have been notified.');
          setShowSOS(false);
          setSosCountdown(5);
          return 5;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Emergency Services</h1>
          <p className="text-gray-600">Quick access to emergency contacts and SOS features</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Emergency Actions */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Emergency Actions</h2>
              
              {/* SOS Button */}
              <div className="mb-6">
                <button
                  onClick={handleSOS}
                  disabled={showSOS}
                  className="w-full bg-red-600 text-white py-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-semibold text-lg flex items-center justify-center gap-2"
                >
                  <ExclamationTriangleIcon className="w-6 h-6" />
                  {showSOS ? `SOS in ${sosCountdown}s` : 'SOS Emergency'}
                </button>
                <p className="text-sm text-gray-600 mt-2">
                  Press for immediate emergency assistance
                </p>
              </div>

              {/* Quick Actions */}
              <div className="space-y-3">
                <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                  <PhoneIcon className="w-5 h-5" />
                  Call Police (100)
                </button>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                  <ShieldCheckIcon className="w-5 h-5" />
                  Call Ambulance (108)
                </button>
                <button className="w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-700 transition-colors flex items-center justify-center gap-2">
                  <ExclamationTriangleIcon className="w-5 h-5" />
                  Call Fire (101)
                </button>
              </div>

              {/* Map Toggle */}
              <div className="mt-6">
                <button
                  onClick={() => setShowMap(!showMap)}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <MapPinIcon className="w-5 h-5" />
                  {showMap ? 'Hide Map' : 'Show Emergency Map'}
                </button>
              </div>
            </div>
          </div>

          {/* Emergency Contacts */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Nearby Emergency Services</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact) => (
                  <motion.div
                    key={contact.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <img
                        src={contact.image}
                        alt={contact.name}
                        className="w-20 h-20 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{contact.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{contact.type}</p>
                        <div className="flex items-center gap-2 mb-2">
                          <StarIcon className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm text-gray-600">{contact.rating}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{contact.distance}</span>
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{contact.description}</p>
                        <div className="flex gap-2">
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors">
                            Call {contact.phone}
                          </button>
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700 transition-colors">
                            Get Directions
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Emergency Map */}
            {showMap && (
              <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Emergency Services Map</h3>
                <div className="h-80 rounded-lg overflow-hidden border border-gray-200">
                  <WorkingMapplsMap
                    height="100%"
                    width="100%"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
