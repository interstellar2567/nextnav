"use client";
import React from 'react';

interface SimpleMapplsMapProps {
  height?: string;
  width?: string;
  className?: string;
}

const SimpleMapplsMap: React.FC<SimpleMapplsMapProps> = ({
  height = "400px",
  width = "100%",
  className = ""
}) => {
  return (
    <div 
      style={{ 
        width: width, 
        height: height,
        position: 'relative'
      }}
      className={className}
    >
      <iframe
        src="/map-test.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          borderRadius: '8px'
        }}
        title="Mappls Map"
      />
    </div>
  );
};

export default SimpleMapplsMap;
