import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { favoritesApi } from '../api/favoritesApi.js';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    favoritesApi.list().then(setFavorites).catch(setError);
  }, []);

  const isFavorite = useCallback((id) => favorites.some((game) => game.id === id), [favorites]);

  const toggle = useCallback(
    async (id) => {
      try {
        if (isFavorite(id)) {
          await favoritesApi.remove(id);
          setFavorites((current) => current.filter((game) => game.id !== id));
        } else {
          const added = await favoritesApi.add(id);
          setFavorites((current) => [added, ...current]);
        }
      } catch (err) {
        setError(err);
      }
    },
    [isFavorite],
  );

  const value = useMemo(
    () => ({ favorites, isFavorite, toggle, error }),
    [favorites, isFavorite, toggle, error],
  );
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error('useFavorites must be used inside FavoritesProvider');
  return context;
};