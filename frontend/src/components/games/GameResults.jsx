import AsyncView from '../common/AsyncView.jsx';
import Pagination from '../common/Pagination.jsx';
import GameGrid from './GameGrid.jsx';

export default function GameResults({ state, page, onPageChange }) {
  return (
    <AsyncView state={state}>
      {(data) =>
        data.results.length === 0 ? (
          <p className="status">No games found.</p>
        ) : (
          <>
            <p className="muted">{data.count.toLocaleString()} games</p>
            <GameGrid games={data.results} />
            <Pagination page={page} hasNext={data.hasNext} onChange={onPageChange} />
          </>
        )
      }
    </AsyncView>
  );
}