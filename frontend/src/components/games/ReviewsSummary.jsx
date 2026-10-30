export default function ReviewsSummary({ reviews }) {
  const { ratings, ratingsCount, metacritic, metacriticPlatforms, redditUrl } = reviews;

  return (
    <div className="reviews">
      {metacritic && (
        <p>
          <span className="metascore">{metacritic}</span> Metacritic score
        </p>
      )}

      {ratings.length > 0 && (
        <div>
          <p className="muted">{ratingsCount.toLocaleString()} player ratings on RAWG</p>
          {ratings.map(({ id, title, percent, count }) => (
            <div key={id} className="bar-row">
              <span className="bar-label">{title}</span>
              <div className="bar"><div className="bar-fill" style={{ width: `${percent}%` }} /></div>
              <span className="muted small">{percent}% ({count})</span>
            </div>
          ))}
        </div>
      )}

      {metacriticPlatforms.length > 0 && (
        <ul className="plain-list">
          {metacriticPlatforms.map(({ platform, score, url }) => (
            <li key={platform}>
              {url ? <a href={url} target="_blank" rel="noreferrer">{platform}</a> : platform}: {score}
            </li>
          ))}
        </ul>
      )}

      {redditUrl && <p><a href={redditUrl} target="_blank" rel="noreferrer">Community discussion on Reddit</a></p>}
      {!metacritic && ratings.length === 0 && <p className="muted">No review data available.</p>}
    </div>
  );
}