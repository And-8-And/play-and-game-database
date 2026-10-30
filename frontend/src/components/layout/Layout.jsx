import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import QuickMenu from './QuickMenu.jsx';
import Footer from './Footer.jsx';
import ExtendedSearchPanel from '../search/ExtendedSearchPanel.jsx';

export default function Layout() {
  const [extendedOpen, setExtendedOpen] = useState(false);

  return (
    <div className="app">
      <Header extendedOpen={extendedOpen} onToggleExtended={() => setExtendedOpen((open) => !open)} />
      {extendedOpen && <ExtendedSearchPanel onClose={() => setExtendedOpen(false)} />}
      <div className="content-wrap">
        <QuickMenu />
        <main className="main">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
}