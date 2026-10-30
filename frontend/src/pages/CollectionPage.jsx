import { useParams, useSearchParams } from 'react-router-dom';
import { gamesApi } from '../api/gamesApi.js';
import { COLLECTION_TITLES, CURRENT_YEAR_VALUE, FIRST_YEAR, PAGE_SIZE } from '../constants/menu.js';
import { useAsync } from '../hooks/useAsync.js';
import GameResults from '../components/games/GameResults.jsx';
import NotFoundPage from './NotFoundPage.jsx';

const OTHER_YEARS_NAME = 'best-of-other-years';
const BACKEND_NAMES = { [OTHER_YEARS_NAME]: 'best-of-year' };
const OTHER_YEARS = Array.from(
  { length: CURRENT_YEAR_VALUE - FIRST_YEAR },
  (_, i) => CURRENT_YEAR_VALUE - 1 - i,
);

export default function CollectionPage() {
  const { name } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const isOtherYears = name === OTHER_YEARS_NAME;
  const year = searchParams.get('year') ?? String(CURRENT_YEAR_VALUE - 1);

  const state = useAsync(() => {
    const params = { ...Object.fromEntries(searchParams), pageSize: PAGE_SIZE };
    if (isOtherYears) params.year = year;
    else delete params.year;
    return gamesApi.getCollection(BACKEND_NAMES[name] ?? name, params);
  }, [name, searchParams.toString()]);

  const updateParams = (changes) =>
    setSearchParams((previous) => {
      const next = new URLSearchParams(previous);
      Object.entries(changes).forEach(([key, value]) => (value ? next.set(key, value) : next.delete(key)));
      return next;
    });

  const title = COLLECTION_TITLES[name];
  if (!title) return <NotFoundPage />;

  const shownYear = isOtherYears ? year : name === 'best-of-year' ? CURRENT_YEAR_VALUE : null;

  return (
    <>
      <div className="page-head">
        <h1>{shownYear ? `${title} ${shownYear}` : title}</h1>
        {isOtherYears && (
          <div className="order-by">
            <span className="order-by-label">Year</span>
            <select
              aria-label="Year"
              value={year}
              onChange={(e) => updateParams({ year: e.target.value, page: '' })}
            >
              {OTHER_YEARS.map((y) => <option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        )}
      </div>
      <GameResults state={state} page={page} onPageChange={(p) => updateParams({ page: p > 1 ? p : '' })} />
    </>
  );
}