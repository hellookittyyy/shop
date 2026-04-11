import { useState, useEffect } from 'react';

const STORAGE_KEY = 'nya_shop_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      return item ? JSON.parse(item) : [];
    } catch (error) {
      console.error('Error reading favorites from localStorage', error);
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites to localStorage', error);
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  const isFavorite = (id) => {
    return favorites.includes(id);
  };

  return { favorites, toggleFavorite, isFavorite };
};
