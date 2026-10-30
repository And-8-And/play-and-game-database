import { useSearchParams } from 'react-router-dom';
import { gamesApi } from '../api/gamesApi.js';
import { PAGE_SIZE } from '../constants/menu.js';
import { useAsync } from '../hooks/useAsync.js';
import OrderBySelect from '../components/search/OrderBySelect.jsx';
import GameResults from '../components/games/GameResults.jsx';

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = Object.fromEntries(searchParams);
  const page = Number(query.page) || 1;

  // keresés nélkül alapból népszerűség szerint listázunk
  const request = {
    ...query,
    pageSize: PAGE_SIZE,
    orderBy: query.orderBy ?? (query.search ? undefined : 'popularity'),
  };
  const state = useAsync(() => gamesApi.search(request), [searchParams.toString()]);

  const updateParams = (changes) =>
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
      return next;
    });

  return (
    <>
      <div className="page-head">
        <h1>{query.search ? `Results for “${query.search}”` : 'All games'}</h1>
        <OrderBySelect
          orderBy={query.orderBy ?? ''}
          direction={query.direction ?? ''}
          onChange={({ orderBy, direction }) => updateParams({ orderBy, direction, page: '' })}
        />
      </div>
      <GameResults state={state} page={page} onPageChange={(p) => updateParams({ page: p > 1 ? p : '' })} />
    </>
  );
}