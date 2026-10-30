export default function Pagination({ page, hasNext, onChange }) {
  const go = (target) => {
    onChange(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (page === 1 && !hasNext) return null;
  return (
    <nav className="pagination" aria-label="Pagination">
      <button className="btn" disabled={page <= 1} onClick={() => go(page - 1)}>← Previous</button>
      <span>Page {page}</span>
      <button className="btn" disabled={!hasNext} onClick={() => go(page + 1)}>Next →</button>
    </nav>
  );
}