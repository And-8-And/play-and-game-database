export default function SystemRequirements({ requirements }) {
  if (requirements.length === 0) {
    return <p className="muted">No system requirements available (usually only PC games have them).</p>;
  }

  return (
    <div className="requirements">
      {requirements.map(({ platform, minimum, recommended }) => (
        <div key={platform} className="req-block">
          <h4>{platform}</h4>
          {minimum && <p className="pre">{minimum}</p>}
          {recommended && <p className="pre">{recommended}</p>}
        </div>
      ))}
    </div>
  );
}