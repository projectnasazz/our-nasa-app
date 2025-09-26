import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search,
  MapPin,
  Thermometer,
  Cloud,
  Wind,
  Eye,
  Sun,
  Droplets,
  Activity
} from "lucide-react";

interface WeatherMapProps {
  className?: string;
  showMapboxInput?: boolean;
}

export const WeatherMap = ({ className, showMapboxInput = true }: WeatherMapProps) => {
  const [mapboxToken, setMapboxToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(showMapboxInput);
  const [mapLoaded, setMapLoaded] = useState(false);

  // For demo purposes, we'll show the token input and a simulated map
  // In production, this would integrate with actual Mapbox
  
  const weatherStations = [
    { id: 1, name: 'San Francisco', lat: 37.7749, lon: -122.4194, temp: 72, status: 'excellent' },
    { id: 2, name: 'New York', lat: 40.7128, lon: -74.0060, temp: 68, status: 'good' },
    { id: 3, name: 'Miami', lat: 25.7617, lon: -80.1918, temp: 84, status: 'moderate' },
    { id: 4, name: 'Seattle', lat: 47.6062, lon: -122.3321, temp: 65, status: 'good' },
    { id: 5, name: 'Denver', lat: 39.7392, lon: -104.9903, temp: 70, status: 'excellent' }
  ];

  const handleTokenSubmit = () => {
    if (mapboxToken.startsWith('pk.')) {
      setMapLoaded(true);
      setShowTokenInput(false);
    } else {
      alert('Please enter a valid Mapbox public token starting with "pk."');
    }
  };

  if (showTokenInput && !mapLoaded) {
    return (
      <Card className={`glass-card p-8 ${className}`}>
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-gradient-aurora rounded-full mx-auto flex items-center justify-center">
            <MapPin className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-xl font-semibold">Connect Mapbox</h3>
          <p className="text-muted-foreground">
            To display interactive weather maps, please enter your Mapbox public token.
            You can get one free at{' '}
            <a 
              href="https://mapbox.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="flex gap-2 max-w-md mx-auto">
            <Input
              placeholder="pk.your_mapbox_token_here"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTokenSubmit} variant="cosmic">
              Connect
            </Button>
          </div>
          <Button 
            variant="glass" 
            size="sm"
            onClick={() => {
              setMapLoaded(true);
              setShowTokenInput(false);
            }}
          >
            Continue with Demo Map
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Card className="glass-card overflow-hidden">
        {/* Demo Weather Map */}
        <div className="relative h-96 bg-gradient-to-br from-blue-900 via-slate-800 to-green-900">
          
          {/* Animated Weather Patterns */}
          <div className="absolute inset-0 opacity-30">
            <div className="weather-pattern-1 absolute top-10 left-10 w-32 h-32 bg-gradient-radial from-blue-400/20 to-transparent rounded-full animate-pulse" />
            <div className="weather-pattern-2 absolute top-20 right-20 w-24 h-24 bg-gradient-radial from-red-400/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="weather-pattern-3 absolute bottom-16 left-1/3 w-40 h-40 bg-gradient-radial from-green-400/20 to-transparent rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          {/* Weather Stations */}
          {weatherStations.map((station, index) => (
            <div
              key={station.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{
                left: `${15 + index * 18}%`,
                top: `${30 + (index % 2) * 25}%`
              }}
            >
              <div className={`w-4 h-4 rounded-full shadow-lg transition-all duration-300 group-hover:scale-150 ${
                station.status === 'excellent' ? 'bg-green-500' :
                station.status === 'good' ? 'bg-blue-500' :
                station.status === 'moderate' ? 'bg-yellow-500' : 'bg-red-500'
              }`} />
              
              {/* Station Info Popup */}
              <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-background/95 backdrop-blur-sm px-3 py-2 rounded-lg border shadow-lg text-sm">
                  <div className="font-medium">{station.name}</div>
                  <div className="text-muted-foreground">{station.temp}°F</div>
                </div>
              </div>
            </div>
          ))}

          {/* Weather Overlay Grid */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute border-white/5"
                style={{
                  left: `${i * 12.5}%`,
                  top: 0,
                  bottom: 0,
                  borderLeftWidth: i > 0 ? '1px' : 0
                }}
              />
            ))}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute border-white/5"
                style={{
                  top: `${i * 16.67}%`,
                  left: 0,
                  right: 0,
                  borderTopWidth: i > 0 ? '1px' : 0
                }}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm p-3 rounded-lg border">
            <h4 className="text-sm font-medium mb-2">Air Quality Status</h4>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span>Excellent (0-50)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full" />
                <span>Good (51-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <span>Moderate (101-150)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <span>Unhealthy (151+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Controls */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Live Data
              </Badge>
              <span className="text-sm text-muted-foreground">
                Last updated: 2 minutes ago
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="glass" size="sm">
                <Search className="w-4 h-4 mr-1" />
                Search Location
              </Button>
              {!mapboxToken && (
                <Button 
                  variant="cosmic" 
                  size="sm"
                  onClick={() => setShowTokenInput(true)}
                >
                  <MapPin className="w-4 h-4 mr-1" />
                  Enable Full Maps
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};