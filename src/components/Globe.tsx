'use client';

import React, { useRef, useState, useEffect } from 'react';

// Dynamically import react-globe.gl to avoid SSR issues
const Globe = React.lazy(() => import('react-globe.gl'));

const GlobeComponent = ({ 
  data = [
    { lat: 37.7749, lng: -122.4194, size: 10, color: 'rgba(0, 255, 136, 0.8)', name: 'San Francisco' },
    { lat: 40.7128, lng: -74.0060, size: 15, color: 'rgba(0, 136, 255, 0.8)', name: 'New York' },
    { lat: 51.5074, lng: -0.1278, size: 8, color: 'rgba(255, 0, 136, 0.8)', name: 'London' },
    { lat: 48.8566, lng: 2.3522, size: 7, color: 'rgba(255, 136, 0, 0.8)', name: 'Paris' },
    { lat: 52.5200, lng: 13.4050, size: 6, color: 'rgba(136, 0, 255, 0.8)', name: 'Berlin' },
    { lat: 35.6762, lng: 139.6503, size: 12, color: 'rgba(0, 255, 255, 0.8)', name: 'Tokyo' },
    { lat: 19.0760, lng: 72.8777, size: 20, color: 'rgba(0, 255, 136, 0.8)', name: 'Mumbai' },
    { lat: -33.8688, lng: 151.2093, size: 5, color: 'rgba(0, 136, 255, 0.8)', name: 'Sydney' },
    { lat: -23.5505, lng: -46.6333, size: 10, color: 'rgba(255, 0, 136, 0.8)', name: 'São Paulo' }
  ],
  height = '100%',
  width = '100%'
}) => {
  const globeEl = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Auto-rotate the globe
    const interval = setInterval(() => {
      if (globeEl.current) {
        const globeInstance = (globeEl.current as any).controls?.();
        if (globeInstance) {
          globeInstance.autoRotate = true;
          globeInstance.autoRotateSpeed = 0.5;
          globeInstance.update();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) return null;

  return (
    <div style={{ 
      height, 
      width, 
      overflow: 'hidden', 
      borderRadius: '0.5rem',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Globe
        ref={globeEl}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={data}
        pointAltitude={0.05}
        pointRadius={(d: any) => d.size}
        pointColor={(d: any) => d.color}
        pointLabel={(d: any) => d.name}
        onPointClick={(point: any) => {
          console.log('Clicked on:', point);
          // You could add a popup or navigate to a country-specific page
        }}
        animateIn={true}
        initialCameraDistance={6.0}
        globeOffset={[0, 0]}
        onGlobeReady={() => {
          // Center the globe when it's ready
          if (globeEl.current) {
            // Set initial point of view to center the globe
            (globeEl.current as any).pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
          }
        }}
      />
    </div>
  );
};

export default GlobeComponent;
