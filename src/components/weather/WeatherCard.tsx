'use client';

import { WeatherData } from '@/types/weather';
import { FavoriteButton } from '@/components/ui/buttons/FavoriteButton';
import styles from './WeatherCard.module.scss';

interface WeatherCardProps {
  data: WeatherData;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function WeatherCard({ data, isFavorite, onToggleFavorite }: WeatherCardProps) {
  return (
    <div className={`card border-0 shadow-sm ${styles.card}`}>
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h4 mb-1">{data.name}</h2>
            <p className="text-muted mb-0">{data.sys.country}</p>
          </div>
          <FavoriteButton isActive={isFavorite} onClick={onToggleFavorite} />
        </div>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <div className="display-4 fw-bold text-primary mb-1">{Math.round(data.main.temp)}°</div>
            <div className="text-muted small">
              Ощущается как {Math.round(data.main.feels_like)}°
            </div>
          </div>
          <div className="d-flex flex-column align-items-center">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt={data.weather[0].description}
              width={64}
              height={64}
              className="mb-2"
            />
            <p className="text-muted text-capitalize small mb-0">{data.weather[0].description}</p>
          </div>
        </div>

        <div className="row g-3 py-3 border-top border-bottom">
          <div className="col-3 text-center">
            <div className="text-muted small mb-2">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="me-1"
                style={{ width: '16px', height: '16px', verticalAlign: 'middle' }}
              >
                <path
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Влажность
            </div>
            <div className="fw-medium">{data.main.humidity}%</div>
          </div>
          <div className="col-3 text-center">
            <div className="text-muted small mb-2">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="me-1"
                style={{ width: '16px', height: '16px', verticalAlign: 'middle' }}
              >
                <path
                  d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Ветер
            </div>
            <div className="fw-medium">{data.wind.speed} м/с</div>
          </div>
          <div className="col-3 text-center">
            <div className="text-muted small mb-2">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="me-1"
                style={{ width: '16px', height: '16px', verticalAlign: 'middle' }}
              >
                <path
                  d="M12 3v18M8 7h8M8 11h8M8 15h8M8 19h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Давление
            </div>
            <div className="fw-medium">{data.main.pressure} гПа</div>
          </div>
          <div className="col-3 text-center">
            <div className="text-muted small mb-2">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="me-1"
                style={{ width: '16px', height: '16px', verticalAlign: 'middle' }}
              >
                <path
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Видимость
            </div>
            <div className="fw-medium">{(data.visibility / 1000).toFixed(1)} км</div>
          </div>
        </div>
      </div>
    </div>
  );
}
