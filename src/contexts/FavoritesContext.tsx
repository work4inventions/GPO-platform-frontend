import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface Vendor {
  id: number
  name: string
  productType: string
  description: string
  icon?: string
  hasDiscount?: boolean
  discountPercent?: number
}

interface FavoritesContextType {
  favorites: Vendor[]
  addToFavorites: (vendor: Vendor) => void
  removeFromFavorites: (vendorId: number) => void
  isFavorite: (vendorId: number) => boolean
  toggleFavorite: (vendor: Vendor) => void
}

interface FavoritesProviderProps {
  children: ReactNode
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<Vendor[]>([])

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

  const addToFavorites = (vendor: Vendor) => {
    setFavorites(prev => {
      const exists = prev.find(fav => fav.id === vendor.id)
      if (!exists) {
        return [...prev, vendor]
      }
      return prev
    })
  }

  const removeFromFavorites = (vendorId: number) => {
    setFavorites(prev => prev.filter(fav => fav.id !== vendorId))
  }

  const isFavorite = (vendorId: number) => {
    return favorites.some(fav => fav.id === vendorId)
  }

  const toggleFavorite = (vendor: Vendor) => {
    if (isFavorite(vendor.id)) {
      removeFromFavorites(vendor.id)
    } else {
      addToFavorites(vendor)
    }
  }

  const value: FavoritesContextType = {
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
