import { createContext, useContext, useMemo } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'

const FavoritesContext = createContext()

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', [])

  const value = useMemo(() => ({
    favorites,
    isFav: (imdbID) => favorites.some(f => f.imdbID === imdbID),
    addFav: (movie) => setFavorites(prev => (
      prev.some(f => f.imdbID === movie.imdbID) ? prev : [...prev, movie]
    )),
    removeFav: (imdbID) => setFavorites(prev => prev.filter(f => f.imdbID !== imdbID)),
    clearFavs: () => setFavorites([])
  }), [favorites, setFavorites])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

export function useFavorites() { return useContext(FavoritesContext) }