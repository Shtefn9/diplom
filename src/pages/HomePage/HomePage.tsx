import React from 'react';
import { Track, Artist } from '../../types/lastfm.types';
import ResultCard from '../../components/ResultCard/ResultCard';
import '../../index.css';

export interface HomePageProps {
  popularTracks: Track[];
  topArtists: Artist[];
  onItemClick: (url: string) => void;
}

const Homepage: React.FC<HomePageProps> = ({ popularTracks, topArtists, onItemClick }) => {
  return (
    <div className="space-y-12">
      {/* Top Artists */}
      <section>
        <h2 className="text-2xl font-light mb-6">Top Artists</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {topArtists.map((artist, index) => (
            <ResultCard
              key={index}
              result={{ type: 'artist', data: artist }}
              onClick={() => onItemClick(artist.url)}
            />
          ))}
        </div>
      </section>

      {/* Popular Tracks */}
      <section>
        <h2 className="text-2xl font-light mb-6">Popular Tracks</h2>
        <div className="flex flex-col gap-3">
          {popularTracks.map((track, index) => (
            <ResultCard
              key={index}
              result={{ type: 'track', data: track }}
              index={index}
              onClick={() => onItemClick(track.url)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
