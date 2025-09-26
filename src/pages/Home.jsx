import { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import MovieList from '../components/MovieList'
import Pagination from '../components/Pagination'
import Filters from '../components/Filters'
import { searchMovies } from '../api/omdb'
import { TMDB } from '../api/tmdb'
import Hero from '../components/Hero'
import Row from '../components/Row'
import '../Home.css'

export default function Home() {
  // Recherche OMDb
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [year, setYear] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)

  // Données TMDB pour les sections Netflix
  const [hero, setHero] = useState(null)
  const [trending, setTrending] = useState([])
  const [popular, setPopular] = useState([])
  const [top, setTop] = useState([])
  const [now, setNow] = useState([])

  // Charger les sections TMDB si pas de recherche
  useEffect(() => {
    if (query) return
    let ignore = false
    ;(async () => {
      try {
        const [t, p, r, n] = await Promise.all([
          TMDB.trending(), TMDB.popular(), TMDB.topRated(), TMDB.nowPlaying()
        ])
        if (ignore) return
        setTrending(t.results || [])
        setPopular(p.results || [])
        setTop(r.results || [])
        setNow(n.results || [])
        setHero((t.results || [])[0] || (p.results || [])[0] || null)
      } catch (e) {
        // silencieux : si pas de clé TMDB, l’UI OMDb reste fonctionnelle
        console.warn('TMDB error', e)
      }
    })()
    return () => { ignore = true }
  }, [query])

  // reset page à chaque changement de filtres
  useEffect(() => { setPage(1) }, [query, type, year])

  // Recherche OMDb
  useEffect(() => {
    let ignore = false
    async function run() {
      if (!query) { setResults([]); setTotal(0); setError(''); return }
      setLoading(true); setError('')
      try {
        const { Search, totalResults, Error } = await searchMovies({ q: query, page, type, year })
        if (ignore) return
        setResults(Search || [])
        setTotal(parseInt(totalResults) || 0)
        if ((!Search || !Search.length) && Error) setError(Error)
      } catch (e) {
        if (!ignore) setError(e.message || 'Something went wrong')
      } finally {
        if (!ignore) setLoading(false)
      }
    }
    run()
    return () => { ignore = true }
  }, [query, page, type, year])

  return (
    <div className="home-container">
      {/* MODE NETFLIX quand query est vide */}
      {!query && (
        <>
          <Hero movie={hero} />
          <div className="container">
            <div className="search-section">
              <SearchBar onSearch={setQuery} defaultQuery={query} />
              <div className="filters-container">
                <Filters type={type} year={year} onType={setType} onYear={setYear} />
              </div>
            </div>
            <Row title="Tendances" items={trending} />
            <Row title="Les plus populaires" items={popular} />
            <Row title="Les mieux notés" items={top} />
            <Row title="En salles" items={now} />
          </div>
        </>
      )}

      {/* MODE RECHERCHE OMDb quand query existe */}
      {query && (
        <div className="container">
          <div className="search-section" style={{ marginTop: '1rem' }}>
            <SearchBar onSearch={setQuery} defaultQuery={query} />
            <div className="filters-container">
              <Filters type={type} year={year} onType={setType} onYear={setYear} />
            </div>
          </div>

          {loading && <div className="loading-container"><div className="spinner"></div><p>Recherche en cours...</p></div>}
          {!loading && error && <div className="error-message"><span className="error-icon">⚠️</span><p>{error}</p></div>}
          {!loading && !error && results.length === 0 && <div className="no-results"><h3>Aucun résultat</h3></div>}

          {!loading && results.length > 0 && (
            <>
              <div className="results-header">
                <h2>Résultats pour “{query}”</h2>
                <p className="results-count">{total} résultat(s)</p>
              </div>
              <MovieList items={results} />
              <Pagination page={page} total={total} onPage={setPage} />
            </>
          )}
        </div>
      )}
    </div>
  )
}
