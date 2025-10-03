import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
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
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { WeatherChart } from "@/components/WeatherChart";
import { StatusIndicator, NetworkStatus } from "@/components/StatusIndicator";
import { ParticleField, AnimatedGradient } from "@/components/VisualEffects";
import { getCurrentWeather, getForecast, WeatherData } from "@/lib/weatherApi";
import { getAstronomyPictureOfTheDay } from "@/lib/nasaApi";
import weatherWiseLogo from "@/assets/planweather-logo.svg";
import weatherAnalytics from "@/assets/weather-analytics.jpg";
import weatherSatellite from "@/assets/weather-satellite.jpg";
import aiWeatherBrain from "@/assets/ai-weather-brain.jpg";

const Dashboard = () => {
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showVoiceChat, setShowVoiceChat] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState("outdoor-enthusiast");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [nasaData, setNasaData] = useState<any>(null);

  // Fetch real weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        
        // Get user's location or use default (San Francisco)
        const defaultLat = 37.7749;
        const defaultLon = -122.4194;
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              try {
                const weather = await getCurrentWeather(latitude, longitude);
                setWeatherData(weather);
              } catch (error) {
                console.error('Error fetching weather:', error);
                toast.error('Failed to fetch weather data');
                // Fallback to default location
                const weather = await getCurrentWeather(defaultLat, defaultLon);
                setWeatherData(weather);
              }
            },
            async (error) => {
              console.error('Geolocation error:', error);
              // Fallback to default location
              try {
                const weather = await getCurrentWeather(defaultLat, defaultLon);
                setWeatherData(weather);
              } catch (err) {
                console.error('Error fetching fallback weather:', err);
                toast.error('Failed to fetch weather data');
              }
            }
          );
        } else {
          // Fallback to default location
          const weather = await getCurrentWeather(defaultLat, defaultLon);
          setWeatherData(weather);
        }

        // Fetch NASA data
        try {
          const apod = await getAstronomyPictureOfTheDay();
          setNasaData(apod);
        } catch (error) {
          console.error('Error fetching NASA data:', error);
        }

      } catch (error) {
        console.error('Error in dashboard data fetch:', error);
        toast.error('Failed to load dashboard data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeatherData();
  }, []);

  // Generate hourly weather data for charts (mock data based on current weather)
  const generateHourlyData = () => {
    if (!weatherData) return [];
    
    const baseTemp = weatherData.temperature;
    const baseHumidity = weatherData.humidity;
    const baseAirQuality = 42; // Mock AQI
    
    return [
      { time: '6 AM', temperature: baseTemp - 5, humidity: baseHumidity + 10, airQuality: baseAirQuality + 3, uvIndex: 1, precipitation: 0 },
      { time: '9 AM', temperature: baseTemp - 2, humidity: baseHumidity + 5, airQuality: baseAirQuality, uvIndex: 3, precipitation: 5 },
      { time: '12 PM', temperature: baseTemp, humidity: baseHumidity, airQuality: baseAirQuality - 2, uvIndex: 6, precipitation: 10 },
      { time: '3 PM', temperature: baseTemp + 2, humidity: baseHumidity - 5, airQuality: baseAirQuality + 1, uvIndex: 8, precipitation: 15 },
      { time: '6 PM', temperature: baseTemp - 1, humidity: baseHumidity, airQuality: baseAirQuality + 2, uvIndex: 4, precipitation: 8 },
      { time: '9 PM', temperature: baseTemp - 3, humidity: baseHumidity + 5, airQuality: baseAirQuality - 1, uvIndex: 1, precipitation: 2 }
    ];
  };

  const hourlyWeatherData = generateHourlyData();

  const environmentalMetrics = weatherData ? [
    {
      label: "Air Quality Index",
      value: 42, // OpenWeather doesn't provide AQI in basic plan
      status: "good",
      trend: "up",
      icon: Eye,
      color: "text-status-excellent"
    },
    {
      label: "Temperature",
      value: weatherData.temperature,
      status: "optimal",
      trend: "stable",
      icon: Thermometer,
      color: "text-accent",
      unit: "°C"
    },
    {
      label: "UV Index",
      value: weatherData.uvIndex,
      status: "moderate",
      trend: "up",
      icon: Sun,
      color: "text-status-moderate"
    },
    {
      label: "Humidity",
      value: weatherData.humidity,
      status: "comfortable",
      trend: "down",
      icon: Droplets,
      color: "text-accent",
      unit: "%"
    }
  ] : [];

  const alerts = [
    {
      id: 1,
      type: "info",
      title: `Current Weather in ${weatherData?.location || 'Your Location'}`,
      message: `${weatherData?.condition || 'Loading...'} with ${weatherData?.temperature || '--'}°C. ${weatherData?.condition === 'Clear' ? 'Perfect conditions!' : 'Stay prepared!'}`,
      time: "Live"
    },
    {
      id: 2,
      type: weatherData && weatherData.uvIndex > 6 ? "warning" : "success",
      title: weatherData && weatherData.uvIndex > 6 ? "High UV Index" : "UV Index Safe",
      message: weatherData && weatherData.uvIndex > 6 ? 
        `UV levels are high (${weatherData.uvIndex}). Consider sun protection.` : 
        `UV levels are moderate (${weatherData?.uvIndex || 0}). Safe for outdoor activities.`,
      time: "Real-time"
    },
    {
      id: 3,
      type: "info",
      title: nasaData ? "NASA Astronomy Picture" : "Loading NASA Data",
      message: nasaData ? 
        `Today: ${nasaData.title}` : 
        "Fetching latest space imagery and data...",
      time: nasaData ? "Today" : "Loading..."
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-5" 
        style={{ backgroundImage: `url(${weatherAnalytics})` }}
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
      <div className="pt-20 p-6 relative z-10">
        <div className="container mx-auto space-y-8">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Environmental Dashboard</h1>
              <p className="text-muted-foreground">
                {weatherData ? 
                  `Real-time weather data for ${weatherData.location}` : 
                  'Loading real-time environmental intelligence...'
                }
              </p>
            </div>
            <Badge variant="secondary" className="px-4 py-2">
              {isLoading ? 'Loading...' : 'Live Data'}
            </Badge>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <LoadingSkeleton key={i} className="h-32" />
              ))}
            </div>
          ) : (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {environmentalMetrics.map((metric, index) => {
                  const IconComponent = metric.icon;
                  return (
                    <Card key={index} className="glass-card p-6 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-earth flex items-center justify-center hover:scale-110 transition-transform duration-300`}>
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
                          <span className="text-2xl font-bold bg-gradient-aurora bg-clip-text text-transparent">{metric.value}</span>
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
                
                {/* Charts and Data Visualization */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Weather Charts */}
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    <WeatherChart 
                      type="temperature"
                      data={hourlyWeatherData}
                      title="Temperature Trends"
                    />
                    <WeatherChart 
                      type="air-quality"
                      data={hourlyWeatherData}
                      title="Air Quality Index"
                    />
                  </div>
                  
                  <WeatherChart 
                    type="multi-metric"
                    data={hourlyWeatherData}
                    title="Environmental Overview"
                  />
                  
                  {/* Map Preview */}
                  <Card className="glass-card p-6 relative overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center opacity-10" 
                      style={{ backgroundImage: `url(${weatherSatellite})` }}
                    />
                    <AnimatedGradient variant="ocean" className="opacity-20" />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">Environmental Map</h2>
                        <div className="flex items-center gap-2">
                          <NetworkStatus />
                          <Button variant="cosmic" size="sm" onClick={() => navigate('/map')}>
                            View Full Map
                          </Button>
                        </div>
                      </div>
                      <InteractiveMap className="h-64" />
                    </div>
                  </Card>
                  
                  {/* NASA Data Display */}
                  {nasaData && (
                    <Card className="glass-card p-6 relative overflow-hidden">
                      <div 
                        className="absolute inset-0 bg-cover bg-center opacity-8" 
                        style={{ backgroundImage: nasaData.url ? `url(${nasaData.url})` : `url(${aiWeatherBrain})` }}
                      />
                      <ParticleField className="opacity-30" particleCount={30} />
                      <div className="relative z-10">
                        <h2 className="text-xl font-semibold mb-4">NASA Astronomy Picture of the Day</h2>
                        <div className="space-y-3">
                          <h3 className="font-semibold text-lg">{nasaData.title}</h3>
                          <p className="text-sm text-muted-foreground">{nasaData.explanation?.substring(0, 200)}...</p>
                          <Badge variant="secondary">{nasaData.date}</Badge>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  
                  {/* Alerts */}
                  <Card className="glass-card p-6">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      Weather Alerts
                      <StatusIndicator status="online" variant="dot" size="sm" />
                    </h2>
                    <div className="space-y-4">
                      {alerts.map((alert, index) => (
                        <div key={alert.id} className="flex gap-3 p-3 bg-background/30 rounded-lg border border-white/10 hover:bg-background/40 transition-all duration-300 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
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

                  {/* Current Weather Details */}
                  {weatherData && (
                    <Card className="glass-card p-6">
                      <h2 className="text-xl font-semibold mb-4">Current Conditions</h2>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Feels Like</span>
                          <span className="font-medium">{weatherData.feelsLike}°C</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Wind Speed</span>
                          <span className="font-medium">{weatherData.windSpeed} km/h</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Pressure</span>
                          <span className="font-medium">{weatherData.pressure} hPa</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">Visibility</span>
                          <span className="font-medium">{weatherData.visibility} km</span>
                        </div>
                      </div>
                    </Card>
                  )}

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
            </>
          )}
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