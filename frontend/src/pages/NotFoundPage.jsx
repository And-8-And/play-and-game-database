import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="status">
      <h1>Page not found</h1>
      <Link to="/" className="btn btn-primary">Back to home</Link>
    </div>
  );
}