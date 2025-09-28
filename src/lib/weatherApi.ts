const OPENWEATHER_API_KEY = "f7f9082983d91f3cde4224520290322b";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  uvIndex: number;
  visibility: number;
  dewPoint: number;
  feelsLike: number;
  icon: string;
  coordinates: {
    lat: number;
    lon: number;
  };
}

export interface ForecastData {
  date: string;
  temperature: {
    min: number;
    max: number;
  };
  condition: string;
  icon: string;
  precipitation: number;
}

export const getCurrentWeather = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    console.log('🌡️ Fetching weather data for:', lat, lon);
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    console.log('🌡️ Weather API response status:', response.status);
    
    if (!response.ok) {
      console.error('❌ Weather API error:', response.status, response.statusText);
      throw new Error(`Weather data fetch failed: ${response.status} ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ Weather data received:', data);
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6), // Convert m/s to km/h
      pressure: data.main.pressure,
      uvIndex: 0, // UV Index requires separate API call
      visibility: Math.round(data.visibility / 1000), // Convert m to km
      dewPoint: Math.round(data.main.temp - ((100 - data.main.humidity) / 5)),
      feelsLike: Math.round(data.main.feels_like),
      icon: data.weather[0].icon,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  } catch (error) {
    console.error('❌ Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${city}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    
    const data = await response.json();
    
    return {
      location: data.name,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      humidity: data.main.humidity,
      windSpeed: Math.round(data.wind.speed * 3.6),
      pressure: data.main.pressure,
      uvIndex: 0,
      visibility: Math.round(data.visibility / 1000),
      dewPoint: Math.round(data.main.temp - ((100 - data.main.humidity) / 5)),
      feelsLike: Math.round(data.main.feels_like),
      icon: data.weather[0].icon,
      coordinates: {
        lat: data.coord.lat,
        lon: data.coord.lon
      }
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getForecast = async (lat: number, lon: number): Promise<ForecastData[]> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Forecast data fetch failed');
    }
    
    const data = await response.json();
    
    // Group forecast by day and get daily summary
    const dailyForecasts: { [key: string]: any[] } = {};
    
    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toDateString();
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = [];
      }
      dailyForecasts[date].push(item);
    });
    
    return Object.entries(dailyForecasts).slice(0, 5).map(([date, forecasts]) => {
      const temps = forecasts.map(f => f.main.temp);
      const precipitation = forecasts.reduce((sum, f) => sum + (f.rain?.['3h'] || 0), 0);
      
      return {
        date,
        temperature: {
          min: Math.round(Math.min(...temps)),
          max: Math.round(Math.max(...temps))
        },
        condition: forecasts[0].weather[0].main,
        icon: forecasts[0].weather[0].icon,
        precipitation
      };
    });
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};