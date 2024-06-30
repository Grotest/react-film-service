import React, { useState } from 'react';
import Select from '../../UI/Select/Select';
import MultiSelect from '../../UI/MultiSelect/MultiSelect';
import './FilterMovie.css'

interface FilteredMoviesProps {
  onFiltersChange: (filters: any) => void; // Колбэк для передачи выбранных фильтров в родительский компонент
}

const FilteredMovies: React.FC<FilteredMoviesProps> = ({ onFiltersChange }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]); // Выбранные жанры
  const [selectedMinRating, setSelectedMinRating] = useState<number | null>(null); // Минимальный рейтинг
  const [selectedMaxRating, setSelectedMaxRating] = useState<number | null>(null); // Максимальный рейтинг
  const [selectedMinYear, setSelectedMinYear] = useState<number>(1990); // Минимальный год выпуска
  const [selectedMaxYear, setSelectedMaxYear] = useState<number>(new Date().getFullYear()); // Максимальный год выпуска

  // Обработчик изменения выбранных жанров
  const handleGenresChange = (selectedGenres: string | string[]) => {
    setSelectedGenres(Array.isArray(selectedGenres) ? selectedGenres : [selectedGenres]);
  };

  // Обработчики изменения рейтинга
  const handleMinRatingChange = (value: string) => {
    setSelectedMinRating(Number(value));
  };

  const handleMaxRatingChange = (value: string) => {
    setSelectedMaxRating(Number(value));
  };

  // Обработчики изменения года выпуска
  const handleMinYearChange = (value: string) => {
    setSelectedMinYear(Number(value));
  };

  const handleMaxYearChange = (value: string) => {
    setSelectedMaxYear(Number(value));
  };

  // Применение выбранных фильтров
  const applyFilters = () => {
    const filters = {
      minimum_rating: selectedMinRating,
      maximum_rating: selectedMaxRating,
      genre: selectedGenres.length > 0 ? selectedGenres.join(',') : '', // Проверяем наличие элементов в массиве
      minimum_year: selectedMinYear,
      maximum_year: selectedMaxYear,
    };
    console.log(filters)
    onFiltersChange(filters);
  };

  return (
    <div className="filters-container">
      
      <Select
        defaultValue="Man Raiting"
        options={[
          { value: '0', name: '0' },
          { value: '2', name: '2' },
          { value: '5', name: '5' },
          { value: '7', name: '7' },
          // Добавьте другие опции по вашему выбору
        ]}
        onChange={handleMinRatingChange}
      />

      <Select
        defaultValue="Max Raiting"
        options={[
          { value: '10', name: '10' },
          { value: '8', name: '8' },
          { value: '6', name: '6' },
          { value: '4', name: '4' },
          // Добавьте другие опции по вашему выбору
        ]}
        onChange={handleMaxRatingChange}
      />

      <Select
        defaultValue="Min Year"
        options={generateYearOptions(1990, new Date().getFullYear())}
        onChange={handleMinYearChange}
      />

      <Select
        defaultValue="Max Year"
        options={generateYearOptions(selectedMinYear, new Date().getFullYear())}
        onChange={handleMaxYearChange}
      />

      <MultiSelect
        label="Ganre"
        options={[
          { value: 'action', name: 'Action' },
          { value: 'comedy', name: 'Comedy' },
          { value: 'drama', name: 'Drama' },
          { value: 'fantasy', name: 'Fantasy' },
          // Добавьте другие жанры по вашему выбору
        ]}
        onChange={handleGenresChange}
        isMulti
      />

      <button onClick={applyFilters}>Apply filters</button>
    </div>
  );
};

// Функция для генерации опций годов
const generateYearOptions = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: String(year), name: String(year) });
  }
  return years;
};

export default FilteredMovies;
