import axios, { AxiosError } from 'axios';
import { CurrentWeather, ForecastResponse, City } from '@/types/weather';

const API_KEY = process.env.NEXT_PUBLIC_OWM_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const CACHE_TIME = 10 * 60 * 1000; // 10 минут

interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache = new Map<string, CacheItem<unknown>>();

const apiClient = axios.create({
  baseURL: BASE_URL,
  params: {
    appid: API_KEY,
    units: 'metric',
    lang: 'ru',
  },
  timeout: 5000,
});

apiClient.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 429) {
      throw new Error('Превышен лимит запросов. Пожалуйста, подождите.');
    }
    if (error.response?.status === 404) {
      throw new Error('Город не найден');
    }
    throw new Error('Произошла ошибка при получении данных');
  }
);

const getCached = <T>(key: string): T | null => {
  const item = cache.get(key);
  if (item && Date.now() - item.timestamp < CACHE_TIME) {
    return item.data as T;
  }
  cache.delete(key);
  return null;
};

const setCached = <T>(key: string, data: T): void => {
  cache.set(key, {
    data,
    timestamp: Date.now(),
  });
};

export const fetchCurrentWeather = async (
  city: string,
  signal?: AbortSignal
): Promise<CurrentWeather> => {
  const cacheKey = `weather_${city}`;
  const cached = getCached<CurrentWeather>(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const { data } = await apiClient.get<CurrentWeather>('/weather', {
      params: { q: city },
      signal,
    });
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Запрос был отменен');
    }
    throw error;
  }
};

export const fetchForecast = async (
  city: string,
  signal?: AbortSignal
): Promise<ForecastResponse> => {
  const cacheKey = `forecast_${city}`;
  const cached = getCached<ForecastResponse>(cacheKey);

  if (cached) {
    return cached;
  }

  try {
    const { data } = await apiClient.get<ForecastResponse>('/forecast', {
      params: {
        q: city,
      },
      signal,
    });
    setCached(cacheKey, data);
    return data;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Запрос был отменен');
    }
    throw error;
  }
};

export const searchCities = async (query: string, signal?: AbortSignal): Promise<City[]> => {
  try {
    const { data } = await apiClient.get<{ list: City[] }>('/find', {
      params: {
        q: query,
        type: 'like',
        sort: 'population',
        cnt: 10,
        lang: 'ru',
      },
      signal,
    });

    return data.list;
  } catch (error) {
    if (axios.isCancel(error)) {
      throw new Error('Запрос был отменен');
    }
    throw error;
  }
};
