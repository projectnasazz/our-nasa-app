import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Tent, Thermometer, Cloud, ArrowLeft, MapPin, Clock, CheckCircle } from "lucide-react";
import weatherWiseLogo from "@/assets/aurasphere-logo.png";

const EventPlanner = () => {
  const eventMetrics = [
    {
      icon: Thermometer,
      label: "Guest Comfort",
      value: "Optimal",
      detail: "72°F - Perfect temp",
      color: "text-weather-sunny"
    },
    {
      icon: Cloud,
      label: "Weather Forecast",
      value: "Clear",
      detail: "0% precipitation",
      color: "text-weather-sky"
    },
    {
      icon: Users,
      label: "Venue Conditions",
      value: "Excellent",
      detail: "Low wind, good visibility",
      color: "text-weather-ocean"
    },
    {
      icon: Clock,
      label: "Timing",
      value: "Perfect",
      detail: "Golden hour at 7 PM",
      color: "text-weather-sunny"
    }
  ];

  const upcomingEvents = [
    {
      title: "Wedding Reception",
      date: "Tomorrow, 6 PM",
      venue: "Garden Terrace",
      weather: "Perfect conditions",
      status: "All systems go",
      statusColor: "text-green-600"
    },
    {
      title: "Music Festival",
      date: "Weekend",
      venue: "Central Park",
      weather: "Partly cloudy",
      status: "Monitor conditions",
      statusColor: "text-yellow-600"
    },
    {
      title: "Corporate Retreat",
      date: "Next Monday",
      venue: "Mountain Resort",
      weather: "Sunny skies",
      status: "Ideal weather",
      statusColor: "text-green-600"
    }
  ];

  const weatherTips = [
    {
      title: "Tent Setup Recommendations",
      description: "Wind direction favors east-facing setup for stability",
      icon: Tent
    },
    {
      title: "Guest Comfort Timeline",
      description: "Temperature drops 8°F after sunset - provide warming stations",
      icon: Thermometer
    },
    {
      title: "Photo Opportunities",
      description: "Golden hour starts at 7:15 PM for perfect lighting",
      icon: Calendar
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
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Event Planner
              <span className="block text-2xl md:text-3xl text-muted-foreground mt-2">
                Weather Intelligence
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Plan perfect events with comprehensive weather forecasting for weddings, festivals, corporate gatherings, and special occasions.
            </p>
          </div>

          {/* Event Weather Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {eventMetrics.map((metric, index) => (
              <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <metric.icon className={`h-8 w-8 ${metric.color}`} />
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-sm text-muted-foreground">{metric.label}</p>
                    <p className="text-xs text-muted-foreground">{metric.detail}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        <span className={`text-sm font-medium ${event.statusColor}`}>
                          {event.status}
                        </span>
                      </div>
                      <CardDescription className="space-y-1">
                        <div>{event.date} • {event.venue}</div>
                        <div className="text-xs">{event.weather}</div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Weather Insights
              </h2>
              <div className="space-y-4">
                {weatherTips.map((tip, index) => (
                  <Card key={index} className="border-border/20 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center space-x-2 text-lg">
                        <tip.icon className="h-5 w-5 text-weather-sky" />
                        <span>{tip.title}</span>
                      </CardTitle>
                      <CardDescription>{tip.description}</CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Weather Planning Tools */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 text-center">
              Event Planning Tools
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-weather-sky" />
                    <span>Venue Weather</span>
                  </CardTitle>
                  <CardDescription>
                    Specific forecasts for your event locations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Check Venue Conditions</Button>
                </CardContent>
              </Card>

              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-weather-sunny" />
                    <span>Timeline Optimizer</span>
                  </CardTitle>
                  <CardDescription>
                    Perfect timing based on weather patterns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Optimize Schedule</Button>
                </CardContent>
              </Card>

              <Card className="border-border/20 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-weather-ocean" />
                    <span>Guest Comfort</span>
                  </CardTitle>
                  <CardDescription>
                    Ensure optimal conditions for attendees
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">Comfort Analysis</Button>
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

export default EventPlanner;