'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { fetchForecast } from '@/services/weather.api';
import { ForecastResponse } from '@/types/weather';
import styles from './page.module.scss';

interface DailyForecast {
  date: Date;
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export default function ForecastPage() {
  const params = useParams();
  const [forecast, setForecast] = useState<ForecastResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const dailyForecasts = useMemo(() => {
    if (!forecast) return [];

    const forecastsByDay = forecast.list.reduce((acc: Record<string, DailyForecast>, item) => {
      const date = new Date(item.dt * 1000);
      const dayKey = date.toLocaleDateString();

      if (!acc[dayKey]) {
        acc[dayKey] = {
          date,
          temp: item.main.temp,
          description: item.weather[0].description,
          humidity: item.main.humidity,
          windSpeed: item.wind.speed,
        };
      }
      return acc;
    }, {});

    return Object.values(forecastsByDay).slice(0, 5);
  }, [forecast]);

  useEffect(() => {
    const loadForecast = async () => {
      try {
        setIsLoading(true);
        const city = decodeURIComponent(params.city as string);
        const data = await fetchForecast(city);
        setForecast(data);
      } catch (err) {
        setError('Ошибка при загрузке прогноза');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadForecast();
  }, [params.city]);

  if (isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.skeleton}>
            <div className={styles.skeletonHeader} />
            <div className={styles.skeletonGrid}>
              {[...Array(5)].map((_, i) => (
                <div key={i} className={styles.skeletonCard} />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.error}>{error}</div>
          <Link href="/" className={styles.backLink}>
            Вернуться на главную
          </Link>
        </div>
      </main>
    );
  }

  if (!forecast) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.error}>Прогноз не найден</div>
          <Link href="/" className={styles.backLink}>
            Вернуться на главную
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <Link href="/" className={styles.backLink}>
          ← Вернуться на главную
        </Link>
        <h1 className={styles.title}>
          Прогноз погоды для {decodeURIComponent(params.city as string)}
        </h1>
        <div className={styles.forecastGrid}>
          {dailyForecasts.map((day, index) => (
            <div key={index} className={styles.forecastItem}>
              <div className={styles.date}>
                {day.date.toLocaleDateString('ru-RU', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
              <div className={styles.temperature}>{Math.round(day.temp)}°C</div>
              <div className={styles.description}>{day.description}</div>
              <div className={styles.details}>
                <div>Влажность: {day.humidity}%</div>
                <div>Ветер: {day.windSpeed} м/с</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
