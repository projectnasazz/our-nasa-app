import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";

interface WeatherDataPoint {
  time: string;
  temperature: number;
  humidity: number;
  airQuality: number;
  uvIndex: number;
  precipitation: number;
}

interface WeatherChartProps {
  type: 'temperature' | 'air-quality' | 'precipitation' | 'multi-metric';
  data: WeatherDataPoint[];
  className?: string;
  title?: string;
}

export const WeatherChart = ({ type, data, className, title }: WeatherChartProps) => {
  const getChartConfig = () => {
    switch (type) {
      case 'temperature':
        return {
          title: title || 'Temperature Trend',
          color: '#f59e0b',
          dataKey: 'temperature',
          unit: '°F',
          gradient: true
        };
      case 'air-quality':
        return {
          title: title || 'Air Quality Index',
          color: '#10b981',
          dataKey: 'airQuality',
          unit: 'AQI',
          gradient: false
        };
      case 'precipitation':
        return {
          title: title || 'Precipitation Levels',
          color: '#3b82f6',
          dataKey: 'precipitation',
          unit: '%',
          gradient: false
        };
      default:
        return {
          title: title || 'Weather Overview',
          color: '#8b5cf6',
          dataKey: 'temperature',
          unit: '',
          gradient: true
        };
    }
  };

  const config = getChartConfig();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-lg">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: entry.color }}
              />
              <span>{entry.dataKey}: {entry.value}{config.unit}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const renderChart = () => {
    if (type === 'multi-metric') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="temperature" 
              stroke="#f59e0b" 
              strokeWidth={2}
              dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#f59e0b', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="humidity" 
              stroke="#3b82f6" 
              strokeWidth={2}
              dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            />
            <Line 
              type="monotone" 
              dataKey="airQuality" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      );
    }

    if (type === 'precipitation') {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey={config.dataKey} 
              fill={config.color}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      );
    }

    if (config.gradient) {
      return (
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id={`gradient-${type}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config.color} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={config.color} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="time" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey={config.dataKey} 
              stroke={config.color}
              strokeWidth={2}
              fillOpacity={1} 
              fill={`url(#gradient-${type})`}
              dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="time" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey={config.dataKey} 
            stroke={config.color}
            strokeWidth={2}
            dot={{ fill: config.color, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: config.color, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    );
  };

  const getTrend = () => {
    if (data.length < 2) return null;
    const first = Number(data[0][config.dataKey as keyof WeatherDataPoint]);
    const last = Number(data[data.length - 1][config.dataKey as keyof WeatherDataPoint]);
    if (!first || !last) return null;
    const change = ((last - first) / first) * 100;
    return {
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'stable',
      percentage: Math.abs(change).toFixed(1)
    };
  };

  const trend = getTrend();

  return (
    <Card className={`glass-card p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold">{config.title}</h3>
          <p className="text-sm text-muted-foreground">Last 24 hours</p>
        </div>
        {trend && (
          <Badge variant="secondary" className="flex items-center gap-1">
            {trend.direction === 'up' ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : trend.direction === 'down' ? (
              <TrendingDown className="w-3 h-3 text-red-500" />
            ) : (
              <Activity className="w-3 h-3 text-muted-foreground" />
            )}
            {trend.percentage}%
          </Badge>
        )}
      </div>
      
      <div className="w-full">
        {renderChart()}
      </div>
      
      {type === 'multi-metric' && (
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full" />
            <span>Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span>Humidity</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Air Quality</span>
          </div>
        </div>
      )}
    </Card>
  );
};