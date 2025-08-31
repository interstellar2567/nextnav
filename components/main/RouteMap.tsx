"use client";
import React, { useEffect, useState } from "react";
import MapplsMap from "../maps/MapplsMap";

interface Coordinate {
  lat: number;
  lon: number;
}

interface Route {
  coordinates: Coordinate[];
  petrol_pumps?: Record<string, string>;
  hotels?: Record<string, string>;
}

interface RouteMapProps {
  start: Coordinate | null;
  end: Coordinate | null;
  routes: Route[];
  selectedRouteIndex: number | null;
}

const RouteMap: React.FC<RouteMapProps> = ({ start, end, routes, selectedRouteIndex }) => {
  const [startPoint, setStartPoint] = useState<string>("");
  const [endPoint, setEndPoint] = useState<string>("");

  useEffect(() => {
    if (start && end) {
      setStartPoint(`${start.lat},${start.lon}`);
      setEndPoint(`${end.lat},${end.lon}`);
    }
  }, [start, end]);

  const center: [number, number] = start ? [start.lat, start.lon] : [20.2961, 85.8245];

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapplsMap
        center={center}
        zoom={10}
        showDirections={!!startPoint && !!endPoint}
        startPoint={startPoint}
        endPoint={endPoint}
        height="400px"
        width="100%"
      />
    </div>
  );
};

export default RouteMap;