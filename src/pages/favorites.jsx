import React from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import { useFavorites } from '@/contexts/FavoritesContext'

// Icons
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337" stroke="#2980B9" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Vendor icons - Using Jira SVG
const VendorIcon = ({ type, className = "w-12 h-12" }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4971 19.8247L22.8113 1.75185L21 0L6.93403 13.6045L0.50289 19.8247C-0.16763 20.474 -0.16763 21.526 0.50289 22.1753L13.3537 34.6045L21 42L35.066 28.3955L35.2838 28.1848L41.4971 22.1753C42.1676 21.526 42.1676 20.474 41.4971 19.8247ZM21 27.2091L14.5803 21L21 14.7909L27.4197 21L21 27.2091Z" fill="#2980B9"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 14.7908C16.7968 10.7251 16.7763 4.13991 20.954 0.0498047L6.90527 13.6322L14.5516 21.0276L20.9999 14.7908Z" fill="url(#paint0_linear_599_9368)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M27.4369 20.9834L21 27.2091C23.0287 29.1701 24.1685 31.8305 24.1685 34.6046C24.1685 37.3787 23.0287 40.039 21 42L35.0832 28.3789L27.4369 20.9834Z" fill="url(#paint1_linear_599_9368)"/>
        <defs>
          <linearGradient id="paint0_linear_599_9368" x1="19.8535" y1="8.50968" x2="9.14468" y2="13.1853" gradientUnits="userSpaceOnUse">
            <stop offset="0.18" stopColor="#0052CC"/>
            <stop offset="1" stopColor="#2684FF"/>
          </linearGradient>
          <linearGradient id="paint1_linear_599_9368" x1="22.2266" y1="33.4182" x2="32.9162" y2="28.7757" gradientUnits="userSpaceOnUse">
            <stop offset="0.18" stopColor="#0052CC"/>
            <stop offset="1" stopColor="#2684FF"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

function FavoritesPage() {
  const navigate = useNavigate()
  const { favorites, removeFromFavorites } = useFavorites()

  const handleViewDetails = (vendorId) => {
    navigate(`/vendor-details/${vendorId}`)
  }

  const handleRemoveFromFavorites = (vendorId, event) => {
    event.stopPropagation()
    removeFromFavorites(vendorId)
  }

  return (
    <LayoutWrapper activeTab="favorites">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Favorites</h2>
            <p className="text-gray-600 mt-1">Your saved vendors and products</p>
          </div>
        </div>

        {/* Favorites Grid or Empty State */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((vendor) => (
              <motion.div
                key={vendor.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 relative"
              >
                {/* Top Row: Icon, Vendor Info, and Remove Button */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-3">
                    {/* Vendor Icon */}
                    <div>
                      <VendorIcon type={vendor.icon} />
                    </div>
                    
                    {/* Vendor Info */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
                      <p className="text-sm text-[var(--color-text-tertiary)] font-normal">{vendor.productType}</p>
                    </div>
                  </div>
                  
                  {/* Remove from Favorites Button */}
                  <button
                    onClick={(e) => handleRemoveFromFavorites(vendor.id, e)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                    title="Remove from favorites"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                {/* Description */}
                <div className="mb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">{vendor.description}</p>
                </div>

                {/* View Details Link */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleViewDetails(vendor.id)}
                    className="flex items-center text-sm font-semibold transition-colors duration-200 cursor-pointer"
                    style={{ color: 'var(--color-brand-primary)' }}
                  >
                    View Details
                    <div className="ml-2">
                      <ArrowRightIcon />
                    </div>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16">
            {/* Heart Icon */}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            
            {/* Main Message */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600 text-center max-w-md">
              Start exploring vendors and add them to your favorites to see them here.
            </p>
            
            {/* Browse Button */}
            <button
              onClick={() => navigate('/vendors')}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
            >
              Browse Vendors
            </button>
          </div>
        )}
      </motion.div>
    </LayoutWrapper>
  )
}

export default FavoritesPage
