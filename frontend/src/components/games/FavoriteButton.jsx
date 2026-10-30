import { useFavorites } from '../../context/FavoritesContext.jsx';
import HeartIcon from '../common/HeartIcon.jsx';

export default function FavoriteButton({ gameId, withLabel = false }) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(gameId);

  return (
    <button
      className={`fav-btn ${active ? 'active' : ''} ${withLabel ? 'with-label' : ''}`}
      onClick={() => toggle(gameId)}
      aria-pressed={active}
      aria-label={active ? 'Remove from favorites' : 'Add to favorites'}
    >
      <HeartIcon size={18} filled={active} />
      {withLabel && <span>{active ? 'In favorites' : 'Add to favorites'}</span>}
    </button>
  );
}