const BASE = 'https://www.omdbapi.com/'
const KEY = import.meta.env.VITE_OMDB_API_KEY

export async function searchMovies({ q, page = 1, type, year }) {
  const params = new URLSearchParams({ apikey: KEY, s: q || '', page })
  if (type && type !== 'all') params.set('type', type)
  if (year) params.set('y', String(year))
  const url = `${BASE}?${params.toString()}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Network error')
  const data = await res.json()
  // OMDB returns { Response: 'False', Error: 'Movie not found!' } on no hits
  if (data.Response === 'False') return { Search: [], totalResults: 0, Error: data.Error }
  return { Search: data.Search || [], totalResults: Number(data.totalResults || 0) }
}

export async function getMovieById(id) {
  const params = new URLSearchParams({ apikey: KEY, i: id, plot: 'full' })
  const res = await fetch(`${BASE}?${params.toString()}`)
  if (!res.ok) throw new Error('Network error')
  const data = await res.json()
  if (data.Response === 'False') throw new Error(data.Error || 'Movie not found')
  return data
}
