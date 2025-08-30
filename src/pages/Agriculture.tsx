import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wheat, Droplets, Thermometer, Sprout, ArrowLeft, MapPin, Calendar, TrendingUp, AlertTriangle } from "lucide-react";
import weatherWiseLogo from "@/assets/aurasphere-logo.png";

const Agriculture = () => {
  const farmMetrics = [
    {
      icon: Droplets,
      label: "Soil Moisture",
      value: "78%",
      trend: "Optimal",
      color: "text-weather-ocean"
    },
    {
      icon: Thermometer,
      label: "Temperature",
      value: "75°F",
      trend: "Perfect range",
      color: "text-weather-sunny"
    },
    {
      icon: Droplets,
      label: "Rainfall (7d)",
      value: "1.2\"",
      trend: "Above average",
      color: "text-weather-sky"
    },
    {
      icon: Sprout,
      label: "Growing Conditions",
      value: "Excellent",
      trend: "Ideal for growth",
      color: "text-green-500"
    }
  ];

  const cropAlerts = [
    {
      title: "Corn Field - Section A",
      description: "Irrigation recommended in 2 days",
      severity: "Medium",
      severityColor: "text-yellow-600",
      icon: AlertTriangle
    },
    {
      title: "Tomato Greenhouse",
      description: "Perfect humidity levels maintained",
      severity: "Good",
      severityColor: "text-green-600",
      icon: Sprout
    },
    {
      title: "Wheat Field - North",
      description: "Harvest window opens in 5 days",
      severity: "Info",
      severityColor: "text-blue-600",
      icon: Wheat
    }
  ];

  const weeklyForecast = [
    { day: "Mon", temp: "72°F", rain: "0%", soil: "Good" },
    { day: "Tue", temp: "75°F", rain: "10%", soil: "Good" },
    { day: "Wed", temp: "78°F", rain: "60%", soil: "Excellent" },
    { day: "Thu", temp: "74°F", rain: "30%", soil: "Excellent" },
    { day: "Fri", temp: "76°F", rain: "5%", soil: "Good" },
    { day: "Sat", temp: "79°F", rain: "0%", soil: "Monitor" },
    { day: "Sun", temp: "81°F", rain: "0%", soil: "Monitor" }
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
              <Wheat className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Agriculture
              <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                Smart Farming Weather
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Optimize your farming operations with precision weather data for soil moisture, rainfall patterns, and crop-specific growing conditions.
            </p>
          </div>

          {/* Farm Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {farmMetrics.map((metric, index) => (
              <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-xs text-green-600">{metric.trend}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Crop Alerts and Weekly Forecast */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Crop Alerts & Recommendations
              </h2>
              <div className="space-y-4">
                {cropAlerts.map((alert, index) => (
                  <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center space-x-2 text-lg">
                          <alert.icon className="h-5 w-5" />
                          <span>{alert.title}</span>
                        </CardTitle>
                        <span className={`text-sm font-medium ${alert.severityColor}`}>
                          {alert.severity}
                        </span>
                      </div>
                      <CardDescription>{alert.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                7-Day Farming Forecast
              </h2>
              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {weeklyForecast.map((day, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-background/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <span className="font-medium text-sm w-10">{day.day}</span>
                          <span className="text-sm">{day.temp}</span>
                          <span className="text-sm text-weather-sky">{day.rain} rain</span>
                        </div>
                        <span className={`text-sm font-medium ${
                          day.soil === 'Excellent' ? 'text-green-600' :
                          day.soil === 'Good' ? 'text-green-500' :
                          'text-yellow-600'
                        }`}>
                          {day.soil}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Farming Tools */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Smart Farming Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Droplets className="h-5 w-5 text-weather-ocean" />
                    <span>Irrigation Planner</span>
                  </CardTitle>
                  <CardDescription>
                    Smart watering schedules based on soil moisture and rainfall
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Plan Irrigation</Button>
                </CardContent>
              </Card>

              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wheat className="h-5 w-5 text-weather-sunny" />
                    <span>Harvest Optimizer</span>
                  </CardTitle>
                  <CardDescription>
                    Optimal timing for harvesting based on weather patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Check Harvest Time</Button>
                </CardContent>
              </Card>

              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Sprout className="h-5 w-5 text-green-500" />
                    <span>Crop Health Monitor</span>
                  </CardTitle>
                  <CardDescription>
                    Disease prevention and growth optimization insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Monitor Crops</Button>
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

export default Agriculture;