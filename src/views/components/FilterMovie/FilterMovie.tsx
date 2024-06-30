import React, { useState } from 'react';
import Select from '../../UI/Select/Select';
import MultiSelect from '../../UI/MultiSelect/MultiSelect';
import './FilterMovie.css'

export interface Filters {
  minimum_rating: number | null;
  maximum_rating: number | null;
  genres: string | string[];
  minimum_year: number;
  maximum_year: number;
}

export  interface FilteredMoviesProps {
  onFiltersChange: (filters: Filters) => void;
}


const FilterMovies: React.FC<FilteredMoviesProps> = ({ onFiltersChange }) => {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedMinRating, setSelectedMinRating] = useState<number | null>(null);
  const [selectedMaxRating, setSelectedMaxRating] = useState<number | null>(null);
  const [selectedMinYear, setSelectedMinYear] = useState<number>(1990);
  const [selectedMaxYear, setSelectedMaxYear] = useState<number>(new Date().getFullYear());

  const handleGenresChange = (selectedGenres: string | string[]) => {
    setSelectedGenres(Array.isArray(selectedGenres) ? selectedGenres : [selectedGenres]);
  };
  

  const handleMinRatingChange = (value: string) => {
    setSelectedMinRating(Number(value));
  };

  const handleMaxRatingChange = (value: string) => {
    setSelectedMaxRating(Number(value));
  };

  const handleMinYearChange = (value: string) => {
    setSelectedMinYear(Number(value));
  };

  const handleMaxYearChange = (value: string) => {
    setSelectedMaxYear(Number(value));
  };

  const applyFilters = () => {
    const filters = {
      minimum_rating: selectedMinRating,
      maximum_rating: selectedMaxRating,
      genres: selectedGenres.length > 0 ? selectedGenres.join(',') : '',
      minimum_year: selectedMinYear,
      maximum_year: selectedMaxYear,
    };
    onFiltersChange(filters);
  };

  return (
    <div className="filters-container">
      
      <Select
        defaultValue="Mn Raiting"
        options={[
          { value: '0', name: '0' },
          { value: '2', name: '2' },
          { value: '5', name: '5' },
          { value: '7', name: '7' },
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
          { value: 'horror', name: 'Horror' },
        ]}
        onChange={handleGenresChange}
      />
      <button onClick={applyFilters}>Apply filters</button>
      <button onClick={applyFilters}>Clean filters</button>
    </div>
  );
};

const generateYearOptions = (startYear: number, endYear: number) => {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push({ value: String(year), name: String(year) });
  }
  return years;
};

export default FilterMovies;
