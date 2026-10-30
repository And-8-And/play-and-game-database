import { Link } from 'react-router-dom';
import SearchBar from '../search/SearchBar.jsx';
import ThemeToggle from '../common/ThemeToggle.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import HomeIcon from '../common/HomeIcon.jsx';
import HeartIcon from '../common/HeartIcon.jsx';

export default function Header({ extendedOpen, onToggleExtended }) {
  const { favorites } = useFavorites();

  return (
    <header className="header">
      <Link to="/" className="btn btn-primary"><HomeIcon /> Home</Link>
      <SearchBar />
      <button className="btn" onClick={onToggleExtended} aria-expanded={extendedOpen}>
        Extended search
      </button>
      <Link to="/favorites" className="btn"><HeartIcon /> Favorites ({favorites.length})</Link>
      <ThemeToggle />
    </header>
  );
}