import { img, TMDB } from '../api/tmdb';
import { Link, useNavigate } from 'react-router-dom';

export default function Hero({ movie }) {
  const navigate = useNavigate();
  if (!movie) return null;
  const backdrop = img(movie.backdrop_path, 'w1280');

  const openDetails = async (e) => {
    e.preventDefault();
    try {
      const x = await TMDB.externalIds(movie.id); // TMDB -> IMDb
      if (x?.imdb_id) {
        navigate(`/movie/${x.imdb_id}`);          // ta page OMDb
      } else {
        // fallback: soit alerte, soit route /tmdb/:id si tu l’as créée
        alert("Pas d'identifiant IMDb pour ce film.");
        // navigate(`/tmdb/${movie.id}`);
      }
    } catch (err) {
      console.error(err);
      alert("Impossible d'ouvrir les détails.");
    }
  };

  return (
    <section className="hero">
      <div className="hero-bg" style={{ backgroundImage: `url(${backdrop})` }} />
      <div className="hero-overlay" />
      <div className="container hero-inner">
        <h1 className="hero-title">{movie.title}</h1>
        <p className="hero-desc">
          {movie.overview?.slice(0,180)}{movie.overview?.length>180?'…':''}
        </p>
        <div className="hero-actions">
          <Link to={`/tmdb/${movie.id}`} className="btn primary">▶ Regarder</Link>
          {/* 👇 bouton détails corrigé */}
          <button className="btn ghost" onClick={openDetails}>ℹ️ Détails</button>
        </div>
      </div>
    </section>
  );
}
