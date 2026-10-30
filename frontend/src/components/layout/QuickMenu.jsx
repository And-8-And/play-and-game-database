import { Link, useLocation } from 'react-router-dom';
import { MENU_SECTIONS } from '../../constants/menu.js';
import HomeIcon from '../common/HomeIcon.jsx';
import HeartIcon from '../common/HeartIcon.jsx';

const withoutPage = (search) => {
  const params = new URLSearchParams(search);
  params.delete('page');
  const text = params.toString();
  return text ? `?${text}` : '';
};

export default function QuickMenu() {
  const { pathname, search } = useLocation();
  const current = pathname + withoutPage(search);

  const renderLink = ({ label, to }) => (
    <li key={to}>
      <Link to={to} className={current === to ? 'menu-link active' : 'menu-link'}>{label}</Link>
    </li>
  );

  return (
    <nav className="quick-menu" aria-label="Quick menu">
      <ul>
        {renderLink({ label: <><HomeIcon /> Home</>, to: '/' })}
        {renderLink({ label: <><HeartIcon /> Favorites</>, to: '/favorites' })}
      </ul>
      {MENU_SECTIONS.map((section) => (
        <section key={section.title}>
          <h3>{section.title}</h3>
          <ul>{section.items.map(renderLink)}</ul>
        </section>
      ))}
    </nav>
  );
}