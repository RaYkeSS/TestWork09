'use client';

import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { City } from '@/types/weather';
import { searchCities } from '@/services/weather.api';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  onCitySelect: (city: City) => void;
}

const MIN_SEARCH_LENGTH = 3;

export const SearchInput = ({ onCitySelect }: SearchInputProps) => {
  const [value, setValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);
  const debouncedValue = useDebounce(value, 500);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim() || query.length < MIN_SEARCH_LENGTH) {
      setCities([]);
      return;
    }

    try {
      setIsSearching(true);
      setError(null);
      const results = await searchCities(query);
      if (results && results.length > 0) {
        setCities(results);
      } else {
        setCities([]);
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Ошибка при поиске');
      setCities([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    handleSearch(debouncedValue);
  }, [debouncedValue, handleSearch]);

  const handleCitySelect = (city: City) => {
    onCitySelect(city);
    setValue('');
    setCities([]);
  };

  return (
    <div className={styles.searchInputWrapper}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder={`Введите город (минимум ${MIN_SEARCH_LENGTH} буквы)...`}
        className={styles.input}
      />
      {isSearching && <div className={styles.searchIndicator}>Поиск...</div>}
      {value.length > 0 && value.length < MIN_SEARCH_LENGTH && (
        <div className={styles.searchHint}>
          Введите минимум {MIN_SEARCH_LENGTH} буквы для поиска
        </div>
      )}
      {error && <div className={styles.error}>{error}</div>}
      {cities.length > 0 && (
        <ul className={styles.results} role="listbox">
          {cities.map(city => (
            <li
              key={city.id}
              className={styles.resultItem}
              onClick={() => handleCitySelect(city)}
              role="option"
            >
              {city.name}
              {city.country ? `, ${city.country}` : ''}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
