'use client';

import Link from 'next/link';
import { useWeatherStore } from '@/stores/weather.store';
import { WeatherCard } from '@/components/weather/WeatherCard';
import styles from './page.module.scss';

export default function FavoritesPage() {
  const { favorites, loadWeather, currentWeather } = useWeatherStore();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← На главную
        </Link>
        <h1 className={styles.title}>Избранные города</h1>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <p>У вас пока нет избранных городов</p>
            <Link href="/" className={styles.link}>
              Добавить город
            </Link>
          </div>
        ) : (
          <div className={styles.favoritesGrid}>
            {favorites.map(city => (
              <div
                key={city.id}
                className={styles.favoriteCity}
                onClick={() => loadWeather(city.name)}
              >
                <h3>{city.name}</h3>
                <p>{city.country}</p>
              </div>
            ))}
          </div>
        )}

        {currentWeather && (
          <div className={styles.currentWeather}>
            <h2>Текущая погода</h2>
            <Link href={`/forecast/${encodeURIComponent(currentWeather.name)}`}>
              <WeatherCard
                data={currentWeather}
                isFavorite={favorites.some(f => f.id === currentWeather.id)}
                onToggleFavorite={() => {}}
              />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
