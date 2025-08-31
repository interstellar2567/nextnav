"use client";
import React, { useEffect, useState } from "react";
import Hospital from "@/components/main/Hospital";
import axios from "axios";

const HospitalsPage = () => {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Fetch pincode using reverse geocoding API (e.g., OpenStreetMap, Google Maps API)
        const locationRes = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const pincode = locationRes.data.address.postcode;

        // Fetch hospitals from backend using pincode
        const hospitalsRes = await axios.post("http://localhost:5000/hospitals/pincode", { pincode });
        setHospitals(hospitalsRes.data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
        // Fallback to mock data if API fails
        setHospitals([
          {
            name: "City General Hospital",
            address: "123 Main Street, City Center",
            phone: "+91-123-456-7890",
            distance: "2.3 km",
            rating: 4.5
          },
          {
            name: "Emergency Medical Center",
            address: "456 Health Avenue, Downtown",
            phone: "+91-987-654-3210",
            distance: "3.1 km",
            rating: 4.8
          }
        ]);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading hospitals...</p>
      </div>
    </div>
  );

  return <Hospital hospitals={hospitals} />;
};

export default HospitalsPage;
