import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mic, 
  Layers,
  Navigation,
  Search
} from "lucide-react";
import { InteractiveMap } from "@/components/InteractiveMap";
import { AIChatSystem } from "@/components/AIChatSystem";
import { VoiceChatSystem } from "@/components/VoiceChatSystem";
import { Input } from "@/components/ui/input";
import weatherWiseLogo from "@/assets/aurasphere-logo.png";

const MapView = () => {
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background">
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
                    WeatherWise Map
                  </span>
                  <span className="text-xs text-muted-foreground">Interactive Weather Data</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search locations..."
                  className="pl-10 w-64 bg-background/50 border-white/20"
                />
              </div>
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
      <div className="pt-20 p-6">
        <div className="container mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Interactive Environmental Map</h1>
            <p className="text-muted-foreground">
              Explore real-time environmental data powered by NASA satellite imagery and climate models
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Map */}
            <div className="lg:col-span-3">
              <InteractiveMap className="h-[70vh]" />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4">Environmental Layers</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Temperature</span>
                    <div className="w-16 h-2 bg-gradient-to-r from-blue-500 to-red-500 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Air Quality</span>
                    <div className="w-16 h-2 bg-gradient-to-r from-green-500 to-red-500 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Precipitation</span>
                    <div className="w-16 h-2 bg-gradient-to-r from-gray-300 to-blue-600 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">UV Index</span>
                    <div className="w-16 h-2 bg-gradient-to-r from-green-400 to-red-500 rounded" />
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button variant="cosmic" className="w-full justify-start">
                    <Layers className="w-4 h-4 mr-2" />
                    Toggle Layers
                  </Button>
                  <Button variant="glass" className="w-full justify-start">
                    <Navigation className="w-4 h-4 mr-2" />
                    My Location
                  </Button>
                  <Button variant="glass" className="w-full justify-start" onClick={() => navigate('/globe')}>
                    <Navigation className="w-4 h-4 mr-2" />
                    3D Globe View
                  </Button>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <h3 className="font-semibold mb-4">Data Sources</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>• NASA MODIS Satellite Data</p>
                  <p>• NOAA Weather Stations</p>
                  <p>• EPA Air Quality Index</p>
                  <p>• UV Index from NESDIS</p>
                  <p>• Real-time IoT Sensors</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
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

export default MapView;