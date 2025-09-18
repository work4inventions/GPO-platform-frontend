import React, { createContext, useContext, useState, useEffect } from 'react'

const FavoritesContext = createContext()

export const useFavorites = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([])

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('vendor-favorites')
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites))
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error)
      }
    }
  }, [])

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    localStorage.setItem('vendor-favorites', JSON.stringify(favorites))
  }, [favorites])

  const addToFavorites = (vendor) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === vendor.id)
      if (!exists) {
        return [...prev, vendor]
      }
      return prev
    })
  }

  const removeFromFavorites = (vendorId) => {
    setFavorites(prev => prev.filter(fav => fav.id !== vendorId))
  }

  const isFavorite = (vendorId) => {
    return favorites.some(fav => fav.id === vendorId)
  }

  const toggleFavorite = (vendor) => {
    if (isFavorite(vendor.id)) {
      removeFromFavorites(vendor.id)
    } else {
      addToFavorites(vendor)
    }
  }

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite
  }

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
