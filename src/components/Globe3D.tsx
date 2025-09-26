import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud,
  Thermometer,
  Wind,
  Eye,
  Droplets,
  Sun,
  MapPin
} from "lucide-react";

interface WeatherPoint {
  id: string;
  name: string;
  lat: number;
  lon: number;
  temperature: number;
  humidity: number;
  airQuality: number;
  uvIndex: number;
  windSpeed: number;
  precipitation: number;
}

interface Globe3DProps {
  className?: string;
}

const EarthGlobe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const atmosphereRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  // Create earth texture with procedural generation
  const earthTexture = new THREE.DataTexture(
    new Uint8Array(512 * 512 * 3),
    512,
    512,
    THREE.RGBFormat
  );
  
  // Generate procedural earth-like texture
  const data = earthTexture.image.data;
  for (let i = 0; i < data.length; i += 3) {
    const x = (i / 3) % 512;
    const y = Math.floor((i / 3) / 512);
    const lat = (y / 512) * Math.PI - Math.PI / 2;
    const lon = (x / 512) * Math.PI * 2 - Math.PI;
    
    // Simple land/ocean generation
    const noise = Math.sin(lat * 4) * Math.cos(lon * 6) + 
                  Math.sin(lat * 8) * Math.cos(lon * 3) * 0.5;
    
    if (noise > 0.1) {
      // Land - brown/green
      data[i] = 34 + Math.random() * 40;     // R
      data[i + 1] = 80 + Math.random() * 60;   // G
      data[i + 2] = 20 + Math.random() * 30;   // B
    } else {
      // Ocean - blue
      data[i] = 20 + Math.random() * 20;       // R
      data[i + 1] = 50 + Math.random() * 30;   // G
      data[i + 2] = 120 + Math.random() * 60;  // B
    }
  }
  earthTexture.needsUpdate = true;

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
    if (atmosphereRef.current) {
      atmosphereRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[2, 64, 32]} />
        <meshPhongMaterial map={earthTexture} />
      </mesh>
      
      {/* Atmosphere */}
      <mesh ref={atmosphereRef} scale={1.02}>
        <sphereGeometry args={[2, 32, 16]} />
        <meshBasicMaterial 
          color="#87CEEB"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>
      
      {/* Clouds */}
      <mesh scale={1.005}>
        <sphereGeometry args={[2, 32, 16]} />
        <meshBasicMaterial 
          color="white"
          transparent
          opacity={0.3}
          map={new THREE.TextureLoader().load('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==')}
        />
      </mesh>
    </group>
  );
};

const WeatherMarker = ({ point, onSelect }: { point: WeatherPoint; onSelect: (point: WeatherPoint) => void }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Convert lat/lon to 3D coordinates on sphere
  const phi = (90 - point.lat) * (Math.PI / 180);
  const theta = (point.lon + 180) * (Math.PI / 180);
  const radius = 2.1;
  
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);

  // Color based on temperature
  const getColor = () => {
    const temp = point.temperature;
    if (temp > 80) return '#ff4444';
    if (temp > 70) return '#ff8844';
    if (temp > 60) return '#ffcc44';
    return '#44ccff';
  };

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale);
    }
  });

  return (
    <mesh
      ref={meshRef}
      position={[x, y, z]}
      onClick={() => onSelect(point)}
    >
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshBasicMaterial color={getColor()} />
    </mesh>
  );
};

export const Globe3D = ({ className }: Globe3DProps) => {
  const [selectedPoint, setSelectedPoint] = useState<WeatherPoint | null>(null);
  const [cameraPosition, setCameraPosition] = useState<[number, number, number]>([0, 0, 5]);

  // Sample weather data points
  const weatherPoints: WeatherPoint[] = [
    {
      id: '1',
      name: 'San Francisco, CA',
      lat: 37.7749,
      lon: -122.4194,
      temperature: 72,
      humidity: 55,
      airQuality: 35,
      uvIndex: 4,
      windSpeed: 8,
      precipitation: 5
    },
    {
      id: '2',
      name: 'New York, NY',
      lat: 40.7128,
      lon: -74.0060,
      temperature: 68,
      humidity: 65,
      airQuality: 45,
      uvIndex: 6,
      windSpeed: 12,
      precipitation: 15
    },
    {
      id: '3',
      name: 'London, UK',
      lat: 51.5074,
      lon: -0.1278,
      temperature: 60,
      humidity: 78,
      airQuality: 38,
      uvIndex: 3,
      windSpeed: 15,
      precipitation: 35
    },
    {
      id: '4',
      name: 'Tokyo, Japan',
      lat: 35.6762,
      lon: 139.6503,
      temperature: 75,
      humidity: 70,
      airQuality: 55,
      uvIndex: 7,
      windSpeed: 6,
      precipitation: 20
    },
    {
      id: '5',
      name: 'Sydney, Australia',
      lat: -33.8688,
      lon: 151.2093,
      temperature: 82,
      humidity: 45,
      airQuality: 28,
      uvIndex: 9,
      windSpeed: 10,
      precipitation: 8
    },
    {
      id: '6',
      name: 'Mumbai, India',
      lat: 19.0760,
      lon: 72.8777,
      temperature: 88,
      humidity: 85,
      airQuality: 85,
      uvIndex: 8,
      windSpeed: 4,
      precipitation: 45
    }
  ];

  const handlePointSelect = (point: WeatherPoint) => {
    setSelectedPoint(point);
  };

  const focusOnPoint = (point: WeatherPoint) => {
    const phi = (90 - point.lat) * (Math.PI / 180);
    const theta = (point.lon + 180) * (Math.PI / 180);
    const radius = 4;
    
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.cos(phi);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    
    setCameraPosition([x, y, z]);
  };

  return (
    <div className={`relative w-full h-full bg-black ${className}`}>
      <Canvas camera={{ position: cameraPosition, fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} />
        
        <EarthGlobe />
        
        {weatherPoints.map((point) => (
          <WeatherMarker
            key={point.id}
            point={point}
            onSelect={handlePointSelect}
          />
        ))}
        
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={3}
          maxDistance={10}
          autoRotate={false}
        />
      </Canvas>

      {/* Weather Point Details */}
      {selectedPoint && (
        <div className="absolute bottom-6 left-6 right-6 md:right-auto md:w-80">
          <Card className="glass-card p-6 border-primary/30">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {selectedPoint.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {selectedPoint.lat.toFixed(2)}°, {selectedPoint.lon.toFixed(2)}°
                </p>
              </div>
              <Button 
                variant="cosmic" 
                size="sm"
                onClick={() => focusOnPoint(selectedPoint)}
              >
                Focus
              </Button>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-orange-500" />
                <span>{selectedPoint.temperature}°F</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-blue-500" />
                <span>{selectedPoint.humidity}%</span>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-green-500" />
                <span>AQI {selectedPoint.airQuality}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-yellow-500" />
                <span>UV {selectedPoint.uvIndex}</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="w-4 h-4 text-gray-500" />
                <span>{selectedPoint.windSpeed} mph</span>
              </div>
              <div className="flex items-center gap-2">
                <Cloud className="w-4 h-4 text-blue-600" />
                <span>{selectedPoint.precipitation}%</span>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Location List */}
      <div className="absolute top-6 right-6 w-72 max-h-96 overflow-y-auto">
        <Card className="glass-card p-4">
          <h3 className="font-semibold mb-4">Weather Stations</h3>
          <div className="space-y-2">
            {weatherPoints.map((point) => (
              <Button
                key={point.id}
                variant={selectedPoint?.id === point.id ? "cosmic" : "glass"}
                className="w-full justify-start text-left"
                onClick={() => handlePointSelect(point)}
              >
                <div className="flex items-center gap-2 w-full">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ 
                      backgroundColor: point.temperature > 80 ? '#ff4444' : 
                                     point.temperature > 70 ? '#ff8844' : 
                                     point.temperature > 60 ? '#ffcc44' : '#44ccff'
                    }}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{point.name.split(',')[0]}</div>
                    <div className="text-xs opacity-70">{point.temperature}°F</div>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};