import { Routes, Route } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';
import HomePage from '../pages/HomePage.jsx';
import CollectionPage from '../pages/CollectionPage.jsx';
import GameDetailsPage from '../pages/GameDetailsPage.jsx';
import FavoritesPage from '../pages/FavoritesPage.jsx';
import NotFoundPage from '../pages/NotFoundPage.jsx';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="collection/:name" element={<CollectionPage />} />
        <Route path="games/:id" element={<GameDetailsPage />} />
        <Route path="favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}