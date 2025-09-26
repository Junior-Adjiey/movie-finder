import MovieCard from './MovieCard'

export default function MovieList({ items }) {
  if (!items?.length) return null
  return (
    <div className="grid">
      {items.map(m => <MovieCard key={m.imdbID} movie={m} />)}
    </div>
  )
}