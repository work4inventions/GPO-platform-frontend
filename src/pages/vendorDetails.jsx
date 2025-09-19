import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, useParams } from 'react-router'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import { useFavorites } from '@/contexts/FavoritesContext'

// Icons
const HeartIcon = ({ filled = false, className = "w-6 h-6" }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
)

const StarIconOutline = ({ filled = false, className = "w-6 h-6" }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const StarIcon = ({ filled = false, className = "w-5 h-5" }) => (
  <svg className={className} fill={filled ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
  </svg>
)

const ArrowLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
)

const ShareIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
  </svg>
)

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

// Jira Icon Component
const JiraIcon = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M41.4971 19.8247L22.8113 1.75185L21 0L6.93403 13.6045L0.50289 19.8247C-0.16763 20.474 -0.16763 21.526 0.50289 22.1753L13.3537 34.6045L21 42L35.066 28.3955L35.2838 28.1848L41.4971 22.1753C42.1676 21.526 42.1676 20.474 41.4971 19.8247ZM21 27.2091L14.5803 21L21 14.7909L27.4197 21L21 27.2091Z" fill="var(--color-brand-primary)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M20.9999 14.7908C16.7968 10.7251 16.7763 4.13991 20.954 0.0498047L6.90527 13.6322L14.5516 21.0276L20.9999 14.7908Z" fill="url(#paint0_linear_599_9368)"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M27.4369 20.9834L21 27.2091C23.0287 29.1701 24.1685 31.8305 24.1685 34.6046C24.1685 37.3787 23.0287 40.039 21 42L35.0832 28.3789L27.4369 20.9834Z" fill="url(#paint1_linear_599_9368)"/>
        <defs>
          <linearGradient id="paint0_linear_599_9368" x1="19.8535" y1="8.50968" x2="9.14468" y2="13.1853" gradientUnits="userSpaceOnUse">
            <stop offset="0.18" stopColor="var(--color-gradient-start)"/>
            <stop offset="1" stopColor="var(--color-gradient-end)"/>
          </linearGradient>
          <linearGradient id="paint1_linear_599_9368" x1="22.2266" y1="33.4182" x2="32.9162" y2="28.7757" gradientUnits="userSpaceOnUse">
            <stop offset="0.18" stopColor="var(--color-gradient-start)"/>
            <stop offset="1" stopColor="var(--color-gradient-end)"/>
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Sample vendor data - In a real app, this would come from an API
const getVendorData = (id) => {
  const vendors = {
    1: {
      id: 1,
      name: "Smile Dental Lab",
      productType: "Dental Implants",
      description: "Leading provider of high-quality dental implants and prosthetics. We specialize in creating custom solutions for dental professionals worldwide.",
      longDescription: "Smile Dental Lab has been serving the dental community for over 20 years, providing premium dental implants, crowns, bridges, and other prosthetics. Our state-of-the-art facility uses the latest technology to ensure precision and quality in every product we create. We work closely with dental professionals to develop custom solutions that meet their specific needs and patient requirements.",
      rating: 4.8,
      reviewCount: 1247,
      location: "New York, NY",
      phone: "+1 (555) 123-4567",
      email: "contact@smiledentallab.com",
      website: "www.smiledentallab.com",
      established: "2003",
      employees: "50-100",
      specialties: ["Dental Implants", "Crowns & Bridges", "Dentures", "Orthodontics"],
      certifications: ["ISO 13485", "FDA Approved", "CE Marked"],
      hasDiscount: true,
      discountPercent: 15,
      isFavorited: false
    }
  }
  return vendors[id] || vendors[1] // Default to first vendor if ID not found
}

function VendorDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isFavorite, toggleFavorite } = useFavorites()
  
  const vendor = getVendorData(id)
  const isFavorited = isFavorite(vendor.id)

  const handleAddToFavorites = () => {
    toggleFavorite(vendor)
  }

  const handleBackToVendors = () => {
    navigate('/vendors')
  }

  const handleViewFavorites = () => {
    navigate('/favorites')
  }

  return (
    <LayoutWrapper activeTab="vendors">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        {/* Header with Back Button and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleBackToVendors}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              <ArrowLeftIcon />
              <span className="text-sm font-medium">Back to Vendors</span>
            </button>
          </div>
          
        </div>

        {/* Vendor Header Card */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 lg:p-8">
          <div className="flex items-start justify-between">
            {/* Left Section - Icon, Title, and Description */}
            <div className="flex items-start space-x-4 flex-1">
              {/* Vendor Icon */}
              <div className="flex-shrink-0">
                <JiraIcon className="w-16 h-16 lg:w-20 lg:h-20" />
              </div>
              
              {/* Vendor Details */}
              <div className="flex-1 min-w-0">
                {/* Title and Favorites in same row */}
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{vendor.name}</h1>
                  <button
                    onClick={handleAddToFavorites}
                    className={`flex items-center space-x-2 px-3 py-1 rounded-lg border transition-colors cursor-pointer ${
                      isFavorited
                        ? 'bg-red-50 border-red-200 text-red-700'
                        : 'bg-blue-50 border-blue-200 text-blue-700 hover:bg-blue-100'
                    }`}
                  >
                    <StarIconOutline filled={isFavorited} className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      {isFavorited ? 'Added to Favourites' : 'Add to Favourites'}
                    </span>
                  </button>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 leading-relaxed text-sm lg:text-base">{vendor.description}</p>
              </div>
            </div>
            
            {/* Right Section - Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 ml-6">
              <button className="flex items-center space-x-2 px-4 py-2 border border-blue-300 text-blue-700 bg-white rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                <span className="text-sm font-medium">Book Now</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm font-medium">PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About {vendor.name}</h2>
              <p className="text-gray-700 leading-relaxed">{vendor.longDescription}</p>
            </div>

          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Product/Services Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-brand-primary)' }}>Product/Services</h2>
              <div className="space-y-4">
                {vendor.specialties.slice(0, 3).map((product, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.3332 24.5C23.3332 22.8718 23.3332 22.0578 23.1322 21.3953C22.6798 19.9039 21.5126 18.7367 20.0212 18.2843C19.3587 18.0833 18.5447 18.0833 16.9165 18.0833H11.0832C9.45502 18.0833 8.64093 18.0833 7.97851 18.2843C6.48704 18.7367 5.31988 19.9039 4.86745 21.3953C4.6665 22.0578 4.6665 22.8718 4.6665 24.5M19.2498 8.75C19.2498 11.6495 16.8993 14 13.9998 14C11.1003 14 8.74984 11.6495 8.74984 8.75C8.74984 5.85051 11.1003 3.5 13.9998 3.5C16.8993 3.5 19.2498 5.85051 19.2498 8.75Z" stroke="#475467" strokeWidth="2.33333" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{product}</p>
                      <p className="text-xs text-gray-500">Available now</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Vendor Section */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-brand-primary)' }}>Contact Vendor</h2>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 px-4 py-3 text-white rounded-lg transition-colors cursor-pointer" style={{ backgroundColor: 'var(--color-brand-primary)' }} onMouseEnter={(e) => e.target.style.backgroundColor = 'var(--color-brand-primary-hover-variant)'} onMouseLeave={(e) => e.target.style.backgroundColor = 'var(--color-brand-primary)'}>
                  <EmailIcon />
                  <span className="text-sm font-medium">Send Email</span>
                </button>
                
                <button className="w-full flex items-center space-x-3 px-4 py-3 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <PhoneIcon />
                  <span className="text-sm font-medium">Phone call</span>
                </button>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="flex items-center space-x-3">
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
                
                <button className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer">
                  <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </LayoutWrapper>
  )
}

export default VendorDetailsPage
