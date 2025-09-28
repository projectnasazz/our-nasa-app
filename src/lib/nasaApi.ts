const NASA_API_KEY = "cWapVRhYHu3DRDC3Hn4AeC4ADRogIxdqe2HTALnw";
const NASA_BASE_URL = "https://api.nasa.gov";

export interface NASAImageData {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface EarthImageData {
  identifier: string;
  caption: string;
  image: string;
  version: string;
  centroid_coordinates: {
    lat: number;
    lon: number;
  };
  dscovr_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  lunar_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  sun_j2000_position: {
    x: number;
    y: number;
    z: number;
  };
  attitude_quaternions: {
    q0: number;
    q1: number;
    q2: number;
    q3: number;
  };
  date: string;
  coords: {
    centroid_coordinates: {
      lat: number;
      lon: number;
    };
  };
}

export const getAstronomyPictureOfTheDay = async (): Promise<NASAImageData> => {
  try {
    const response = await fetch(`${NASA_BASE_URL}/planetary/apod?api_key=${NASA_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('NASA APOD fetch failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching NASA APOD:', error);
    throw error;
  }
};

export const getEarthImagery = async (lat: number, lon: number, date?: string): Promise<string> => {
  try {
    const dateParam = date || new Date().toISOString().split('T')[0];
    const response = await fetch(
      `${NASA_BASE_URL}/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${dateParam}&dim=0.15&api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('NASA Earth Imagery fetch failed');
    }
    
    return response.url;
  } catch (error) {
    console.error('Error fetching NASA Earth imagery:', error);
    throw error;
  }
};

export const getEarthAssets = async (lat: number, lon: number, date?: string): Promise<EarthImageData[]> => {
  try {
    const dateParam = date || new Date().toISOString().split('T')[0];
    const response = await fetch(
      `${NASA_BASE_URL}/planetary/earth/assets?lon=${lon}&lat=${lat}&date=${dateParam}&dim=0.15&api_key=${NASA_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error('NASA Earth Assets fetch failed');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Error fetching NASA Earth assets:', error);
    throw error;
  }
};

export const getNaturalEvents = async (): Promise<any> => {
  try {
    const response = await fetch(`${NASA_BASE_URL}/EONET/api/v3/events?api_key=${NASA_API_KEY}`);
    
    if (!response.ok) {
      throw new Error('NASA Natural Events fetch failed');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching NASA natural events:', error);
    throw error;
  }
};