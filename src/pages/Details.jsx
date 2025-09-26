import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieById } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';
import '../Details.css';

export default function Details() {
  const { id } = useParams();              // imdbID (ex: tt1234567)
  const nav = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- Favoris ---
  const { isFav, addFav, removeFav } = useFavorites();
  const fav = isFav(id);

  useEffect(() => {
    let ignore = false;
    async function run() {
      setLoading(true); setError('');
      try {
        const data = await getMovieById(id);
        if (!ignore) setMovie(data);
      } catch (e) {
        if (!ignore) setError(e.message || 'Not found');
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    run();
    return () => { ignore = true; };
  }, [id]);

  const toggleFav = () => {
    if (!movie) return;
    if (fav) {
      removeFav(id);
    } else {
      // On stocke au format OMDb (clé = imdbID)
      addFav({
        imdbID: movie.imdbID,
        Title: movie.Title,
        Year: movie.Year,
        Type: movie.Type || 'movie',
        Poster:
          movie.Poster && movie.Poster !== 'N/A'
            ? movie.Poster
            : `https://placehold.co/400x600?text=${encodeURIComponent(movie.Title || 'Movie')}`,
      });
    }
  };

  if (loading) return (
    <div className="details-loading">
      <div className="loading-spinner"></div>
      <p>Loading movie details...</p>
    </div>
  );

  if (error) return (
    <div className="details-error">
      <div className="error-icon">⚠️</div>
      <h2>Oops! Something went wrong</h2>
      <p>{error}</p>
      <button className="back-button" onClick={() => nav(-1)}>Go Back</button>
    </div>
  );

  if (!movie) return null;

  return (
    <div className="details-container">
      {/* Hero section with backdrop */}
      <div
        className="details-hero"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(20,20,20,1)), url(${
            movie.Poster !== 'N/A'
              ? movie.Poster
              : `https://placehold.co/1280x720?text=${encodeURIComponent(movie.Title)}`
          })`,
        }}
      >
        <div className="hero-content">
          <button className="back-button hero-back" onClick={() => nav(-1)}>
            <span className="back-arrow">←</span> Back
          </button>

          <div className="hero-info">
            <h1 className="hero-title">
              {movie.Title} <span className="hero-year">({movie.Year})</span>
            </h1>

            <div className="movie-meta">
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <span className="imdb-rating">
                  <span className="imdb-logo">IMDb</span> {movie.imdbRating}/10
                </span>
              )}
              {movie.Rated && movie.Rated !== 'N/A' && <span className="rated">{movie.Rated}</span>}
              {movie.Runtime && movie.Runtime !== 'N/A' && <span className="runtime">{movie.Runtime}</span>}
            </div>

            <div className="action-buttons">
              <button className="play-button">
                <span className="play-icon">▶</span> Play
              </button>

              {/* --- Bouton Favoris --- */}
              <button
                className={`add-to-list ${fav ? 'active' : ''}`}
                onClick={toggleFav}
                aria-pressed={fav}
                title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                {fav ? '★' : '＋'}
              </button>
            </div>

            {movie.Plot && movie.Plot !== 'N/A' && (
              <p className="hero-plot">{movie.Plot}</p>
            )}
          </div>
        </div>
      </div>

      {/* Details section */}
      <div className="details-content">
        <div className="details-grid">
          <div className="details-poster">
            <img
              src={
                movie.Poster !== 'N/A'
                  ? movie.Poster
                  : `https://placehold.co/400x600?text=${encodeURIComponent(movie.Title)}`
              }
              alt={`${movie.Title} poster`}
            />
          </div>

          <div className="details-info">
            <div className="info-section">
              <h3>Details</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Genre:</span>
                  <span className="info-value">{movie.Genre}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Director:</span>
                  <span className="info-value">{movie.Director}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Cast:</span>
                  <span className="info-value">{movie.Actors}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Release Date:</span>
                  <span className="info-value">{movie.Released}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Box Office:</span>
                  <span className="info-value">{movie.BoxOffice || 'N/A'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Awards:</span>
                  <span className="info-value">{movie.Awards}</span>
                </div>
              </div>
            </div>

            {movie.Ratings && movie.Ratings.length > 0 && (
              <div className="info-section">
                <h3>Ratings</h3>
                <div className="ratings-list">
                  {movie.Ratings.map((rating, index) => (
                    <div key={index} className="rating-item">
                      <span className="rating-source">{rating.Source}:</span>
                      <span className="rating-value">{rating.Value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
