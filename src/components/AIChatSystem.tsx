import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  X, 
  Send, 
  MapPin, 
  Calendar, 
  Cloud, 
  Thermometer, 
  Wind, 
  Eye,
  Sparkles,
  Bot,
  User
} from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  suggestions?: string[];
  location?: {
    name: string;
    coordinates: [number, number];
    score: number;
    reasons: string[];
  };
}

interface AIChatSystemProps {
  onClose: () => void;
  selectedProfile: string;
}

export const AIChatSystem = ({ onClose, selectedProfile }: AIChatSystemProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'system',
      content: `Welcome to WeatherWise AI! I'm your intelligent weather assistant. ${
        selectedProfile 
          ? `I see you're interested in ${selectedProfile.replace('-', ' ')} activities.` 
          : ''
      } I can help you find the perfect conditions and locations for your outdoor activities based on real-time weather data.`,
      timestamp: new Date(),
      suggestions: [
        "Find a location for an outdoor wedding",
        "Best spots for a music festival",
        "Safe hiking areas this weekend",
        "Ideal farming conditions nearby"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateAIResponse = (userMessage: string): Promise<Message> => {
    return new Promise((resolve, reject) => {
      const timeoutId = setTimeout(() => {
        try {
          // Simulate different responses based on message content
          let response: Message;
          
          if (userMessage.toLowerCase().includes('weather') || userMessage.toLowerCase().includes('forecast')) {
            response = {
              id: Date.now().toString(),
              type: 'assistant',
              content: "I've analyzed current weather conditions for your activity. Here are the top recommendations:",
              timestamp: new Date(),
              location: {
                name: "Golden Gate Park, San Francisco",
                coordinates: [-122.4194, 37.7749],
                score: 92,
                reasons: [
                  "Perfect temperature range (68-75°F)",
                  "Low precipitation probability (<5%)",
                  "Excellent air quality index (35)",
                  "Moderate humidity levels (45-55%)",
                  "Clear skies expected"
                ]
              },
              suggestions: [
                "Check hourly forecast updates",
                "Monitor wind conditions",
                "Plan for temperature changes",
                "Consider UV protection"
              ]
            };
          } else if (userMessage.toLowerCase().includes('outdoor') || userMessage.toLowerCase().includes('hiking')) {
            response = {
              id: Date.now().toString(),
              type: 'assistant',
              content: "Based on outdoor activity safety analysis, here's an ideal location:",
              timestamp: new Date(),
              location: {
                name: "Central Park Great Lawn, NYC",
                coordinates: [-73.9665, 40.7812],
                score: 88,
                reasons: [
                  "Optimal visibility conditions",
                  "Low wind speed for comfort",
                  "Good trail conditions",
                  "Safe UV index levels",
                  "Air quality suitable for exercise"
                ]
              },
              suggestions: [
                "Check trail conditions",
                "Bring appropriate gear",
                "Stay hydrated",
                "Monitor weather alerts"
              ]
            };
          } else {
            response = {
              id: Date.now().toString(),
              type: 'assistant',
              content: "I can help you with weather intelligence for any outdoor activity! Try asking about specific weather conditions, forecasts, or activity recommendations.",
              timestamp: new Date(),
              suggestions: [
                "What's the weather like today?",
                "Best time for outdoor activities?",
                "Air quality in my area",
                "UV index forecast"
              ]
            };
          }
          
          resolve(response);
        } catch (error) {
          reject(new Error('Failed to generate AI response'));
        }
      }, Math.random() * 1000 + 500); // Random delay between 500-1500ms
      
      // Add timeout protection
      setTimeout(() => {
        clearTimeout(timeoutId);
        reject(new Error('AI response timeout'));
      }, 5000); // 5 second timeout
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const aiResponse = await simulateAIResponse(input);
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('AI response error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-4xl h-[80vh] flex flex-col border-primary/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-aurora flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">WeatherWise AI Assistant</h2>
              <p className="text-sm text-muted-foreground">Weather Intelligence • Activity Planning</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
          <div className="space-y-6">
            {messages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : ''}`}>
                {message.type !== 'user' && (
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'system' ? 'bg-gradient-safe' : 'bg-gradient-aurora'
                  }`}>
                    {message.type === 'system' ? <Eye className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
                  </div>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-first' : ''}`}>
                  <div className={`p-4 rounded-2xl ${
                    message.type === 'user' 
                      ? 'bg-chat-user text-white ml-auto' 
                      : message.type === 'system'
                      ? 'bg-chat-system/20 border border-chat-system/30'
                      : 'bg-chat-assistant/20 border border-chat-assistant/30'
                  }`}>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {message.location && (
                      <div className="mt-4 p-4 bg-background/50 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin className="w-4 h-4 text-accent" />
                          <span className="font-semibold">{message.location.name}</span>
                          <Badge variant="secondary" className="ml-auto">
                            Score: {message.location.score}/100
                          </Badge>
                        </div>
                        
                        <div className="space-y-2">
                          {message.location.reasons.map((reason, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <div className="w-1.5 h-1.5 rounded-full bg-status-excellent" />
                              {reason}
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="cosmic">
                            <MapPin className="w-3 h-3 mr-1" />
                            View on Map
                          </Button>
                          <Button size="sm" variant="glass">
                            <Calendar className="w-3 h-3 mr-1" />
                            Check Forecast
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {message.suggestions && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {message.suggestions.map((suggestion, index) => (
                        <Button
                          key={index}
                          variant="glass"
                          size="sm"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs"
                        >
                          {suggestion}
                        </Button>
                      ))}
                    </div>
                  )}
                  
                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>

                {message.type === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-gradient-earth flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-aurora flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-chat-assistant/20 border border-chat-assistant/30 p-4 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full chat-typing" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-accent rounded-full chat-typing" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-accent rounded-full chat-typing" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-6 border-t border-white/10">
          <div className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about perfect locations for your events..."
              className="flex-1 bg-background/50 border-white/20"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!input.trim() || isTyping}
              variant="hero"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};