const API_KEY = import.meta.env.VITE_TMDB_KEY;
const BASE = 'https://api.themoviedb.org/3';

const get = async (path, params = {}) => {
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'fr-FR');
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  if (!res.ok) throw new Error('TMDB error');
  return res.json();
};

export const img = (path, size='w780') => path ? `https://image.tmdb.org/t/p/${size}${path}` : '';

export const TMDB = {
  trending: () => get('/trending/movie/week'),
  popular: () => get('/movie/popular'),
  topRated: () => get('/movie/top_rated'),
  nowPlaying: () => get('/movie/now_playing'),
  details: (id) => get(`/movie/${id}`),
  externalIds: (id) => get(`/movie/${id}/external_ids`),
};
