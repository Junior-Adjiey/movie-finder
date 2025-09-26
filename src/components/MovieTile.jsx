import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { img, TMDB } from '../api/tmdb';
import { useFavorites } from '../context/FavoritesContext';

export default function MovieTile({ m }) {
  const navigate = useNavigate();
  const { isFav, addFav, removeFav } = useFavorites();

  const [imdbId, setImdbId] = useState(null);
  const [resolving, setResolving] = useState(false);

  // Prépare l'URL d’image poster TMDB
  const poster = img(m.poster_path, 'w342');

  // Pré-résoudre l’imdbID au premier hover/clic pour fluidifier
  const resolveImdb = async () => {
    if (imdbId || resolving) return imdbId;
    try {
      setResolving(true);
      const x = await TMDB.externalIds(m.id);
      if (x?.imdb_id) setImdbId(x.imdb_id);
      return x?.imdb_id || null;
    } finally {
      setResolving(false);
    }
  };

  const openDetails = async (e) => {
    e.preventDefault();
    const id = await resolveImdb();
    if (id) navigate(`/movie/${id}`);         // ta page Details (OMDb)
    else alert("Ce film n’a pas d’identifiant IMDb disponible.");
  };

  const toggleFav = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const id = imdbId || (await resolveImdb());
    if (!id) {
      alert("Impossible d’ajouter en favori : pas d’IMDb ID.");
      return;
    }
    const fav = isFav(id);
    if (fav) {
      removeFav(id);
    } else {
      // on ajoute au format proche OMDb pour rester compatible partout
      addFav({
        imdbID: id,
        Title: m.title,
        Year: (m.release_date || '').slice(0, 4),
        Type: 'movie',
        Poster: poster,
        // facultatif : stocker la source
        _source: 'tmdb',
        _tmdbId: m.id,
      });
    }
  };

  const fav = imdbId ? isFav(imdbId) : false;

  return (
    <a className="tile" href="#" onClick={openDetails} onMouseEnter={resolveImdb} title={m.title}>
      <img className="tile-img" src={poster} alt={m.title} loading="lazy" />
      <button
        className={`fav-btn${fav ? ' active' : ''}`}
        onClick={toggleFav}
        aria-pressed={fav}
        aria-label={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
        title={fav ? 'Retirer des favoris' : 'Ajouter aux favoris'}
      >
        {fav ? '★' : '☆'}
      </button>
      <div className="tile-grad" />
      <div className="tile-meta">
        <span className="tile-title">{m.title}</span>
        <span className="tile-badge">★ {m.vote_average?.toFixed(1)}</span>
      </div>
    </a>
  );
}
