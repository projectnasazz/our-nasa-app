const NASA_API_KEY = (import.meta as any).env?.VITE_NASA_API_KEY || "cWapVRhYHu3DRDC3Hn4AeC4ADRogIxdqe2HTALnw";
const NASA_BASE_URL = "https://api.nasa.gov";
const EONET_BASE_URL = "https://eonet.gsfc.nasa.gov/api/v3"; // EONET is not under api.nasa.gov and does not use api_key

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
      const message = `NASA APOD fetch failed: ${response.status} ${response.statusText}`;
      throw new Error(message);
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching NASA APOD');
  }
};

export const getEarthImagery = async (lat: number, lon: number, date?: string): Promise<string> => {
  try {
    const dateParam = date || new Date().toISOString().split('T')[0];
    const url = `${NASA_BASE_URL}/planetary/earth/imagery?lon=${lon}&lat=${lat}&date=${dateParam}&dim=0.15&api_key=${NASA_API_KEY}`;
    const response = await fetch(url, { redirect: 'follow' });
    if (!response.ok) {
      throw new Error('NASA Earth Imagery fetch failed');
    }
    // The imagery endpoint may redirect to the actual image. response.url will be the final URL.
    return response.url;
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching NASA Earth imagery');
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
    return Array.isArray(data?.results) ? data.results : [];
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching NASA Earth assets');
  }
};

export const getNaturalEvents = async (): Promise<any> => {
  try {
    // EONET v3 lives under eonet.gsfc.nasa.gov and does not require an API key
    const response = await fetch(`${EONET_BASE_URL}/events`);
    if (!response.ok) {
      throw new Error('NASA Natural Events fetch failed');
    }
    return await response.json();
  } catch (error: any) {
    throw new Error(error?.message || 'Error fetching NASA natural events');
  }
};