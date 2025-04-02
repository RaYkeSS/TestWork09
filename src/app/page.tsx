'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { SearchInput } from '@/components/ui/inputs/SearchInput';
import { WeatherCard } from '@/components/weather/WeatherCard';
import { useWeatherStore } from '@/stores/weather.store';
import { City } from '@/types/weather';

export default function Home() {
  const { currentWeather, isLoading, error, loadWeather, addFavorite, removeFavorite, favorites } =
    useWeatherStore();

  const handleCitySelect = (city: City) => {
    loadWeather(city.name);
  };

  const handleToggleFavorite = () => {
    if (!currentWeather) return;

    const city = {
      id: currentWeather.id,
      name: currentWeather.name,
      country: currentWeather.sys.country,
      coord: currentWeather.coord,
    };

    if (favorites.some(f => f.id === city.id)) {
      removeFavorite(city.id);
    } else {
      addFavorite(city);
    }
  };

  const handleFavoriteCityClick = (city: City) => {
    loadWeather(city.name);
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (favorites.length > 0) {
      loadWeather(favorites[0].name);
    }
  }, [favorites, loadWeather]);

  return (
    <main className="min-vh-100 p-4 bg-gradient">
      <div className="container">
        <nav className="d-flex justify-content-end py-3 mb-4 border-bottom">
          <Link href="/favorites" className="btn btn-light shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="me-2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Избранное
          </Link>
        </nav>

        <h1 className="text-center text-dark mb-4 display-4">Прогноз погоды</h1>

        <div className="mb-4">
          <SearchInput onCitySelect={handleCitySelect} />
        </div>

        {isLoading ? (
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="placeholder-glow">
                <div className="placeholder col-6 mb-3"></div>
                <div className="placeholder col-12 mb-3"></div>
                <div className="placeholder col-12"></div>
              </div>
            </div>
          </div>
        ) : currentWeather ? (
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title h4 mb-3">Текущая погода</h2>
              <Link
                href={`/forecast/${encodeURIComponent(currentWeather.name)}`}
                className="text-decoration-none"
              >
                <WeatherCard
                  data={currentWeather}
                  isFavorite={favorites.some(f => f.id === currentWeather.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              </Link>
            </div>
          </div>
        ) : (
          <div className="card shadow-sm">
            <div className="card-body text-center text-muted">
              Введите название города, чтобы узнать погоду
            </div>
          </div>
        )}

        {favorites.length > 0 && (
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="card-title h4 mb-3">Избранные города</h2>
              <div className="row g-3">
                {favorites.map(city => (
                  <div key={city.id} className="col-md-4">
                    <button
                      onClick={() => handleFavoriteCityClick(city)}
                      className="w-100 text-start p-3 bg-light rounded border-0 text-dark hover-bg-light"
                    >
                      {city.name}, {city.country}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
