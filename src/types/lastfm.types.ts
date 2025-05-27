export interface Artist {
  name: string;
  mbid?: string;
  url: string;
  image: Image[];
  streamable: string;
}

export interface Track {
  name: string;
  artist: string;
  url: string;
  duration?: string;
  image?: Image[];
  mbid?: string;
}

export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  mbid?: string;
}

export interface Image {
  '#text': string;
  size: 'small' | 'medium' | 'large' | 'extralarge' | 'mega';
}

export interface SearchResult {
  type: 'artist' | 'track' | 'album';
  data: Artist | Track | Album;
}

export interface LastFmSearchResponse {
  results: {
    artistmatches?: {
      artist: Artist[];
    };
    trackmatches?: {
      track: Track[];
    };
    albummatches?: {
      album: Album[];
    };
  };
}

export interface SearchFilters {
  type: 'artist' | 'track' | 'album' | 'all';
  limit: number;
}

export interface SearchState {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  error: string | null;
  hasSearched: boolean;
}