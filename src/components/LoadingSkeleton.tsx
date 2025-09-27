import React from 'react';
import { Card } from "@/components/ui/card";

interface LoadingSkeletonProps {
  type?: 'card' | 'text' | 'chart' | 'map' | 'list' | 'metric';
  count?: number;
  className?: string;
}

export const LoadingSkeleton = ({ type = 'card', count = 1, className = '' }: LoadingSkeletonProps) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'card':
        return (
          <Card className={`glass-card p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-8 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/4" />
              </div>
            </div>
          </Card>
        );

      case 'text':
        return (
          <div className={`animate-pulse space-y-2 ${className}`}>
            <div className="h-4 bg-muted rounded w-full" />
            <div className="h-4 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/2" />
          </div>
        );

      case 'chart':
        return (
          <Card className={`glass-card p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="flex justify-between items-center">
                <div className="h-6 bg-muted rounded w-1/3" />
                <div className="h-4 bg-muted rounded w-1/6" />
              </div>
              <div className="h-64 bg-muted rounded" />
              <div className="flex justify-center space-x-4">
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-16" />
                <div className="h-3 bg-muted rounded w-16" />
              </div>
            </div>
          </Card>
        );

      case 'map':
        return (
          <Card className={`glass-card ${className}`}>
            <div className="animate-pulse h-96 bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
              <div className="absolute inset-0">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-3 h-3 bg-primary/30 rounded-full animate-pulse"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + (i % 2) * 20}%`,
                      animationDelay: `${i * 0.5}s`
                    }}
                  />
                ))}
              </div>
            </div>
          </Card>
        );

      case 'list':
        return (
          <div className={`space-y-3 ${className}`}>
            {[...Array(count)].map((_, i) => (
              <div key={i} className="animate-pulse flex items-center space-x-3 p-3 bg-muted/20 rounded-lg">
                <div className="w-8 h-8 bg-muted rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        );

      case 'metric':
        return (
          <Card className={`glass-card p-6 ${className}`}>
            <div className="animate-pulse space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 bg-muted rounded-lg" />
                <div className="w-6 h-6 bg-muted rounded" />
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-muted rounded w-2/3" />
                <div className="h-8 bg-muted rounded w-1/2" />
                <div className="h-4 bg-muted rounded w-1/3" />
              </div>
            </div>
          </Card>
        );

      default:
        return <div className={`h-20 bg-muted rounded animate-pulse ${className}`} />;
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </>
  );
};