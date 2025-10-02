import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mic, 
  Map,
  Info,
  Settings,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Globe as GlobeIcon,
  Satellite,
  Layers
} from "lucide-react";
import { AIChatSystem } from "@/components/AIChatSystem";
import { VoiceChatSystem } from "@/components/VoiceChatSystem";
import { Globe3D } from "@/components/Globe3D";
import weatherWiseLogo from "@/assets/aurasphere-logo.png";
import weatherSatellite from "@/assets/weather-satellite.jpg";

const Globe = () => {
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5" 
        style={{ backgroundImage: `url(${weatherSatellite})` }}
      />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <img src={weatherWiseLogo} alt="WeatherWise" className="w-6 h-6" />
                <div className="flex flex-col">
                  <span className="text-lg font-bold bg-gradient-aurora bg-clip-text text-transparent">
                    3D Globe View
                  </span>
                  <span className="text-xs text-muted-foreground">Interactive Earth Visualization</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="glass" size="sm" onClick={() => navigate('/map')}>
                <Map className="w-4 h-4 mr-2" />
                Map View
              </Button>
              <Button variant="glass" size="sm" onClick={() => navigate('/dashboard')}>
                <GlobeIcon className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button variant="cosmic" size="sm" onClick={() => setShowAIChat(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant
              </Button>
              <Button variant="voice" size="sm" onClick={() => setShowVoiceChat(true)}>
                <Mic className="w-4 h-4 mr-2" />
                Voice Chat
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 relative z-10 h-screen">
        <div className="h-full flex flex-col">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold mb-2">3D Earth Weather Visualization</h1>
                <p className="text-muted-foreground text-sm">
                  Explore real-time global weather data in an interactive 3D environment
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="px-3 py-1">
                  <Satellite className="w-3 h-3 mr-1" />
                  Live Data
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  6 Stations Active
                </Badge>
              </div>
            </div>
          </div>

          {/* Globe Container */}
          <div className="flex-1 relative">
            <Globe3D className="w-full h-full" />
          </div>
        </div>
      </div>

      {/* Controls Panel */}
      <div className="absolute top-32 left-6">
        <Card className="glass-card p-4">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Controls
          </h3>
          <div className="space-y-2">
            <Button variant="glass" size="sm" className="w-full justify-start">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset View
            </Button>
            <Button variant="glass" size="sm" className="w-full justify-start">
              <Layers className="w-4 h-4 mr-2" />
              Toggle Layers
            </Button>
            <Button variant="glass" size="sm" className="w-full justify-start">
              <Info className="w-4 h-4 mr-2" />
              About Data
            </Button>
          </div>
        </Card>
      </div>

      {/* Data Sources Info */}
      <div className="absolute bottom-6 right-6">
        <Card className="glass-card p-4">
          <h3 className="font-semibold mb-3">Data Sources</h3>
          <div className="space-y-1 text-sm text-muted-foreground">
            <p>• NASA Earth Observing System</p>
            <p>• NOAA Global Monitoring Network</p>
            <p>• ESA Copernicus Programme</p>
            <p>• Real-time Weather Stations</p>
            <p>• Satellite Environmental Data</p>
          </div>
        </Card>
      </div>

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChatSystem onClose={() => setShowAIChat(false)} selectedProfile="" />
      )}

      {/* Voice Chat Modal */}
      {showVoiceChat && (
        <VoiceChatSystem onClose={() => setShowVoiceChat(false)} />
      )}
    </div>
  );
};

export default Globe;