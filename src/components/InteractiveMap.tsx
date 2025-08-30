import { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Map as MapIcon, 
  Layers, 
  ZoomIn, 
  ZoomOut, 
  Navigation, 
  MapPin,
  Cloud,
  Thermometer,
  Wind,
  Eye,
  Droplets,
  Sun
} from "lucide-react";

interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'event' | 'weather' | 'air-quality' | 'uv';
  score: number;
  data: {
    temperature?: number;
    humidity?: number;
    airQuality?: number;
    uvIndex?: number;
    windSpeed?: number;
    precipitation?: number;
  };
}

interface InteractiveMapProps {
  className?: string;
}

export const InteractiveMap = ({ className }: InteractiveMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);
  const [activeLayer, setActiveLayer] = useState<'temperature' | 'air-quality' | 'precipitation' | 'uv'>('temperature');
  const [zoomLevel, setZoomLevel] = useState(10);

  // Mock location data - in real app this would come from NASA APIs
  const locations: MapLocation[] = [
    {
      id: '1',
      name: 'Golden Gate Park',
      coordinates: [-122.4194, 37.7749],
      type: 'event',
      score: 92,
      data: {
        temperature: 72,
        humidity: 55,
        airQuality: 35,
        uvIndex: 4,
        windSpeed: 8,
        precipitation: 5
      }
    },
    {
      id: '2',
      name: 'Central Park',
      coordinates: [-73.9665, 40.7812],
      type: 'event',
      score: 88,
      data: {
        temperature: 75,
        humidity: 62,
        airQuality: 45,
        uvIndex: 6,
        windSpeed: 12,
        precipitation: 15
      }
    },
    {
      id: '3',
      name: 'Griffith Observatory',
      coordinates: [-118.3004, 34.1184],
      type: 'event',
      score: 85,
      data: {
        temperature: 78,
        humidity: 45,
        airQuality: 55,
        uvIndex: 8,
        windSpeed: 6,
        precipitation: 2
      }
    },
    {
      id: '4',
      name: 'Millennium Park',
      coordinates: [-87.6226, 41.8827],
      type: 'event',
      score: 79,
      data: {
        temperature: 68,
        humidity: 70,
        airQuality: 40,
        uvIndex: 5,
        windSpeed: 15,
        precipitation: 25
      }
    }
  ];

  const layers = [
    { id: 'temperature', name: 'Temperature', icon: Thermometer, color: 'from-blue-500 to-red-500' },
    { id: 'air-quality', name: 'Air Quality', icon: Eye, color: 'from-green-500 to-yellow-500' },
    { id: 'precipitation', name: 'Precipitation', icon: Droplets, color: 'from-gray-400 to-blue-600' },
    { id: 'uv', name: 'UV Index', icon: Sun, color: 'from-yellow-400 to-orange-600' }
  ];

  const getLocationColor = (location: MapLocation) => {
    switch (activeLayer) {
      case 'temperature':
        const temp = location.data.temperature || 0;
        return temp > 80 ? 'bg-red-500' : temp > 70 ? 'bg-orange-500' : temp > 60 ? 'bg-yellow-500' : 'bg-blue-500';
      case 'air-quality':
        const aqi = location.data.airQuality || 0;
        return aqi > 100 ? 'bg-red-500' : aqi > 50 ? 'bg-yellow-500' : 'bg-green-500';
      case 'precipitation':
        const precip = location.data.precipitation || 0;
        return precip > 50 ? 'bg-blue-700' : precip > 20 ? 'bg-blue-500' : 'bg-blue-300';
      case 'uv':
        const uv = location.data.uvIndex || 0;
        return uv > 8 ? 'bg-red-500' : uv > 6 ? 'bg-orange-500' : uv > 3 ? 'bg-yellow-500' : 'bg-green-500';
      default:
        return 'bg-primary';
    }
  };

  const handleLocationClick = (location: MapLocation) => {
    setSelectedLocation(location);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 20) setZoomLevel(prev => prev + 1);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 1) setZoomLevel(prev => prev - 1);
  };

  // Simulate map interaction
  useEffect(() => {
    const handleMapClick = (e: MouseEvent) => {
      if (mapRef.current && !e.target || !(e.target as HTMLElement).closest('.location-marker')) {
        setSelectedLocation(null);
      }
    };

    document.addEventListener('click', handleMapClick);
    return () => document.removeEventListener('click', handleMapClick);
  }, []);

  return (
    <Card className={`relative overflow-hidden border-primary/30 ${className}`}>
      {/* Map Container */}
      <div 
        ref={mapRef}
        className="relative w-full h-96 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.2) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(245, 101, 101, 0.2) 0%, transparent 50%)
          `
        }}
      >
        {/* Layer Visualization Background */}
        <div className={`absolute inset-0 opacity-20 bg-gradient-to-br ${layers.find(l => l.id === activeLayer)?.color}`} />

        {/* Location Markers */}
        {locations.map((location) => (
          <div
            key={location.id}
            className="location-marker absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${((location.coordinates[0] + 180) / 360) * 100}%`,
              top: `${((90 - location.coordinates[1]) / 180) * 100}%`,
              transform: `scale(${Math.max(0.5, zoomLevel / 10)})`,
            }}
            onClick={() => handleLocationClick(location)}
          >
            <div className={`w-4 h-4 rounded-full ${getLocationColor(location)} shadow-lg transition-all duration-300 group-hover:scale-150 ${
              selectedLocation?.id === location.id ? 'scale-150 shadow-glow' : ''
            }`} />
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium whitespace-nowrap">
                {location.name}
              </div>
            </div>
          </div>
        ))}

        {/* Selected Location Info */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="glass-card p-4 border-primary/30">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{selectedLocation.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedLocation.coordinates[1].toFixed(4)}, {selectedLocation.coordinates[0].toFixed(4)}
                  </p>
                </div>
                <Badge variant="secondary">
                  Score: {selectedLocation.score}/100
                </Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                {selectedLocation.data.temperature && (
                  <div className="flex items-center gap-2">
                    <Thermometer className="w-4 h-4 text-orange-500" />
                    <span>{selectedLocation.data.temperature}°F</span>
                  </div>
                )}
                {selectedLocation.data.humidity && (
                  <div className="flex items-center gap-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <span>{selectedLocation.data.humidity}%</span>
                  </div>
                )}
                {selectedLocation.data.airQuality && (
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-green-500" />
                    <span>AQI {selectedLocation.data.airQuality}</span>
                  </div>
                )}
                {selectedLocation.data.uvIndex && (
                  <div className="flex items-center gap-2">
                    <Sun className="w-4 h-4 text-yellow-500" />
                    <span>UV {selectedLocation.data.uvIndex}</span>
                  </div>
                )}
                {selectedLocation.data.windSpeed && (
                  <div className="flex items-center gap-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <span>{selectedLocation.data.windSpeed} mph</span>
                  </div>
                )}
                {selectedLocation.data.precipitation && (
                  <div className="flex items-center gap-2">
                    <Cloud className="w-4 h-4 text-blue-600" />
                    <span>{selectedLocation.data.precipitation}%</span>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button variant="glass" size="icon" onClick={handleZoomIn}>
          <ZoomIn className="w-4 h-4" />
        </Button>
        <Button variant="glass" size="icon" onClick={handleZoomOut}>
          <ZoomOut className="w-4 h-4" />
        </Button>
        <Button variant="glass" size="icon">
          <Navigation className="w-4 h-4" />
        </Button>
      </div>

      {/* Layer Controls */}
      <div className="absolute top-4 left-4">
        <Card className="glass-panel p-2">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="w-4 h-4" />
            <span className="text-sm font-medium">Layers</span>
          </div>
          <div className="space-y-1">
            {layers.map((layer) => {
              const IconComponent = layer.icon;
              return (
                <Button
                  key={layer.id}
                  variant={activeLayer === layer.id ? "cosmic" : "ghost"}
                  size="sm"
                  onClick={() => setActiveLayer(layer.id as any)}
                  className="w-full justify-start"
                >
                  <IconComponent className="w-3 h-3 mr-2" />
                  {layer.name}
                </Button>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 right-4">
        <Card className="glass-panel p-3">
          <h4 className="text-sm font-medium mb-2">{layers.find(l => l.id === activeLayer)?.name}</h4>
          <div className="space-y-1 text-xs">
            {activeLayer === 'temperature' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded" />
                  <span>&lt;60°F</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded" />
                  <span>60-70°F</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded" />
                  <span>70-80°F</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span>&gt;80°F</span>
                </div>
              </>
            )}
            {activeLayer === 'air-quality' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span>Good (0-50)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded" />
                  <span>Moderate (51-100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span>Unhealthy (100+)</span>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>
    </Card>
  );
};