import { useRef } from 'react';
import MovieCard from './MovieTile';

export default function Row({ title, items = [] }) {
  const scroller = useRef(null);
  const scrollBy = (dir) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.round(el.clientWidth * 0.9);
    el.scrollBy({ left: dir * amount, behavior: 'smooth' });
  };

  return (
    <section className="row-block">
      <div className="row-head">
        <h2 className="row-title">{title}</h2>
        <div className="row-nav">
          <button className="nav-btn" onClick={() => scrollBy(-1)} aria-label="Précédent">‹</button>
          <button className="nav-btn" onClick={() => scrollBy(1)} aria-label="Suivant">›</button>
        </div>
      </div>
      <div className="row-scroller" ref={scroller}>
        {items.map((m) => <MovieCard key={m.id} m={m} />)}
      </div>
    </section>
  );
}
