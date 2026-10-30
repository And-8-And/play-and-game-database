import { Link } from 'react-router-dom';
import FavoriteButton from './FavoriteButton.jsx';

const MAX_PLATFORMS = 4;

export default function GameCard({ game }) {
  const extra = game.platforms.length - MAX_PLATFORMS;

  return (
    <article className="card">
      <FavoriteButton gameId={game.id} />
      <Link to={`/games/${game.id}`} className="card-link">
        {game.cover ? (
          <img src={game.cover} alt={`${game.name} cover`} loading="lazy" />
        ) : (
          <div className="no-cover">No image</div>
        )}
        <div className="card-body">
          <h3>{game.name}</h3>
          <p className="muted">
            {game.released ?? 'TBA'} · ★ {game.rating.toFixed(1)}
          </p>
          <p className="muted small">
            {game.platforms.slice(0, MAX_PLATFORMS).join(', ')}
            {extra > 0 && ` +${extra}`}
          </p>
        </div>
      </Link>
    </article>
  );
}