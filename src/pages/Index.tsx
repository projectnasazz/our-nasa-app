import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Map, Users, Zap, Shield, BarChart3, Satellite, Eye, Brain, ChevronRight, Play, Calendar, Mountain, Wheat, Settings, User, MessageSquare, Mic, LogIn, UserPlus } from "lucide-react";
import heroWeather from "@/assets/hero-weather.jpg";
import aeroClimeLogo from "@/assets/aurasphere-logo.png";
import weatherSatellite from "@/assets/weather-satellite.jpg";
import aiWeatherBrain from "@/assets/ai-weather-brain.jpg";
import weatherAnalytics from "@/assets/weather-analytics.jpg";
import outdoorActivity from "@/assets/outdoor-activity.jpg";
import eventFestival from "@/assets/event-festival.jpg";
import agricultureFarm from "@/assets/agriculture-farm.jpg";
import { AIChatSystem } from "@/components/AIChatSystem";
import { VoiceChatSystem } from "@/components/VoiceChatSystem";
import { AuthModal } from "@/components/AuthModal";
import { UserProfileDropdown } from "@/components/UserProfileDropdown";
import { useAuth } from "@/contexts/AuthContext";
const Index = () => {
  console.log("AeroClime Index component loaded successfully!");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [showAIChat, setShowAIChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'signin' | 'signup'>('signin');
  const userProfiles = [{
    id: "outdoor-enthusiast",
    title: "Outdoor Enthusiast",
    description: "Perfect conditions for hiking, camping, sports & adventures",
    details: ["UV Index & Sun Protection", "Air Quality Analysis", "Wind Speed & Direction", "Trail Conditions"],
    icon: Mountain,
    color: "from-blue-500 to-cyan-500",
    longDescription: "Whether you're planning a weekend hike, organizing a sports event, or heading out for camping, get detailed atmospheric conditions to ensure your outdoor adventures are safe and enjoyable."
  }, {
    id: "event-planner",
    title: "Event Planner", 
    description: "Flawless weather for weddings, festivals & gatherings",
    details: ["7-Day Detailed Forecast", "Guest Comfort Index", "Venue Weather Conditions", "Backup Plan Alerts"],
    icon: Calendar,
    color: "from-yellow-500 to-orange-500",
    longDescription: "Plan perfect outdoor events with confidence. Get precise weather predictions, guest comfort analysis, and timely alerts to ensure your special occasions go off without a hitch."
  }, {
    id: "farmer",
    title: "Agriculture",
    description: "Smart farming with precise weather & soil insights", 
    details: ["Soil Moisture Levels", "Rainfall Predictions", "Growing Degree Days", "Frost Warnings"],
    icon: Wheat,
    color: "from-green-500 to-emerald-500",
    longDescription: "Optimize your farming operations with precision agriculture insights. Monitor soil conditions, predict optimal planting times, and protect your crops with advanced weather analytics."
  }];
  const features = [{
    icon: Satellite,
    title: "Real-Time Weather Data",
    description: "Live satellite data and weather stations providing accurate, up-to-the-minute conditions"
  }, {
    icon: Brain,
    title: "AI Weather Predictions",
    description: "Machine learning models analyze 30+ years of climate data for precise forecasting"
  }, {
    icon: Shield,
    title: "Weather Alerts",
    description: "Intelligent early warning system for severe weather and changing conditions"
  }, {
    icon: BarChart3,
    title: "Climate Analytics",
    description: "Comprehensive weather analysis with personalized insights for your activities"
  }];
  return <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={aeroClimeLogo} alt="AeroClime" className="w-8 h-8" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-aurora bg-clip-text text-transparent">
                  AeroClime
                </span>
                <span className="text-xs text-muted-foreground">Weather Intelligence</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <Button variant="glass" size="sm" onClick={() => navigate('/map')}>
                <Map className="w-4 h-4 mr-2" />
                Weather Map
              </Button>
              <Button variant="glass" size="sm" onClick={() => navigate('/globe')}>
                <Globe className="w-4 h-4 mr-2" />
                Climate Globe
              </Button>
              <Button variant="cosmic" size="sm" onClick={() => setShowAIChat(true)}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Weather AI
              </Button>
              <Button variant="voice" size="sm" onClick={() => setShowVoiceChat(true)}>
                <Mic className="w-4 h-4 mr-2" />
                Voice Weather
              </Button>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Settings className="w-4 h-4" />
                </Button>
                {user ? (
                  <UserProfileDropdown />
                ) : (
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="glass" 
                      size="sm" 
                      onClick={() => {
                        setAuthModalTab('signin');
                        setShowAuthModal(true);
                      }}
                    >
                      <LogIn className="w-4 h-4 mr-2" />
                      Sign In
                    </Button>
                    <Button 
                      variant="cosmic" 
                      size="sm" 
                      onClick={() => {
                        setAuthModalTab('signup');
                        setShowAuthModal(true);
                      }}
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: `url(${heroWeather})`
      }} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/90" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="mb-8 pt-24 mt-16">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 cosmic-float">
              <span className="bg-gradient-aurora bg-clip-text text-transparent">
                Weather Intelligence
              </span>
              <br />
              <span className="text-4xl md:text-6xl text-foreground/80">
                Powered by AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-foreground/90 mb-8 max-w-4xl mx-auto font-medium mt-8">
              Advanced weather forecasting and climate intelligence for smarter outdoor decisions and perfect planning
            </p>
            
            {/* Weather Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">99.8%</p>
                <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">24/7</p>
                <p className="text-sm text-muted-foreground">Real-time Updates</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">50K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div className="glass-card p-4 text-center">
                <p className="text-2xl font-bold text-primary">15+</p>
                <p className="text-sm text-muted-foreground">Weather Sources</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button variant="hero" size="lg" onClick={() => navigate('/dashboard')}>
                <Satellite className="w-5 h-5 mr-2" />
                Get Forecast
              </Button>
              <Button variant="glass" size="lg" onClick={() => navigate('/map')}>
                <Map className="w-5 h-5 mr-2" />
                Weather Map
              </Button>
              {!user && (
                <Button 
                  variant="cosmic" 
                  size="lg" 
                  onClick={() => {
                    setAuthModalTab('signup');
                    setShowAuthModal(true);
                  }}
                >
                  <UserPlus className="w-5 h-5 mr-2" />
                  Get Started
                </Button>
              )}
            </div>
          </div>

          {/* Profile Selection */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-4">Choose Your Activity</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized weather insights tailored to your specific outdoor activities and needs
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {userProfiles.map(profile => {
              const IconComponent = profile.icon;
              const isSelected = selectedProfile === profile.id;
              const getBackgroundImage = (id: string) => {
                if (id === "outdoor-enthusiast") return outdoorActivity;
                if (id === "event-planner") return eventFestival;
                if (id === "farmer") return agricultureFarm;
                return null;
              };
              const backgroundImage = getBackgroundImage(profile.id);
              return <Card key={profile.id} className={`glass-card p-6 cursor-pointer transition-all duration-500 hover:scale-105 relative overflow-hidden ${isSelected ? 'border-primary shadow-glow' : 'hover:border-accent/50'}`} onClick={() => navigate(`/${profile.id}`)}>
                    {backgroundImage && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300" 
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                      />
                    )}
                    <div className="relative z-10">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${profile.color} flex items-center justify-center shadow-data`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-xl font-semibold mb-2 text-center">{profile.title}</h3>
                      <p className="text-muted-foreground text-center mb-4 text-sm">{profile.description}</p>
                      
                      <div className="space-y-2 mb-6">
                        {profile.details.map((detail, index) => <div key={index} className="flex items-center text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-status-excellent mr-2"></div>
                            {detail}
                          </div>)}
                      </div>
                    </div>
                  </Card>;
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-background/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Advanced Weather Intelligence</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by satellite data, AI predictions, and real-time atmospheric monitoring
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
            const IconComponent = feature.icon;
            const getBackgroundImage = (index: number) => {
              switch(index) {
                case 0: return weatherSatellite; // Real-Time Weather Data
                case 1: return aiWeatherBrain; // AI Weather Predictions
                case 2: return weatherAnalytics; // Weather Alerts
                case 3: return weatherAnalytics; // Climate Analytics
                default: return null;
              }
            };
            const backgroundImage = getBackgroundImage(index);
            return <Card key={index} className="glass-card p-8 hover:border-accent/50 transition-all duration-300 relative overflow-hidden">
                  {backgroundImage && (
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300" 
                      style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                  )}
                  <div className="relative z-10 flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-earth flex items-center justify-center shadow-data flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </Card>;
          })}
          </div>
        </div>
      </section>

      {/* AI Features Showcase */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">AI-Powered Weather Assistance</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience intelligent weather guidance with AI assistants and voice-powered atmospheric insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="glass-card p-8 hover:border-accent/50 transition-all duration-300 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300" 
                style={{ backgroundImage: `url(${aiWeatherBrain})` }}
              />
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-aurora flex items-center justify-center shadow-data flex-shrink-0">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Smart Weather Assistant</h3>
                  <p className="text-muted-foreground mb-4">
                    Get personalized weather insights, activity recommendations, and climate advice tailored to your specific needs and location.
                  </p>
                  <Button variant="cosmic" onClick={() => setShowAIChat(true)}>
                    Try Weather AI
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="glass-card p-8 hover:border-accent/50 transition-all duration-300 relative overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300" 
                style={{ backgroundImage: `url(${weatherSatellite})` }}
              />
              <div className="relative z-10 flex items-start gap-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-safe flex items-center justify-center shadow-data flex-shrink-0">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-3">Voice Weather Guide</h3>
                  <p className="text-muted-foreground mb-4">
                    Natural voice interactions for weather inquiries. Ask questions about conditions, forecasts, and climate - get instant spoken responses.
                  </p>
                  <Button variant="voice" onClick={() => setShowVoiceChat(true)}>
                    Start Voice Weather
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Weather Data Sources */}
      <section className="py-20 bg-background/30 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5" 
          style={{ backgroundImage: `url(${weatherSatellite})` }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Global Weather Intelligence Network</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our advanced weather system aggregates data from multiple sources worldwide to deliver the most accurate forecasts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-aurora flex items-center justify-center">
                <Satellite className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Weather Satellites</h3>
              <p className="text-muted-foreground text-sm mb-3">Real-time atmospheric imaging from geostationary and polar orbiting satellites</p>
              <Badge variant="secondary" className="text-xs">NOAA • GOES • MeteoSat</Badge>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-earth flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Ground Stations</h3>
              <p className="text-muted-foreground text-sm mb-3">Over 40,000 weather monitoring stations across all continents</p>
              <Badge variant="secondary" className="text-xs">WMO • ASOS • AWOS</Badge>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-safe flex items-center justify-center">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Weather Radars</h3>
              <p className="text-muted-foreground text-sm mb-3">Doppler radar network for precipitation and storm tracking</p>
              <Badge variant="secondary" className="text-xs">NEXRAD • WSR-88D</Badge>
            </Card>

            <Card className="glass-card p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-cosmic flex items-center justify-center">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Models</h3>
              <p className="text-muted-foreground text-sm mb-3">Machine learning algorithms processing 30+ years of climate data</p>
              <Badge variant="secondary" className="text-xs">GFS • ECMWF • AI/ML</Badge>
            </Card>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-5" 
          style={{ backgroundImage: `url(${aiWeatherBrain})` }}
        />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl font-bold mb-6">Advanced Weather Computing</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Powered by cutting-edge meteorological models and artificial intelligence to deliver unprecedented forecast accuracy
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-aurora flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">High-Performance Computing</h3>
                    <p className="text-muted-foreground">Supercomputer clusters processing billions of atmospheric data points every hour</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-earth flex items-center justify-center flex-shrink-0">
                    <Brain className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Machine Learning Pipeline</h3>
                    <p className="text-muted-foreground">Neural networks trained on decades of weather patterns for predictive accuracy</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-gradient-safe flex items-center justify-center flex-shrink-0">
                    <BarChart3 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Real-Time Analytics</h3>
                    <p className="text-muted-foreground">Continuous data fusion and analysis for instant weather insights</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-cosmic flex items-center justify-center">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Severe Weather Detection</h3>
                    <p className="text-sm text-muted-foreground">Advanced storm tracking algorithms</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">98.5%</p>
                    <p className="text-xs text-muted-foreground">Storm Prediction</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">15min</p>
                    <p className="text-xs text-muted-foreground">Alert Speed</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">24/7</p>
                    <p className="text-xs text-muted-foreground">Monitoring</p>
                  </div>
                </div>
              </Card>

              <Card className="glass-card p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-aurora flex items-center justify-center">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Global Coverage</h3>
                    <p className="text-sm text-muted-foreground">Worldwide weather intelligence</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-primary">195</p>
                    <p className="text-xs text-muted-foreground">Countries</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">1M+</p>
                    <p className="text-xs text-muted-foreground">Locations</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">∞</p>
                    <p className="text-xs text-muted-foreground">Data Points</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <Card className="glass-card p-12 text-center max-w-4xl mx-auto border-primary/30 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10 hover:opacity-20 transition-opacity duration-300" 
              style={{ backgroundImage: `url(${weatherAnalytics})` }}
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">Ready for Perfect Weather Planning?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users making smarter decisions with AI-powered weather intelligence
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" onClick={() => navigate('/dashboard')}>
                  <Satellite className="w-5 h-5 mr-2" />
                  Start Forecasting
                </Button>
                <Button variant="glass" size="lg" onClick={() => navigate('/globe')}>
                  <Globe className="w-5 h-5 mr-2" />
                  Explore Climate
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <img src={aeroClimeLogo} alt="AeroClime" className="w-6 h-6" />
              <span className="font-semibold bg-gradient-aurora bg-clip-text text-transparent">
                AeroClime
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              AI-Powered Weather Intelligence • Perfect Conditions, Every Time
            </p>
          </div>
        </div>
      </footer>

      {/* AI Chat Modal */}
      {showAIChat && <AIChatSystem onClose={() => setShowAIChat(false)} selectedProfile={selectedProfile} />}

      {/* Voice Chat Modal */}
      {showVoiceChat && <VoiceChatSystem onClose={() => setShowVoiceChat(false)} />}

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        defaultTab={authModalTab}
      />
    </div>;
};
export default Index;