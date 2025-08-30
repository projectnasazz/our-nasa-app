import { useState, useCallback } from 'react';

// Mock implementation of ElevenLabs conversation hook for demo purposes
interface ConversationOptions {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onMessage?: (message: any) => void;
  onError?: (error: any) => void;
}

interface ConversationSession {
  agentId?: string;
  url?: string;
}

interface VolumeOptions {
  volume: number;
}

export const useConversation = (options: ConversationOptions = {}) => {
  const [status, setStatus] = useState<'connected' | 'disconnected'>('disconnected');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const startSession = useCallback(async (session: ConversationSession) => {
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('connected');
      options.onConnect?.();
      
      // Simulate speaking cycles - store interval ID for cleanup
      const speakingInterval = setInterval(() => {
        setIsSpeaking(prev => !prev);
      }, 2000);
      setIntervalId(speakingInterval);

      // Simulate some messages
      setTimeout(() => {
        options.onMessage?.({
          type: 'assistant',
          content: 'Hello! I can help you with weather data and activity recommendations. What would you like to know?'
        });
      }, 1500);

      return 'demo-conversation-id-' + Date.now();
    } catch (error) {
      options.onError?.(error);
      throw error;
    }
  }, [options]);

  const endSession = useCallback(async () => {
    // Clear the speaking interval
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    setStatus('disconnected');
    setIsSpeaking(false);
    options.onDisconnect?.();
  }, [options, intervalId]);

  const setVolume = useCallback(async (volumeOptions: VolumeOptions) => {
    // Mock volume setting
    console.log('Volume set to:', volumeOptions.volume * 100 + '%');
  }, []);

  return {
    status,
    isSpeaking,
    startSession,
    endSession,
    setVolume
  };
};