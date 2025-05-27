import React, { useState, useEffect } from 'react';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import ResultCard from './components/ResultCard/ResultCard';
import Homepage from './pages/HomePage/HomePage';
import './index.css';

import { Track, Artist, SearchResult } from './types/lastfm.types';

const API_KEY = '1060ed64aa23077eccf02a39f0f3902e';
const BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

function App() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [popularTracks, setPopularTracks] = useState<Track[]>([]);
  const [topArtists, setTopArtists] = useState<Artist[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchPopularTracks();
    fetchTopArtists();
  }, []);

  const fetchPopularTracks = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?method=chart.gettoptracks&api_key=${API_KEY}&format=json&limit=20`
      );
      const data = await response.json();
      setPopularTracks(data.tracks?.track || []);
    } catch (error) {
      console.error('Error fetching popular tracks:', error);
    }
  };

  const fetchTopArtists = async () => {
    try {
      const response = await fetch(
        `${BASE_URL}?method=chart.gettopartists&api_key=${API_KEY}&format=json&limit=12`
      );
      const data = await response.json();
      setTopArtists(data.artists?.artist || []);
    } catch (error) {
      console.error('Error fetching top artists:', error);
    }
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    setIsSearching(true);
    setSearchQuery(query);

    try {
      const [tracksResponse, artistsResponse] = await Promise.all([
        fetch(`${BASE_URL}?method=track.search&track=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=10`),
        fetch(`${BASE_URL}?method=artist.search&artist=${encodeURIComponent(query)}&api_key=${API_KEY}&format=json&limit=10`)
      ]);

      const tracksData = await tracksResponse.json();
      const artistsData = await artistsResponse.json();

      const tracks = tracksData.results?.trackmatches?.track || [];
      const artists = artistsData.results?.artistmatches?.artist || [];

      const wrappedTracks: SearchResult[] = tracks.map((track: Track) => ({
        type: 'track',
        data: track,
      }));

      const wrappedArtists: SearchResult[] = artists.map((artist: Artist) => ({
        type: 'artist',
        data: artist,
      }));

      setSearchResults([...wrappedTracks, ...wrappedArtists]);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const openLastFmUrl = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="app">
      <Header />
      <div className="container">
        <SearchForm onSearch={handleSearch} isLoading={isSearching} />

        {searchQuery ? (
          <div className="search-results">
            <h2>Search Results for "{searchQuery}"</h2>
            <div className="results-grid">
              {searchResults.map((item, index) => (
                <ResultCard
                  key={index}
                  result={item}
                  index={index}
                  onClick={() => openLastFmUrl(item.data.url)}
                />
              ))}
            </div>
          </div>
        ) : (
          <Homepage
            popularTracks={popularTracks}
            topArtists={topArtists}
            onItemClick={openLastFmUrl}
          />
        )}
      </div>
    </div>
  );
}

export default App;
