import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowLeft, 
  MessageSquare, 
  Mic, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Map,
  Globe,
  Calendar,
  Mountain,
  Wheat,
  Cloud,
  Thermometer,
  Wind,
  Eye,
  Sun,
  Droplets,
  Activity
} from "lucide-react";
import { AIChatSystem } from "@/components/AIChatSystem";
import { VoiceChatSystem } from "@/components/VoiceChatSystem";
import { InteractiveMap } from "@/components/InteractiveMap";
import weatherWiseLogo from "@/assets/aurasphere-logo.png";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("outdoor-enthusiast");

  const environmentalMetrics = [
    {
      label: "Air Quality Index",
      value: 42,
      status: "good",
      trend: "up",
      icon: Eye,
      color: "text-status-excellent"
    },
    {
      label: "Temperature",
      value: 72,
      status: "optimal",
      trend: "stable",
      icon: Thermometer,
      color: "text-accent",
      unit: "°F"
    },
    {
      label: "UV Index",
      value: 4,
      status: "moderate",
      trend: "up",
      icon: Sun,
      color: "text-status-moderate"
    },
    {
      label: "Humidity",
      value: 55,
      status: "comfortable",
      trend: "down",
      icon: Droplets,
      color: "text-accent",
      unit: "%"
    }
  ];

  const alerts = [
    {
      id: 1,
      type: "warning",
      title: "UV Index Rising",
      message: "UV levels expected to reach 8+ this afternoon. Consider indoor activities.",
      time: "2 hours ago"
    },
    {
      id: 2,
      type: "info",
      title: "Air Quality Improved",
      message: "AQI has dropped to excellent levels (35) in your area.",
      time: "4 hours ago"
    },
    {
      id: 3,
      type: "success",
      title: "Perfect Event Weather",
      message: "Ideal conditions detected for outdoor events this weekend.",
      time: "6 hours ago"
    }
  ];

  const recommendations = [
    {
      title: "Golden Gate Park",
      score: 94,
      type: "Outdoor Wedding",
      reasons: ["Perfect temperature", "Low precipitation", "Excellent air quality"],
      coordinates: [-122.4194, 37.7749]
    },
    {
      title: "Central Park",
      score: 89,
      type: "Music Festival",
      reasons: ["Good acoustics", "Accessible", "Moderate weather"],
      coordinates: [-73.9665, 40.7812]
    },
    {
      title: "Griffith Observatory",
      score: 86,
      type: "Corporate Event",
      reasons: ["Clear skies", "Low humidity", "Great visibility"],
      coordinates: [-118.3004, 34.1184]
    }
  ];

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
                    WeatherWise Dashboard
                  </span>
                  <span className="text-xs text-muted-foreground">Weather Intelligence Center</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="glass" size="sm" onClick={() => navigate('/map')}>
                <Map className="w-4 h-4 mr-2" />
                Map View
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
      <div className="pt-20 p-6">
        <div className="container mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Environmental Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time environmental intelligence for smarter decision making
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              Last updated: 2 min ago
            </Badge>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {environmentalMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <Card key={index} className="glass-card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-earth flex items-center justify-center`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className={`flex items-center gap-1 ${
                      metric.trend === 'up' ? 'text-accent' : 
                      metric.trend === 'down' ? 'text-destructive' : 'text-muted-foreground'
                    }`}>
                      <TrendingUp className="w-4 h-4" />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      {metric.unit && <span className="text-sm text-muted-foreground mb-1">{metric.unit}</span>}
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {metric.status}
                    </Badge>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Map Preview */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Environmental Map</h2>
                  <Button variant="cosmic" size="sm" onClick={() => navigate('/map')}>
                    View Full Map
                  </Button>
                </div>
                <InteractiveMap className="h-64" />
              </Card>

              {/* AI Recommendations */}
              <Card className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">AI Recommendations</h2>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="p-4 bg-background/30 rounded-lg border border-white/10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold">{rec.title}</h3>
                          <p className="text-sm text-muted-foreground">{rec.type}</p>
                        </div>
                        <Badge variant="default">Score: {rec.score}/100</Badge>
                      </div>
                      <div className="space-y-1">
                        {rec.reasons.map((reason, i) => (
                          <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-status-excellent" />
                            {reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Alerts */}
              <Card className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Environmental Alerts</h2>
                <div className="space-y-4">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="flex gap-3 p-3 bg-background/30 rounded-lg border border-white/10">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                        alert.type === 'warning' ? 'bg-status-moderate' :
                        alert.type === 'success' ? 'bg-status-excellent' :
                        'bg-accent'
                      }`}>
                        {alert.type === 'warning' ? (
                          <AlertTriangle className="w-3 h-3 text-white" />
                        ) : alert.type === 'success' ? (
                          <CheckCircle className="w-3 h-3 text-white" />
                        ) : (
                          <Activity className="w-3 h-3 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mb-1">{alert.message}</p>
                        <p className="text-xs text-muted-foreground">{alert.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Profile Selection */}
              <Card className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Your Profile</h2>
                <div className="space-y-3">
                  {[
                    { id: 'outdoor-enthusiast', name: 'Outdoor Enthusiast', icon: Mountain },
                    { id: 'event-planner', name: 'Event Planner', icon: Calendar },
                    { id: 'farmer', name: 'Agriculture', icon: Wheat }
                  ].map((profile) => {
                    const IconComponent = profile.icon;
                    const isSelected = selectedProfile === profile.id;
                    return (
                      <Button
                        key={profile.id}
                        variant={isSelected ? "cosmic" : "glass"}
                        className="w-full justify-start"
                        onClick={() => setSelectedProfile(profile.id)}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {profile.name}
                      </Button>
                    );
                  })}
                </div>
              </Card>

              {/* Quick Actions */}
              <Card className="glass-card p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="space-y-3">
                  <Button variant="hero" className="w-full justify-start" onClick={() => setShowAIChat(true)}>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Ask AI Assistant
                  </Button>
                  <Button variant="voice" className="w-full justify-start" onClick={() => setShowVoiceChat(true)}>
                    <Mic className="w-4 h-4 mr-2" />
                    Voice Command
                  </Button>
                  <Button variant="glass" className="w-full justify-start" onClick={() => navigate('/globe')}>
                    <Globe className="w-4 h-4 mr-2" />
                    3D Globe View
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat Modal */}
      {showAIChat && (
        <AIChatSystem onClose={() => setShowAIChat(false)} selectedProfile={selectedProfile} />
      )}

      {/* Voice Chat Modal */}
      {showVoiceChat && (
        <VoiceChatSystem onClose={() => setShowVoiceChat(false)} />
      )}
    </div>
  );
};

export default Dashboard;