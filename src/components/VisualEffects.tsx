import React from 'react';

interface ParticleFieldProps {
  className?: string;
  particleCount?: number;
  animated?: boolean;
}

export const ParticleField = ({ className = '', particleCount = 50, animated = true }: ParticleFieldProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-1 h-1 bg-primary/20 rounded-full ${
            animated ? 'animate-pulse' : ''
          }`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );
};

interface FloatingElementsProps {
  className?: string;
  count?: number;
}

export const FloatingElements = ({ className = '', count = 20 }: FloatingElementsProps) => {
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-10 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${15 + Math.random() * 10}s`
          }}
        >
          {i % 3 === 0 && (
            <div className="w-12 h-12 border border-primary/20 rounded-full" />
          )}
          {i % 3 === 1 && (
            <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-transparent rounded-full" />
          )}
          {i % 3 === 2 && (
            <div className="w-6 h-6 border-2 border-accent/20 rotate-45" />
          )}
        </div>
      ))}
    </div>
  );
};

interface AnimatedGradientProps {
  className?: string;
  variant?: 'aurora' | 'ocean' | 'sunset' | 'forest';
}

export const AnimatedGradient = ({ className = '', variant = 'aurora' }: AnimatedGradientProps) => {
  const getGradientClass = () => {
    switch (variant) {
      case 'aurora':
        return 'bg-gradient-aurora animate-gradient';
      case 'ocean':
        return 'bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-teal-500/20 animate-gradient';
      case 'sunset':
        return 'bg-gradient-to-br from-orange-500/20 via-pink-400/20 to-purple-500/20 animate-gradient';
      case 'forest':
        return 'bg-gradient-to-br from-green-500/20 via-emerald-400/20 to-teal-500/20 animate-gradient';
      default:
        return 'bg-gradient-aurora animate-gradient';
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${getGradientClass()} ${className}`} />
  );
};

interface PulsingOrbProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
}

export const PulsingOrb = ({ className = '', size = 'md', color = 'primary' }: PulsingOrbProps) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm': return 'w-4 h-4';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-16 h-16';
      case 'xl': return 'w-32 h-32';
      default: return 'w-8 h-8';
    }
  };

  return (
    <div className={`${getSizeClass()} relative ${className}`}>
      <div className={`absolute inset-0 bg-${color} rounded-full animate-ping opacity-20`} />
      <div className={`absolute inset-0 bg-${color} rounded-full animate-pulse opacity-40`} />
      <div className={`absolute inset-0 bg-${color} rounded-full opacity-60`} />
    </div>
  );
};

interface WeatherAnimationProps {
  type: 'rain' | 'snow' | 'fog' | 'wind';
  intensity?: 'light' | 'medium' | 'heavy';
  className?: string;
}

export const WeatherAnimation = ({ type, intensity = 'medium', className = '' }: WeatherAnimationProps) => {
  const getParticleCount = () => {
    const baseCount = { light: 20, medium: 50, heavy: 100 };
    return baseCount[intensity];
  };

  const renderRain = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(getParticleCount())].map((_, i) => (
        <div
          key={i}
          className="absolute w-0.5 h-8 bg-blue-400 opacity-60 animate-rain"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${0.5 + Math.random() * 0.5}s`
          }}
        />
      ))}
    </div>
  );

  const renderSnow = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(getParticleCount())].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 bg-white rounded-full opacity-70 animate-snow"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  const renderFog = () => (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300/20 to-transparent animate-fog"
          style={{
            animationDelay: `${i * 0.5}s`,
            transform: `translateY(${i * 20}px)`
          }}
        />
      ))}
    </div>
  );

  const renderWind = () => (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      {[...Array(getParticleCount())].map((_, i) => (
        <div
          key={i}
          className="absolute h-0.5 bg-gray-400 opacity-40 animate-wind"
          style={{
            width: `${20 + Math.random() * 40}px`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${1 + Math.random()}s`
          }}
        />
      ))}
    </div>
  );

  switch (type) {
    case 'rain': return renderRain();
    case 'snow': return renderSnow();
    case 'fog': return renderFog();
    case 'wind': return renderWind();
    default: return null;
  }
};