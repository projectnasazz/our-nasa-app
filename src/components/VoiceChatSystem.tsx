import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  X, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Play,
  Square,
  Headphones,
  Radio,
  Settings
} from "lucide-react";
import { useConversation } from '@/hooks/useConversation';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface VoiceChatSystemProps {
  onClose: () => void;
}

export const VoiceChatSystem = ({ onClose }: VoiceChatSystemProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [conversationStatus, setConversationStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Demo voice chat functionality with mock ElevenLabs integration
  const conversation = useConversation({
    onConnect: () => {
      setIsConnected(true);
      setConversationStatus('connected');
    },
    onDisconnect: () => {
      setIsConnected(false);
      setConversationStatus('disconnected');
    },
    onMessage: (message) => {
      console.log('Voice message:', message);
      // Simulate text-to-speech response for demo
      if ('speechSynthesis' in window && message.content) {
        const utterance = new SpeechSynthesisUtterance(message.content);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        speechSynthesis.speak(utterance);
      }
    },
    onError: (error) => {
      console.error('Voice chat error:', error);
    }
  });

  const { status, isSpeaking } = conversation;

  // Simulate audio level for visual feedback
  useEffect(() => {
    if (isConnected && !isMuted) {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setAudioLevel(0);
    }
  }, [isConnected, isMuted]);

  const handleStartVoiceChat = async () => {
    if (!apiKey.trim()) {
      // For demo purposes, we'll allow it to work without API key
      console.warn('Demo mode: No API key provided, using mock voice chat');
    }

    try {
      setConversationStatus('connecting');
      // Demo voice chat session
      await conversation.startSession({ 
        agentId: 'demo-environmental-agent'
      });
    } catch (error) {
      console.error('Failed to start voice chat:', error);
      setConversationStatus('disconnected');
      alert('Failed to start voice chat demo.');
    }
  };

  const handleEndVoiceChat = async () => {
    try {
      await conversation.endSession();
    } catch (error) {
      console.error('Failed to end voice chat:', error);
    }
  };

  const handleVolumeChange = async (newVolume: number) => {
    setVolume(newVolume);
    try {
      await conversation.setVolume({ volume: newVolume });
    } catch (error) {
      console.error('Failed to set volume:', error);
    }
  };

  const environmentalPrompts = [
    "What's the air quality like in San Francisco today?",
    "Find me the best outdoor event location",
    "Is it safe to hike this weekend?",
    "What are the UV levels for tomorrow?",
    "Tell me about weather patterns this week"
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="glass-card w-full max-w-2xl border-primary/30">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-safe flex items-center justify-center">
              <Headphones className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Voice Environmental Assistant</h2>
              <p className="text-sm text-muted-foreground">Natural voice interactions with environmental data</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* API Key Input */}
          {showApiKeyInput && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="apiKey">ElevenLabs API Key</Label>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowApiKeyInput(false)}
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key..."
                className="bg-background/50 border-white/20"
              />
              <p className="text-xs text-muted-foreground">
                Get your API key from{' '}
                <a 
                  href="https://elevenlabs.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  elevenlabs.io
                </a>
                {' '}(Demo mode available without API key)
              </p>
            </div>
          )}

          {/* Connection Status */}
          <div className="flex items-center justify-between p-4 bg-background/30 rounded-xl border border-white/10">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                conversationStatus === 'connected' ? 'bg-status-excellent' :
                conversationStatus === 'connecting' ? 'bg-status-moderate animate-pulse' :
                'bg-status-poor'
              }`} />
              <span className="text-sm font-medium">
                {conversationStatus === 'connected' ? 'Connected' :
                 conversationStatus === 'connecting' ? 'Connecting...' :
                 'Disconnected'}
              </span>
            </div>
            <Badge variant={conversationStatus === 'connected' ? 'default' : 'secondary'}>
              {conversationStatus === 'connected' ? 'Live' : 'Offline'}
            </Badge>
          </div>

          {/* Voice Visualization */}
          <div className="space-y-4">
            <div className="text-center">
              <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-safe flex items-center justify-center mb-4 transition-all duration-300 ${
                isSpeaking ? 'voice-pulse shadow-glow' : 
                isConnected ? 'pulse-glow' : 'opacity-50'
              }`}>
                {isConnected ? (
                  isMuted ? <MicOff className="w-12 h-12 text-white" /> : <Mic className="w-12 h-12 text-white" />
                ) : (
                  <Radio className="w-12 h-12 text-white opacity-50" />
                )}
              </div>
              
              {isConnected && (
                <div className="space-y-2">
                  <Progress value={audioLevel} className="w-48 mx-auto h-2" />
                  <p className="text-sm text-muted-foreground">
                    {isSpeaking ? 'Assistant is speaking...' : 'Listening for your voice...'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!isConnected ? (
              <Button 
                variant="voice" 
                size="lg" 
                onClick={handleStartVoiceChat}
                disabled={conversationStatus === 'connecting'}
              >
                <Play className="w-5 h-5 mr-2" />
                Start Voice Chat
              </Button>
            ) : (
              <>
                <Button 
                  variant={isMuted ? "outline" : "voice"} 
                  size="lg"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                </Button>
                <Button 
                  variant="destructive" 
                  size="lg"
                  onClick={handleEndVoiceChat}
                >
                  <Square className="w-5 h-5 mr-2" />
                  End Chat
                </Button>
              </>
            )}
          </div>

          {/* Volume Control */}
          {isConnected && (
            <div className="space-y-3">
              <Label className="flex items-center gap-2">
                {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                Volume: {Math.round(volume * 100)}%
              </Label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-background/50 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          )}

          {/* Example Prompts */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Try asking:</h3>
            <div className="grid grid-cols-1 gap-2">
              {environmentalPrompts.map((prompt, index) => (
                <div key={index} className="p-3 bg-background/30 rounded-lg border border-white/10">
                  <p className="text-sm text-muted-foreground italic">"{prompt}"</p>
                </div>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-chat-system/10 border border-chat-system/30 rounded-xl p-4">
            <h4 className="font-semibold text-sm mb-2">How to use Voice Chat:</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Optional: Enter your ElevenLabs API key for production use</li>
              <li>• Click "Start Voice Chat" to connect (demo mode available)</li>
              <li>• Speak naturally about environmental questions</li>
              <li>• Get instant voice responses with data insights</li>
              <li>• Adjust volume and mute as needed</li>
              <li>• Demo uses browser speech synthesis for responses</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
};