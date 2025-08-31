"use client";
import React, { useEffect, useRef, useState } from 'react';

interface WorkingMapplsMapProps {
  height?: string;
  width?: string;
  className?: string;
}

declare global {
  interface Window {
    mappls: any;
    initMap1: () => void;
  }
}

const WorkingMapplsMap: React.FC<WorkingMapplsMapProps> = ({
  height = "400px",
  width = "100%",
  className = ""
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Only load once
    if (isLoaded) return;

    // Check if already loaded
    if (window.mappls) {
      initializeMap();
      return;
    }

    // Load scripts dynamically
    const loadScripts = () => {
      // Create and load the main SDK script
      const script1 = document.createElement('script');
      script1.src = "https://apis.mappls.com/advancedmaps/api/db3a5140-83b1-4fab-bf09-134e9725e57f/map_sdk?layer=vector&v=3.0&callback=initMap1";
      script1.async = true;
      script1.onload = () => {
        // Create and load the plugins script
        const script2 = document.createElement('script');
        script2.src = "https://apis.mappls.com/advancedmaps/api/db3a5140-83b1-4fab-bf09-134e9725e57f/map_sdk_plugins?v=3.0";
        script2.async = true;
        script2.onload = () => {
          // Set up the global callback
          window.initMap1 = () => {
            initializeMap();
          };
        };
        document.head.appendChild(script2);
      };
      document.head.appendChild(script1);
    };

    loadScripts();
  }, [isLoaded]);

  const initializeMap = () => {
    if (!mapRef.current || !window.mappls) return;

    try {
      // Use the exact same initialization as the working HTML
      const map = new window.mappls.Map(mapRef.current, {
        center: [20.2961, 85.8245], // Bhubaneswar
        zoom: 10
      });

      map.addListener('load', function() { 
        var direction_option = {
          map: map,
          divWidth: '350px',
          isDraggable: false,
          start: { 
            label: 'Bhubaneswar', 
            geoposition: "20.2961,85.8245" 
          },
          end: { 
            label: 'Puri', 
            geoposition: "19.8133,85.8315" 
          },
          Profile: ['driving','biking','trucking','walking']
        };
        window.mappls.direction(direction_option, function(data: any) {
          console.log('Directions loaded:', data);
        });
      });

      setIsLoaded(true);
    } catch (error) {
      console.error('Error initializing map:', error);
    }
  };

  return (
    <div 
      ref={mapRef}
      style={{ 
        width: width, 
        height: height,
        margin: 0,
        padding: 0
      }}
      className={className}
    />
  );
};

export default WorkingMapplsMap;
