"use client";
import React, { useState } from "react";
import axios from "axios";
import TestRouteMap from "./TestRouteMap";
interface Coordinate {
  lat: number;
  lon: number;
}

type Route = {
  duration: number;
  distance: number;
  summary: string;
  weight: number;
  coordinates: Coordinate[];
  id: number; // Add unique identifier
};

export default function Check(): JSX.Element {
  const [startInput, setStartInput] = useState<string>("");
  const [endInput, setEndInput] = useState<string>("");
  const [start, setStart] = useState<Coordinate | null>(null);
  const [end, setEnd] = useState<Coordinate | null>(null);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRouteIndex, setSelectedRouteIndex] = useState<number | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getCoordinates = async (
    location: string
  ): Promise<Coordinate | null> => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          location
        )}`
      );
      if (response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lon: parseFloat(response.data[0].lon),
        };
      }
      return null;
    } catch (error) {
      console.error("Error fetching coordinates:", error);
      return null;
    }
  };

  const fetchRoutes = async () => {
    setError(null);
    setLoading(true);
    setSelectedRouteIndex(null);

    if (!startInput || !endInput) {
      setError("Please enter both a start location and a destination.");
      setLoading(false);
      return;
    }

    const startCoords = await getCoordinates(startInput);
    const endCoords = await getCoordinates(endInput);

    if (!startCoords || !endCoords) {
      setError("Invalid location! Please enter a valid city or place.");
      setLoading(false);
      return;
    }

    setStart(startCoords);
    setEnd(endCoords);

    try {
      const response = await axios.get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords.lon},${startCoords.lat};${endCoords.lon},${endCoords.lat}?alternatives=true&geometries=geojson&access_token=pk.eyJ1IjoidHVzaGFyY29kZXgiLCJhIjoiY203dnliN2t3MDFhczJscjE5bDV5NXFrZyJ9.NSgO5u5JC4GDocUdsKP6wA`
      );

      const extractedRoutes = response.data.routes.map(
        (route: any, index: number) => ({
          duration: route.duration,
          distance: route.distance,
          summary: route.legs[0].summary,
          weight: route.weight,
          coordinates: route.geometry.coordinates.map(
            ([lon, lat]: [number, number]) => ({ lat, lon })
          ),
          id: index, // Add unique identifier
        })
      );

      setRoutes(extractedRoutes);
    } catch (error: any) {
      console.error("Error fetching routes:", error);
      setError(
        error.response?.data?.error?.message ||
          "Could not fetch route. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleRouteSelect = (index: number) => {
    setSelectedRouteIndex(index);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          width: "30%",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          overflowY: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Enter start location"
          value={startInput}
          onChange={(e) => setStartInput(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="text"
          placeholder="Enter destination"
          value={endInput}
          onChange={(e) => setEndInput(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "10px" }}
        />
        <button
          onClick={fetchRoutes}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Search"}
        </button>
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
        <div>
          {routes.map((route, index) => (
            <div
              key={route.id}
              onClick={() => handleRouteSelect(index)}
              style={{
                marginTop: "20px",
                padding: "10px",
                border: "1px solid #ddd",
                backgroundColor:
                  selectedRouteIndex === index ? "#e6f2ff" : "white",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              <h3>Route {index + 1}</h3>
              <p>
                <strong>Duration:</strong> {Math.round(route.duration / 60)} min
              </p>
              <p>
                <strong>Distance:</strong> {(route.distance / 1000).toFixed(2)}{" "}
                km
              </p>
              <p>
                <strong>Summary:</strong> {route.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <TestRouteMap
          start={start}
          end={end}
          routes={routes.map((r) => r.coordinates)}
          selectedRouteIndex={selectedRouteIndex}
        />
      </div>
    </div>
  );
}
