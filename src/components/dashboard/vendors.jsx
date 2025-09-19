import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router'
import { Input } from '@/components/base/input/input'
import { Select } from '@/components/base/select/select'

// Icons
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.1665 10.0003H15.8332M15.8332 10.0003L9.99984 4.16699M15.8332 10.0003L9.99984 15.8337" stroke="var(--color-brand-primary)" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Vendor icons - Using Jira SVG
const VendorIcon = ({ type, className = "w-12 h-12" }) => {
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

// Sample vendor data - All cards use the same dummy mapping data
const vendorsData = [
  {
    id: 1,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 2,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 3,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 4,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 5,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 6,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 7,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 8,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 9,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 10,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 11,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 12,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: true,
    discountPercent: 10
  }
]

export default function Vendors() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedProduct, setSelectedProduct] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter vendors based on search and filters
  const filteredVendors = vendorsData.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.productType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !selectedCategory || vendor.productType === selectedCategory
    const matchesProduct = !selectedProduct || vendor.productType === selectedProduct
    
    return matchesSearch && matchesCategory && matchesProduct
  })

  // Pagination
  const itemsPerPage = 12
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage)

  // Get unique categories for filter
  const categories = [...new Set(vendorsData.map(vendor => vendor.productType))]

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleViewDetails = (vendorId) => {
    navigate(`/vendor-details/${vendorId}`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header with Search and Filters */}
      <div className="flex items-center justify-between gap-4">
        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
        
        {/* Search and Filter Bar */}
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="min-w-[200px]">
            <Input
              placeholder="Search"
              value={searchTerm}
              onChange={setSearchTerm}
              size="md"
            />
          </div>

          {/* Category Filter */}
          <div className="min-w-[140px]">
            <Select
              placeholder="Category"
              selectedKey={selectedCategory}
              onSelectionChange={setSelectedCategory}
              size="md"
              items={categories.map(category => ({ id: category, label: category }))}
            >
              {(item) => (
                <Select.Item key={item.id}>
                  {item.label}
                </Select.Item>
              )}
            </Select>
          </div>

          {/* Product Filter */}
          <div className="min-w-[140px]">
            <Select
              placeholder="Product"
              selectedKey={selectedProduct}
              onSelectionChange={setSelectedProduct}
              size="md"
              items={categories.map(category => ({ id: category, label: category }))}
            >
              {(item) => (
                <Select.Item key={item.id}>
                  {item.label}
                </Select.Item>
              )}
            </Select>
          </div>
        </div>
      </div>

      {/* Vendor Grid or Empty State */}
      {paginatedVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedVendors.map((vendor) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 relative"
            >
              {/* Top Row: Icon, Vendor Info, and Discount Badge */}
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
                
                {/* Discount Badge */}
                {vendor.hasDiscount && (
                  <div className="text-xs font-semibold px-2 py-1 rounded" style={{ backgroundColor: 'var(--color-bg-error-light)', color: 'var(--color-text-error)' }}>
                    {vendor.discountPercent}% OFF
                  </div>
                )}
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
          {/* Vendor Icon */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          
          {/* Main Message */}
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No vendors found</h3>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            ← Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
            
            {totalPages > 5 && currentPage < totalPages - 2 && (
              <>
                <span className="px-2 text-gray-500">...</span>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            Next →
          </button>
        </div>
      )}
    </motion.div>
  )
}
