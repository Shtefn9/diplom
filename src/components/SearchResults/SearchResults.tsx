import React from 'react';
import { SearchResult } from '../../types/lastfm.types';
import ResultCard from '../ResultCard/ResultCard';
import '../../index.css';

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ 
  results, 
  isLoading, 
  error, 
  hasSearched 
}) => {
  if (isLoading) {
    return (
      <div className="search-results">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Поиск...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="search-results">
        <div className="error">
          <p>Ошибка: {error}</p>
        </div>
      </div>
    );
  }

  if (hasSearched && results.length === 0) {
    return (
      <div className="search-results">
        <div className="no-results">
          <p>Ничего не найдено. Попробуйте изменить запрос.</p>
        </div>
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="search-results">
        <div className="welcome">
          <h2>Добро пожаловать в Music Search!</h2>
          <p>Используйте форму выше для поиска артистов, треков и альбомов.</p>
        </div>
      </div>
    );
  }

  // Группировка результатов по типу
  const groupedResults = results.reduce((acc, result) => {
    if (!acc[result.type]) {
      acc[result.type] = [];
    }
    acc[result.type].push(result);
    return acc;
  }, {} as Record<string, SearchResult[]>);

  const typeLabels = {
    artist: 'Артисты',
    track: 'Треки',
    album: 'Альбомы'
  };

  return (
    <div className="search-results">
      <div className="results-header">
        <h2>Результаты поиска ({results.length})</h2>
      </div>

      {Object.entries(groupedResults).map(([type, typeResults]) => (
        <div key={type} className="results-section">
          <h3 className="section-title">
            {typeLabels[type as keyof typeof typeLabels]} ({typeResults.length})
          </h3>
          <div className="results-grid">
            {typeResults.map((result, index) => (
              <ResultCard 
                key={`${result.type}-${index}`} 
                result={result} 
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;