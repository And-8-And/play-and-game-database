export default function AsyncView({ state, children }) {
  if (state.error) return <p className="error" role="alert">{state.error.message}</p>;
  if (!state.data) return <p className="status">Loading…</p>;
  return children(state.data);
}