import { useFavorites } from '../context/FavoritesContext.jsx';
import GameGrid from '../components/games/GameGrid.jsx';

export default function FavoritesPage() {
  const { favorites } = useFavorites();

  return (
    <>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p className="status">You have no favorite games yet. Click the heart on any game to add it.</p>
      ) : (
        <GameGrid games={favorites} />
      )}
    </>
  );
}