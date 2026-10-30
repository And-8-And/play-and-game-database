import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { lookupsApi } from '../../api/lookupsApi.js';
import { useAsync } from '../../hooks/useAsync.js';
import { useDebounce } from '../../hooks/useDebounce.js';
import { useLookups } from '../../hooks/useLookups.js';
import SearchIcon from '../common/SearchIcon.jsx';

const FILTER_KEYS = ['dateFrom', 'dateTo', 'platforms', 'genres', 'publishers', 'publisherName'];

export default function ExtendedSearchPanel({ onClose }) {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { genres, platforms } = useLookups();

  const [form, setForm] = useState(() =>
    Object.fromEntries(FILTER_KEYS.map((key) => [key, params.get(key) ?? ''])),
  );

  const debouncedName = useDebounce(form.publisherName);
  const publisherState = useAsync(
    () => (debouncedName.trim().length >= 2 ? lookupsApi.searchPublishers(debouncedName) : Promise.resolve([])),
    [debouncedName],
  );
  const publisherOptions = publisherState.data ?? [];

  const setField = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));

  const handlePublisherChange = (event) => {
    const name = event.target.value;
    const match = publisherOptions.find((option) => option.name.toLowerCase() === name.toLowerCase());
    setForm((current) => ({ ...current, publisherName: name, publishers: match ? String(match.id) : '' }));
  };

  const applyFilters = (values) => {
    const next = new URLSearchParams();
    const search = params.get('search');
    if (search) next.set('search', search);
    if (params.get('orderBy')) next.set('orderBy', params.get('orderBy'));
    if (params.get('direction')) next.set('direction', params.get('direction'));
    Object.entries(values).forEach(([key, value]) => value && next.set(key, value));
    navigate({ pathname: '/', search: next.toString() });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    applyFilters(form);
    onClose();
  };

  const handleReset = () => {
    setForm(Object.fromEntries(FILTER_KEYS.map((key) => [key, ''])));
    applyFilters({});
  };

  const publisherUnmatched = form.publisherName.trim() && !form.publishers;

  return (
    <form className="extended-panel" onSubmit={handleSubmit}>
      <label>
        Released from
        <input type="date" value={form.dateFrom} onChange={setField('dateFrom')} />
      </label>
      <label>
        Released to
        <input type="date" value={form.dateTo} onChange={setField('dateTo')} />
      </label>
      <label>
        Platform
        <select value={form.platforms} onChange={setField('platforms')}>
          <option value="">Any platform</option>
          {platforms.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </label>
      <label>
        Genre
        <select value={form.genres} onChange={setField('genres')}>
          <option value="">Any genre</option>
          {genres.map((g) => <option key={g.id} value={g.id}>{g.name}</option>)}
        </select>
      </label>
      <label>
        Publisher
        <span className="input-with-icon">
          <SearchIcon size={16} />
          <input
            list="publisher-options"
            value={form.publisherName}
            onChange={handlePublisherChange}
            placeholder="Search publisher…"
          />
        </span>
        <datalist id="publisher-options">
          {publisherOptions.map((p) => <option key={p.id} value={p.name} />)}
        </datalist>
        {publisherUnmatched && <small className="muted">Pick a suggestion from the list</small>}
      </label>
      <div className="panel-actions">
        <button type="submit" className="btn btn-primary">Search</button>
        <button type="button" className="btn" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}