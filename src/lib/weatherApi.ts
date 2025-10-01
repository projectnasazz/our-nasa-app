const OPENWEATHER_API_KEY = (import.meta as any).env?.VITE_OPENWEATHER_API_KEY || "f7f9082983d91f3cde4224520290322b";
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
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error(`Weather data fetch failed: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return {
      location: String(data?.name ?? 'Unknown'),
      temperature: Math.round(Number(data?.main?.temp ?? 0)),
      condition: String(data?.weather?.[0]?.main ?? 'N/A'),
      humidity: Number(data?.main?.humidity ?? 0),
      windSpeed: Math.round(Number(data?.wind?.speed ?? 0) * 3.6),
      pressure: Number(data?.main?.pressure ?? 0),
      uvIndex: 0,
      visibility: Math.round(Number(data?.visibility ?? 0) / 1000),
      dewPoint: Math.round(Number(data?.main?.temp ?? 0) - ((100 - Number(data?.main?.humidity ?? 0)) / 5)),
      feelsLike: Math.round(Number(data?.main?.feels_like ?? 0)),
      icon: String(data?.weather?.[0]?.icon ?? ''),
      coordinates: {
        lat: Number(data?.coord?.lat ?? lat),
        lon: Number(data?.coord?.lon ?? lon)
      }
    };
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching current weather');
  }
};

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
  try {
    const response = await fetch(
      `${OPENWEATHER_BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    );
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }
    const data = await response.json();
    return {
      location: String(data?.name ?? city),
      temperature: Math.round(Number(data?.main?.temp ?? 0)),
      condition: String(data?.weather?.[0]?.main ?? 'N/A'),
      humidity: Number(data?.main?.humidity ?? 0),
      windSpeed: Math.round(Number(data?.wind?.speed ?? 0) * 3.6),
      pressure: Number(data?.main?.pressure ?? 0),
      uvIndex: 0,
      visibility: Math.round(Number(data?.visibility ?? 0) / 1000),
      dewPoint: Math.round(Number(data?.main?.temp ?? 0) - ((100 - Number(data?.main?.humidity ?? 0)) / 5)),
      feelsLike: Math.round(Number(data?.main?.feels_like ?? 0)),
      icon: String(data?.weather?.[0]?.icon ?? ''),
      coordinates: {
        lat: Number(data?.coord?.lat ?? 0),
        lon: Number(data?.coord?.lon ?? 0)
      }
    };
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching weather by city');
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
    const list: any[] = Array.isArray(data?.list) ? data.list : [];
    const dailyForecasts: { [key: string]: any[] } = {};
    list.forEach((item: any) => {
      const date = new Date(Number(item?.dt ?? 0) * 1000).toDateString();
      if (!dailyForecasts[date]) dailyForecasts[date] = [];
      dailyForecasts[date].push(item);
    });
    return Object.entries(dailyForecasts).slice(0, 5).map(([date, forecasts]) => {
      const temps = forecasts.map((f: any) => Number(f?.main?.temp ?? 0));
      const precipitation = forecasts.reduce((sum: number, f: any) => sum + Number(f?.rain?.['3h'] ?? 0), 0);
      return {
        date,
        temperature: {
          min: Math.round(Math.min(...temps)),
          max: Math.round(Math.max(...temps))
        },
        condition: String(forecasts?.[0]?.weather?.[0]?.main ?? 'N/A'),
        icon: String(forecasts?.[0]?.weather?.[0]?.icon ?? ''),
        precipitation
      };
    });
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching forecast data');
  }
};