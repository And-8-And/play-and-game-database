import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import SearchIcon from '../common/SearchIcon.jsx';

export default function SearchBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [term, setTerm] = useState(params.get('search') ?? '');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTerm(params.get('search') ?? '');
  }, [params]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = new URLSearchParams(pathname === '/' ? params : undefined);
    next.delete('page');
    if (term.trim()) next.set('search', term.trim());
    else next.delete('search');
    navigate({ pathname: '/', search: next.toString() });
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        placeholder="Search games…"
        aria-label="Search games"
      />
      <button type="submit" className="icon-btn" aria-label="Search">
        <SearchIcon />
      </button>
    </form>
  );
}