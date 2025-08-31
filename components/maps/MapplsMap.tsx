"use client";
import React, { useEffect, useRef, useState } from 'react';

interface MapplsMapProps {
  center?: [number, number];
  zoom?: number;
  showDirections?: boolean;
  startPoint?: string;
  endPoint?: string;
  height?: string;
  width?: string;
  className?: string;
  onMapLoad?: (map: any) => void;
  onDirectionsLoad?: (directions: any) => void;
}

declare global {
  interface Window {
    mappls: any;
    initMap1: () => void;
  }
}

const MapplsMap: React.FC<MapplsMapProps> = ({
  center = [20.2961, 85.8245], // Bhubaneswar coordinates
  zoom = 10,
  showDirections = false,
  startPoint,
  endPoint,
  height = "400px",
  width = "100%",
  className = "",
  onMapLoad,
  onDirectionsLoad
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);
  const [directionPlugin, setDirectionPlugin] = useState<any>(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    // Load Mappls SDK using the exact working code from user
    const loadMapplsSDK = () => {
      if (window.mappls) {
        initializeMap();
        return;
      }

      // Create script elements with the exact URLs from user's working HTML
      const mapScript = document.createElement('script');
      mapScript.src = "https://apis.mappls.com/advancedmaps/api/db3a5140-83b1-4fab-bf09-134e9725e57f/map_sdk?layer=vector&v=3.0&callback=initMap1";
      mapScript.async = true;

      const pluginScript = document.createElement('script');
      pluginScript.src = "https://apis.mappls.com/advancedmaps/api/db3a5140-83b1-4fab-bf09-134e9725e57f/map_sdk_plugins?v=3.0";
      pluginScript.async = true;

      // Set up global callback using the exact function name from user's code
      window.initMap1 = () => {
        initializeMap();
      };

      // Append scripts
      document.head.appendChild(mapScript);
      document.head.appendChild(pluginScript);

      return () => {
        if (document.head.contains(mapScript)) {
          document.head.removeChild(mapScript);
        }
        if (document.head.contains(pluginScript)) {
          document.head.removeChild(pluginScript);
        }
      };
    };

    loadMapplsSDK();
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.mappls) return;

    try {
      // Use the exact initialization from user's working HTML
      const newMap = new window.mappls.Map(mapRef.current, {
        center: center,
        zoom: zoom
      });

      newMap.addListener('load', () => {
        setIsMapLoaded(true);
        setMap(newMap);
        onMapLoad?.(newMap);

        if (showDirections && startPoint && endPoint) {
          initializeDirections(newMap);
        }
      });
    } catch (error) {
      console.error('Error initializing Mappls map:', error);
    }
  };

  const initializeDirections = (mapInstance: any) => {
    if (!window.mappls || !startPoint || !endPoint) return;

    try {
      // Use the exact direction options from user's working HTML
      const directionOption = {
        map: mapInstance,
        divWidth: '350px',
        isDraggable: false,
        start: { label: 'Start Point', geoposition: startPoint },
        end: { label: 'End Point', geoposition: endPoint },
        Profile: ['driving', 'biking', 'trucking', 'walking']
      };

      window.mappls.direction(directionOption, (data: any) => {
        setDirectionPlugin(data);
        onDirectionsLoad?.(data);
        console.log('Directions loaded:', data);
      });
    } catch (error) {
      console.error('Error initializing directions:', error);
    }
  };

  // Update directions when props change
  useEffect(() => {
    if (isMapLoaded && showDirections && startPoint && endPoint && map) {
      // Remove existing directions before adding new ones
      if (directionPlugin) {
        try {
          directionPlugin.remove();
        } catch (error) {
          console.log('Error removing old directions:', error);
        }
      }
      initializeDirections(map);
    }
  }, [isMapLoaded, showDirections, startPoint, endPoint, map]);

  return (
    <div 
      ref={mapRef}
      style={{ 
        width: width, 
        height: height,
        position: 'relative',
        margin: 0,
        padding: 0
      }}
      className={className}
    />
  );
};

export default MapplsMap;
