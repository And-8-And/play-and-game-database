import { lookupsApi } from '../api/lookupsApi.js';
import { useAsync } from './useAsync.js';

export const useLookups = () => {
  const genres = useAsync(lookupsApi.getGenres, []);
  const platforms = useAsync(lookupsApi.getPlatforms, []);
  return { genres: genres.data ?? [], platforms: platforms.data ?? [] };
};