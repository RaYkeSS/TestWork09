import { useState, useCallback } from 'react';
import { City } from '@/types/weather';
import { searchCities } from '@/services/weather.api';
import styles from './styles.module.scss';

interface SearchBarProps {
  onSelectCity: (city: City) => void;
}

export const SearchBar = ({ onSelectCity }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = useCallback(async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setResults([]);
      return;
    }

    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const cities = await searchCities(searchQuery);
      if (!cities || cities.length === 0) {
        setResults([]);
        return;
      }
      setResults(cities);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка при поиске');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleCitySelect = (city: City) => {
    onSelectCity(city);
    setQuery('');
    setResults([]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Введите название города..."
          className={styles.input}
          aria-label="Поиск города"
        />
        {isLoading && <div className={styles.spinner} />}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      {results.length > 0 && (
        <ul className={styles.results} role="listbox">
          {results.map(city => (
            <li
              key={city.id}
              className={styles.resultItem}
              onClick={() => handleCitySelect(city)}
              role="option"
            >
              {city.name}, {city.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
