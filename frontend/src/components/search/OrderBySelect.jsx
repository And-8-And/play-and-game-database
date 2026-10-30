import { DIRECTION_OPTIONS, ORDER_OPTIONS } from '../../constants/ordering.js';

export default function OrderBySelect({ orderBy, direction, onChange }) {
  return (
    <div className="order-by">
      <span className="order-by-label">Order by</span>
      <select
        aria-label="Order by"
        value={orderBy}
        onChange={(e) => onChange({ orderBy: e.target.value, direction: '' })}
      >
        {ORDER_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
      <select
        aria-label="Direction"
        value={direction}
        disabled={!orderBy}
        onChange={(e) => onChange({ orderBy, direction: e.target.value })}
      >
        {DIRECTION_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}