import { Artist, Track, Album, SearchResult, SearchFilters } from '../types/lastfm.types';

class LastFmService {
  private readonly API_KEY = '1060ed64aa23077eccf02a39f0f3902e';
  private readonly BASE_URL = 'https://ws.audioscrobbler.com/2.0/';

  private async makeRequest(params: Record<string, string>): Promise<any> {
    const url = new URL(this.BASE_URL);
    const searchParams = new URLSearchParams({
      api_key: this.API_KEY,
      format: 'json',
      ...params
    });
    
    url.search = searchParams.toString();

    try {
      const response = await fetch(url.toString());
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.message || 'API Error');
      }
      
      return data;
    } catch (error) {
      console.error('LastFM API request failed:', error);
      throw error;
    }
  }

  async searchArtists(query: string, limit: number = 20): Promise<Artist[]> {
    const data = await this.makeRequest({
      method: 'artist.search',
      artist: query,
      limit: limit.toString()
    });

    return data.results?.artistmatches?.artist || [];
  }

  async searchTracks(query: string, limit: number = 20): Promise<Track[]> {
    const data = await this.makeRequest({
      method: 'track.search',
      track: query,
      limit: limit.toString()
    });

    return data.results?.trackmatches?.track || [];
  }

  async searchAlbums(query: string, limit: number = 20): Promise<Album[]> {
    const data = await this.makeRequest({
      method: 'album.search',
      album: query,
      limit: limit.toString()
    });

    return data.results?.albummatches?.album || [];
  }

  async search(query: string, filters: SearchFilters): Promise<SearchResult[]> {
    if (!query.trim()) {
      return [];
    }

    const results: SearchResult[] = [];

    try {
      if (filters.type === 'all' || filters.type === 'artist') {
        const artists = await this.searchArtists(query, filters.limit);
        results.push(...artists.map(artist => ({
          type: 'artist' as const,
          data: artist
        })));
      }

      if (filters.type === 'all' || filters.type === 'track') {
        const tracks = await this.searchTracks(query, filters.limit);
        results.push(...tracks.map(track => ({
          type: 'track' as const,
          data: track
        })));
      }

      if (filters.type === 'all' || filters.type === 'album') {
        const albums = await this.searchAlbums(query, filters.limit);
        results.push(...albums.map(album => ({
          type: 'album' as const,
          data: album
        })));
      }

      return results;
    } catch (error) {
      console.error('Search failed:', error);
      throw new Error('Поиск не удался. Попробуйте еще раз.');
    }
  }

  async getArtistInfo(artistName: string): Promise<any> {
    return this.makeRequest({
      method: 'artist.getinfo',
      artist: artistName
    });
  }

  async getTrackInfo(artistName: string, trackName: string): Promise<any> {
    return this.makeRequest({
      method: 'track.getinfo',
      artist: artistName,
      track: trackName
    });
  }

  async getAlbumInfo(artistName: string, albumName: string): Promise<any> {
    return this.makeRequest({
      method: 'album.getinfo',
      artist: artistName,
      album: albumName
    });
  }

  getImageUrl(images: any[], size: string = 'large'): string {
    const image = images?.find(img => img.size === size) || images?.[0];
    return image?.['#text'] || '/placeholder-image.jpg';
  }
}

export const lastfmService = new LastFmService();