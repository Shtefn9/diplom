import React, { useState, FormEvent } from 'react';
import { SearchFilters } from '../../types/lastfm.types';
import '../../index.css';

interface SearchFormProps {
  onSearch: (query: string, filters: SearchFilters) => void;
  isLoading: boolean;
  initialQuery?: string;
}

const SearchForm: React.FC<SearchFormProps> = ({ 
  onSearch, 
  isLoading, 
  initialQuery = '' 
}) => {
  const [query, setQuery] = useState<string>(initialQuery);
  const [filters, setFilters] = useState<SearchFilters>({
    type: 'all',
    limit: 20
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim(), filters);
    }
  };

  const handleFilterChange = (type: SearchFilters['type']) => {
    const newFilters = { ...filters, type };
    setFilters(newFilters);
  };

  const handleLimitChange = (limit: number) => {
    const newFilters = { ...filters, limit };
    setFilters(newFilters);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <div className="search-input-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="search-button"
          disabled={isLoading || !query.trim()}
        >
          {isLoading ? 'Поиск...' : 'Найти'}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;