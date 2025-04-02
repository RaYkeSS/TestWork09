export interface WeatherData {
  id: number;
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  wind: {
    speed: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  coord: {
    lat: number;
    lon: number;
  };
  visibility: number;
}

export type CurrentWeather = WeatherData;

export interface ForecastResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      humidity: number;
    };
    weather: Array<{
      description: string;
    }>;
    wind: {
      speed: number;
    };
  }>;
}

export interface City {
  id: number;
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}
