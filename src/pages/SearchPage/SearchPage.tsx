import React, { useState } from 'react';
import { Artist, Track, Album, SearchResult } from '../../types/lastfm.types';
import ResultCard from '../../components/ResultCard/ResultCard';

interface SearchPageProps {
  query: string;
  results: SearchResult[];
  onItemClick: (url: string) => void;
}

const TABS = ['Top', 'Artists', 'Albums', 'Tracks'] as const;
type TabType = typeof TABS[number];

const SearchPage: React.FC<SearchPageProps> = ({ query, results, onItemClick }) => {
  const [activeTab, setActiveTab] = useState<TabType>('Top');

  const filterResults = (type: SearchResult['type']) =>
    results.filter((item) => item.type === type);

  const topResults = results.slice(0, 6);
  const artists = filterResults('artist') as SearchResult[];
  const albums = filterResults('album') as SearchResult[];
  const tracks = filterResults('track') as SearchResult[];

  const renderResults = () => {
    const sectionClass = 'mb-12';
    switch (activeTab) {
      case 'Top':
        return (
          <div className={sectionClass}>
            <h3 className="text-lg text-gray-300 mb-4">Top Results</h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {topResults.map((item, index) => (
                <ResultCard
                  key={index}
                  result={item}
                  index={index}
                  onClick={() => onItemClick(item.data.url)}
                />
              ))}
            </div>
          </div>
        );
      case 'Artists':
        return (
          <div className={sectionClass}>
            <h3 className="text-lg text-gray-300 mb-4">Artists</h3>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
              {artists.map((item, index) => (
                <ResultCard
                  key={index}
                  result={item}
                  onClick={() => onItemClick(item.data.url)}
                />
              ))}
            </div>
          </div>
        );
      case 'Albums':
        return (
          <div className={sectionClass}>
            <h3 className="text-lg text-gray-300 mb-4">Albums</h3>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {albums.map((item, index) => (
                <ResultCard
                  key={index}
                  result={item}
                  onClick={() => onItemClick(item.data.url)}
                />
              ))}
            </div>
          </div>
        );
      case 'Tracks':
        return (
          <div className={sectionClass}>
            <h3 className="text-lg text-gray-300 mb-4">Tracks</h3>
            <div className="flex flex-col gap-3">
              {tracks.map((item, index) => (
                <ResultCard
                  key={index}
                  result={item}
                  index={index}
                  onClick={() => onItemClick(item.data.url)}
                />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-white mt-6">
      <h2 className="text-2xl font-light mb-6">Search results for "{query}"</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-700 mb-8 pb-2">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm pb-2 ${
              activeTab === tab
                ? 'text-[#ff4444] border-b-2 border-[#ff4444]'
                : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {renderResults()}
    </div>
  );
};

export default SearchPage;
