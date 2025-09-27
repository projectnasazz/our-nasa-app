import React from 'react';
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  Info, 
  Activity,
  Wifi,
  WifiOff,
  Battery,
  Signal
} from "lucide-react";

interface StatusIndicatorProps {
  status: 'excellent' | 'good' | 'moderate' | 'poor' | 'critical' | 'online' | 'offline' | 'loading';
  label?: string;
  showIcon?: boolean;
  variant?: 'dot' | 'badge' | 'full';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  className?: string;
}

export const StatusIndicator = ({ 
  status, 
  label, 
  showIcon = true, 
  variant = 'full',
  size = 'md',
  animated = true,
  className = ''
}: StatusIndicatorProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'excellent':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-500',
          icon: CheckCircle,
          text: 'Excellent'
        };
      case 'good':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-500',
          icon: CheckCircle,
          text: 'Good'
        };
      case 'moderate':
        return {
          color: 'bg-yellow-500',
          textColor: 'text-yellow-500',
          icon: AlertCircle,
          text: 'Moderate'
        };
      case 'poor':
        return {
          color: 'bg-orange-500',
          textColor: 'text-orange-500',
          icon: AlertCircle,
          text: 'Poor'
        };
      case 'critical':
        return {
          color: 'bg-red-500',
          textColor: 'text-red-500',
          icon: XCircle,
          text: 'Critical'
        };
      case 'online':
        return {
          color: 'bg-green-500',
          textColor: 'text-green-500',
          icon: Wifi,
          text: 'Online'
        };
      case 'offline':
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-500',
          icon: WifiOff,
          text: 'Offline'
        };
      case 'loading':
        return {
          color: 'bg-blue-500',
          textColor: 'text-blue-500',
          icon: Activity,
          text: 'Loading'
        };
      default:
        return {
          color: 'bg-gray-500',
          textColor: 'text-gray-500',
          icon: Info,
          text: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();
  const IconComponent = config.icon;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          dot: 'w-2 h-2',
          icon: 'w-3 h-3',
          text: 'text-xs'
        };
      case 'md':
        return {
          dot: 'w-3 h-3',
          icon: 'w-4 h-4',
          text: 'text-sm'
        };
      case 'lg':
        return {
          dot: 'w-4 h-4',
          icon: 'w-5 h-5',
          text: 'text-base'
        };
      default:
        return {
          dot: 'w-3 h-3',
          icon: 'w-4 h-4',
          text: 'text-sm'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  if (variant === 'dot') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div 
          className={`${sizeClasses.dot} ${config.color} rounded-full ${
            animated && status === 'loading' ? 'animate-pulse' : ''
          } ${animated && status === 'online' ? 'animate-ping' : ''}`}
        />
        {label && (
          <span className={`${sizeClasses.text} font-medium`}>
            {label}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <Badge 
        variant="secondary" 
        className={`flex items-center gap-1 ${className}`}
      >
        <div 
          className={`${sizeClasses.dot} ${config.color} rounded-full ${
            animated && status === 'loading' ? 'animate-pulse' : ''
          }`}
        />
        {label || config.text}
      </Badge>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {showIcon && (
        <IconComponent 
          className={`${sizeClasses.icon} ${config.textColor} ${
            animated && status === 'loading' ? 'animate-spin' : ''
          }`}
        />
      )}
      <span className={`${sizeClasses.text} ${config.textColor} font-medium`}>
        {label || config.text}
      </span>
    </div>
  );
};

interface NetworkStatusProps {
  className?: string;
}

export const NetworkStatus = ({ className = '' }: NetworkStatusProps) => {
  const [isOnline, setIsOnline] = React.useState(navigator.onLine);
  const [signalStrength, setSignalStrength] = React.useState(4);

  React.useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Simulate signal strength changes
    const interval = setInterval(() => {
      setSignalStrength(Math.floor(Math.random() * 5));
    }, 5000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <StatusIndicator
        status={isOnline ? 'online' : 'offline'}
        variant="dot"
        size="sm"
        animated
      />
      {isOnline && (
        <div className="flex items-center gap-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className={`w-1 rounded-full ${
                i < signalStrength ? 'bg-green-500' : 'bg-muted'
              }`}
              style={{ height: `${4 + i * 2}px` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};