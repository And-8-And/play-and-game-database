const join = (values) => (values?.length ? values.join(', ') : '—');

export default function GameInfoList({ game }) {
  const rows = [
    ['Release date', game.released ?? 'TBA'],
    ['Developer', join(game.developers)],
    ['Publisher', join(game.publishers)],
    ['Genre', join(game.genres)],
    ['Platforms', join(game.platforms)],
    ['Age rating', game.ageRating ?? 'Not rated'],
  ];

  return (
    <dl className="info-list">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
      {game.website && (
        <div>
          <dt>Website</dt>
          <dd><a href={game.website} target="_blank" rel="noreferrer">{game.website}</a></dd>
        </div>
      )}
    </dl>
  );
}