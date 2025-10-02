import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Share2, 
  Twitter, 
  Facebook,
  Linkedin, 
  Mail, 
  Copy, 
  Check,
  X,
  MessageCircle,
  Download,
  FileText
} from "lucide-react";
import { toast } from "sonner";

interface ShareWeatherProps {
  title?: string;
  message?: string;
  url?: string;
  location?: string;
  temperature?: number;
  condition?: string;
  weatherData?: any;
  onClose?: () => void;
  className?: string;
  allowFileSharing?: boolean;
}

export const ShareWeather: React.FC<ShareWeatherProps> = ({
  title = "Weather Update",
  message = "Check out this weather forecast!",
  url = window.location.href,
  location,
  temperature,
  condition,
  weatherData,
  onClose,
  className = "",
  allowFileSharing = true
}) => {
  const [copied, setCopied] = React.useState(false);

  // Use weatherData if provided
  const weatherLocation = location || weatherData?.location;
  const weatherTemp = temperature !== undefined ? temperature : weatherData?.temperature;
  const weatherCondition = condition || weatherData?.condition;

  // Create share message with weather data if available
  const getShareMessage = () => {
    let shareMsg = message;
    
    if (weatherLocation && weatherTemp !== undefined && weatherCondition) {
      shareMsg = `Current weather in ${weatherLocation}: ${weatherTemp}°C, ${weatherCondition}. ${message}`;
    }
    
    return encodeURIComponent(shareMsg);
  };

  const shareMessage = getShareMessage();
  
  // Share URLs for different platforms
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareMessage}&url=${encodeURIComponent(url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${shareMessage}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
  const mailUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${shareMessage}%20${encodeURIComponent(url)}`;
  const whatsappUrl = `https://wa.me/?text=${shareMessage}%20${encodeURIComponent(url)}`;

  const copyToClipboard = () => {
    const textToCopy = `${title}: ${decodeURIComponent(shareMessage)} ${url}`;
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      toast.error("Failed to copy link");
      console.error('Failed to copy: ', err);
    });
  };
  
  // Generate weather data file content
  const generateWeatherData = () => {
    const data = {
      title,
      location: weatherLocation,
      temperature: weatherTemp,
      condition: weatherCondition,
      message: decodeURIComponent(shareMessage),
      url,
      timestamp: new Date().toISOString(),
    };
    return JSON.stringify(data, null, 2);
  };

  // Download weather data as file
  const downloadWeatherData = () => {
    try {
      const weatherData = generateWeatherData();
      const blob = new Blob([weatherData], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const fileName = `weather-${weatherLocation ? weatherLocation.replace(/\s+/g, '-').toLowerCase() : 'data'}-${new Date().toISOString().split('T')[0]}.json`;
      
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      toast.success("Weather data downloaded successfully!");
    } catch (error) {
      toast.error("Failed to download weather data");
      console.error('Download error:', error);
    }
  };

  return (
    <Card className={`p-4 glass-card ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Share2 className="w-5 h-5" />
          Share Weather Update
        </h3>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>
      
      {(weatherLocation && weatherTemp !== undefined && weatherCondition) && (
        <div className="mb-4 p-3 bg-background/50 rounded-md">
          <p className="text-sm text-muted-foreground">Sharing weather for:</p>
          <p className="font-medium">{weatherLocation}: {weatherTemp}°C, {weatherCondition}</p>
        </div>
      )}
      
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-16 hover:bg-blue-500/10"
          onClick={() => window.open(twitterUrl, '_blank')}
        >
          <Twitter className="w-5 h-5 text-blue-400 mb-1" />
          <span className="text-xs">Twitter</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-16 hover:bg-blue-700/10"
          onClick={() => window.open(facebookUrl, '_blank')}
        >
          <Facebook className="w-5 h-5 text-blue-600 mb-1" />
          <span className="text-xs">Facebook</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-16 hover:bg-blue-600/10"
          onClick={() => window.open(linkedinUrl, '_blank')}
        >
          <Linkedin className="w-5 h-5 text-blue-500 mb-1" />
          <span className="text-xs">LinkedIn</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-16 hover:bg-green-500/10"
          onClick={() => window.open(whatsappUrl, '_blank')}
        >
          <MessageCircle className="w-5 h-5 text-green-500 mb-1" />
          <span className="text-xs">WhatsApp</span>
        </Button>
        
        <Button 
          variant="outline" 
          className="flex flex-col items-center justify-center h-16 hover:bg-gray-500/10"
          onClick={() => window.open(mailUrl, '_blank')}
        >
          <Mail className="w-5 h-5 text-gray-400 mb-1" />
          <span className="text-xs">Email</span>
        </Button>
      </div>
      
      {allowFileSharing && (
        <div className="mb-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center h-12 hover:bg-purple-500/10"
            onClick={downloadWeatherData}
          >
            <Download className="w-5 h-5 text-purple-500 mr-2" />
            <span>Download Weather Data</span>
          </Button>
          <p className="text-xs text-muted-foreground mt-1 text-center">
            Download as a file that can be opened on any platform (Windows, Mac, Linux)
          </p>
        </div>
      )}
      
      <div className="flex items-center gap-2">
        <Button 
          variant="secondary" 
          className="flex-1"
          onClick={copyToClipboard}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </Button>
      </div>
    </Card>
  );
};