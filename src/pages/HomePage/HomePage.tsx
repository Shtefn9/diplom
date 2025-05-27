import React from 'react';
import { Track, Artist } from '../../types/lastfm.types';
import '../../index.css';

export interface HomePageProps {
  popularTracks: Track[];
  topArtists: Artist[];
  onItemClick: (url: string) => void;
}

const Homepage: React.FC<HomePageProps> = ({ popularTracks, topArtists, onItemClick }) => {
  return (
    <div className="bg-black text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Hot right now section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Hot right now</h2>
          <div className="grid grid-cols-4 gap-4">
            {topArtists.slice(0, 12).map((artist, index) => (
              <div
                key={`${artist.name}-${index}`}
                className="text-center cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => onItemClick(artist.url)}
              >
              <br></br>
                <div className="w-full aspect-square rounded-full overflow-hidden mb-2 bg-gray-800">
                  {artist.image?.[2]?.['#text'] ? (
                    <img
                      src={artist.image[2]['#text']}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                </div>
                <p className="text-sm font-medium truncate">{artist.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Popular tracks section */}
        <section>
          <h2 className="text-xl font-bold mb-4">Popular tracks</h2>
          <div className="grid grid-cols-2 gap-3">
            {popularTracks.slice(0, 20).map((track, index) => (
              <div
                key={`${track.name}-${index}`}
                className="flex items-center p-2 rounded hover:bg-gray-900 transition-colors cursor-pointer"
                onClick={() => onItemClick(track.url)}
              >
                {/* Обложка */}
                <div className="w-16 h-16 rounded overflow-hidden bg-gray-800 flex-shrink-0 mr-3">
                  {track.image?.[1]?.['#text'] ? (
                    <img
                      src={track.image[1]['#text']}
                      alt={track.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling!.classList.remove('hidden');
                      }}
                    />
                  ) : null}
                </div>
                {/* Название трека */}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{track.name}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Homepage;