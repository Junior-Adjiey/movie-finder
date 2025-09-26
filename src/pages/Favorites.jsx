import { Link } from 'react-router-dom'
import { useFavorites } from '../context/FavoritesContext'
import MovieList from '../components/MovieList'

export default function Favorites() {
  const { favorites, clearFavs } = useFavorites()

  return (
    <div className="container">
      <div className="row" style={{justifyContent:'space-between'}}>
        <h1 style={{margin:0}}>Favorites</h1>
        {favorites.length > 0 && <button className="ghost" onClick={clearFavs}>Clear all</button>}
      </div>
      {favorites.length === 0 ? (
        <p className="center">No favorites yet. <Link className="link" to="/">Search movies</Link>.</p>
      ) : (
        <MovieList items={favorites} />
      )}
    </div>
  )
}