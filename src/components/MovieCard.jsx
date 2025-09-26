import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'

export default function MovieCard({ movie }) {
  const { isFav, addFav, removeFav } = useFavorites()
  const fav = isFav(movie.imdbID)
  const toggleFav = (e) => { e.preventDefault(); fav ? removeFav(movie.imdbID) : addFav(movie) }

  const poster =
    movie.Poster && movie.Poster !== 'N/A'
      ? movie.Poster
      : `https://placehold.co/400x600?text=${encodeURIComponent(movie.Title || 'No poster')}`

  return (
    <Link className="tile" to={`/movie/${movie.imdbID}`} title={movie.Title}>
      <img className="tile-img" src={poster} alt={`${movie.Title} poster`} loading="lazy" />

      {/* bouton favoris en overlay */}
      <button
        className={`fav-btn${fav ? ' active' : ''}`}
        onClick={toggleFav}
        aria-pressed={fav}
        aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {fav ? '★' : '☆'}
      </button>

      {/* dégradé bas + meta */}
      <div className="tile-grad" />
      <div className="tile-meta">
        <span className="tile-title">{movie.Title}</span>
        <span className="tile-badge">{movie.Year} · {movie.Type}</span>
      </div>
    </Link>
  )
}
