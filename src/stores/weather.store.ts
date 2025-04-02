import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { fetchCurrentWeather } from '@/services/weather.api';
import { CurrentWeather } from '@/types/weather';

interface City {
  id: number;
  name: string;
  country: string;
  coord: {
    lat: number;
    lon: number;
  };
}

interface WeatherState {
  favorites: City[];
  currentWeather: CurrentWeather | null;
  isLoading: boolean;
  error: string | null;
  lastSearchQuery: string | null;
  lastSearchTime: number | null;
  addFavorite: (city: City) => void;
  removeFavorite: (cityId: number) => void;
  loadWeather: (city: string) => Promise<void>;
  clearError: () => void;
}

const MIN_SEARCH_INTERVAL = 1000;

export const useWeatherStore = create<WeatherState>()(
  persist(
    (set, get) => ({
      favorites: [],
      currentWeather: null,
      isLoading: false,
      error: null,
      lastSearchQuery: null,
      lastSearchTime: null,

      addFavorite: city =>
        set(state => {
          if (state.favorites.some(f => f.id === city.id)) return state;
          return { favorites: [...state.favorites, city] };
        }),

      removeFavorite: cityId =>
        set(state => ({
          favorites: state.favorites.filter(city => city.id !== cityId),
        })),

      loadWeather: async city => {
        const state = get();
        const now = Date.now();

        if (state.lastSearchTime && now - state.lastSearchTime < MIN_SEARCH_INTERVAL) {
          return;
        }

        if (state.lastSearchQuery === city && state.currentWeather?.name === city) {
          return;
        }

        set({ isLoading: true, error: null, lastSearchQuery: city, lastSearchTime: now });

        try {
          const data = await fetchCurrentWeather(city);
          set({ currentWeather: data, isLoading: false });
        } catch (error) {
          set({
            error: error instanceof Error ? error.message : 'Произошла ошибка при загрузке погоды',
            isLoading: false,
            currentWeather: null,
          });
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'weather-storage',
      partialize: state => ({ favorites: state.favorites }),
    }
  )
);
