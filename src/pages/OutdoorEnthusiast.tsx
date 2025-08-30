import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain, Thermometer, Wind, Sun, Droplets, ArrowLeft, MapPin, Calendar, TrendingUp } from "lucide-react";
import weatherWiseLogo from "@/assets/aurasphere-logo.png";

const OutdoorEnthusiast = () => {
  const weatherMetrics = [
    {
      icon: Thermometer,
      label: "Temperature",
      value: "72°F",
      trend: "+3°",
      color: "text-weather-sunny"
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: "8 mph",
      trend: "NW",
      color: "text-weather-sky"
    },
    {
      icon: Sun,
      label: "UV Index",
      value: "7",
      trend: "High",
      color: "text-weather-sunny"
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: "45%",
      trend: "-5%",
      color: "text-weather-ocean"
    }
  ];

  const activities = [
    {
      title: "Hiking Trail Conditions",
      description: "Perfect weather for mountain trails with clear visibility",
      status: "Excellent",
      statusColor: "text-green-600"
    },
    {
      title: "Camping Tonight",
      description: "Cool temperatures with no precipitation expected",
      status: "Ideal",
      statusColor: "text-green-600"
    },
    {
      title: "Rock Climbing",
      description: "Low wind conditions, good grip weather",
      status: "Good",
      statusColor: "text-yellow-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Navigation */}
      <nav className="border-b border-border/10 bg-background/90 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <ArrowLeft className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Back</span>
              </Link>
              <div className="flex items-center space-x-3">
                <img src={weatherWiseLogo} alt="WeatherWise" className="h-8 w-8" />
                <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  WeatherWise
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/map">
                <Button variant="outline">Weather Map</Button>
              </Link>
              <Link to="/dashboard">
                <Button>Dashboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-full mb-6">
              <Mountain className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Outdoor Enthusiast
              <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                Weather Dashboard
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get detailed weather insights tailored for hiking, camping, sports events, and outdoor adventures.
              Stay safe and make the most of your outdoor experiences.
            </p>
          </div>

          {/* Current Weather Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {weatherMetrics.map((metric, index) => (
              <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    <div className="flex items-center space-x-1">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-500">{metric.trend}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Activity Recommendations */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Activity Recommendations
              </h2>
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{activity.title}</CardTitle>
                        <span className={`text-sm font-medium ${activity.statusColor}`}>
                          {activity.status}
                        </span>
                      </div>
                      <CardDescription>{activity.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Location-Based Insights
              </h2>
              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-weather-sky" />
                    <span>Your Area</span>
                  </CardTitle>
                  <CardDescription>
                    Personalized weather insights for your favorite outdoor locations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm">Trail Head - Pine Mountain</span>
                      <span className="text-sm text-green-600">Perfect</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm">Campsite - Blue Lake</span>
                      <span className="text-sm text-green-600">Ideal</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                      <span className="text-sm">Rock Face - Eagle Point</span>
                      <span className="text-sm text-yellow-600">Caution: Windy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <Link to="/map">
                <Button size="lg" className="w-full sm:w-auto">
                  <MapPin className="mr-2 h-5 w-5" />
                  View Weather Map
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <Calendar className="mr-2 h-5 w-5" />
                  Full Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OutdoorEnthusiast;