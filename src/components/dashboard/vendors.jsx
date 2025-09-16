import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/base/input/input'
import { Select } from '@/components/base/select/select'

// Icons
const ArrowRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
)

// Vendor icons (simplified representations)
const VendorIcon = ({ type, className = "w-12 h-12" }) => {
  const iconMap = {
    diamond: (
      <div className={`${className} bg-blue-100 rounded-lg flex items-center justify-center`}>
        <div className="w-6 h-6 bg-blue-500 rounded-sm transform rotate-45"></div>
      </div>
    ),
    hash: (
      <div className={`${className} bg-teal-100 rounded-lg flex items-center justify-center`}>
        <div className="text-teal-600 font-bold text-lg">#</div>
      </div>
    ),
    building: (
      <div className={`${className} bg-blue-100 rounded-lg flex items-center justify-center`}>
        <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
      </div>
    ),
    lines: (
      <div className={`${className} bg-blue-100 rounded-lg flex items-center justify-center`}>
        <div className="space-y-1">
          <div className="w-6 h-1 bg-blue-500 rounded"></div>
          <div className="w-6 h-1 bg-blue-500 rounded"></div>
          <div className="w-6 h-1 bg-blue-500 rounded"></div>
        </div>
      </div>
    ),
    triangle: (
      <div className={`${className} bg-yellow-100 rounded-lg flex items-center justify-center`}>
        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[16px] border-b-yellow-500"></div>
      </div>
    )
  }
  
  return iconMap[type] || iconMap.diamond
}

// Sample vendor data
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
    name: "QuicklySupply",
    productType: "Equipments",
    description: "All-in-one solution to manage your practice.",
    icon: "hash",
    hasDiscount: false
  },
  {
    id: 3,
    name: "Medisoft",
    productType: "Software",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "building",
    hasDiscount: false
  },
  {
    id: 4,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "All-in-one solution to manage your practice.",
    icon: "lines",
    hasDiscount: false
  },
  {
    id: 5,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "triangle",
    hasDiscount: false
  },
  {
    id: 6,
    name: "QuicklySupply",
    productType: "Equipments",
    description: "All-in-one solution to manage your practice.",
    icon: "diamond",
    hasDiscount: false
  },
  {
    id: 7,
    name: "Medisoft",
    productType: "Software",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "hash",
    hasDiscount: true,
    discountPercent: 10
  },
  {
    id: 8,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "All-in-one solution to manage your practice.",
    icon: "building",
    hasDiscount: false
  },
  {
    id: 9,
    name: "QuicklySupply",
    productType: "Equipments",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "lines",
    hasDiscount: false
  },
  {
    id: 10,
    name: "Medisoft",
    productType: "Software",
    description: "All-in-one solution to manage your practice.",
    icon: "triangle",
    hasDiscount: false
  },
  {
    id: 11,
    name: "Smile Dental lab",
    productType: "Implants",
    description: "Work faster and smarter by integrating directly with Notion, right in the app.",
    icon: "diamond",
    hasDiscount: false
  },
  {
    id: 12,
    name: "QuicklySupply",
    productType: "Equipments",
    description: "All-in-one solution to manage your practice.",
    icon: "hash",
    hasDiscount: false
  }
]

export default function Vendors() {
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
    console.log('View details for vendor:', vendorId)
    // Add navigation logic here
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Vendors</h2>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
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

      {/* Vendor Grid - Exactly 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginatedVendors.map((vendor) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 relative"
          >
            {/* Discount Badge */}
            {vendor.hasDiscount && (
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
                {vendor.discountPercent}% OFF
              </div>
            )}

            {/* Vendor Icon */}
            <div className="mb-4">
              <VendorIcon type={vendor.icon} />
            </div>

            {/* Vendor Info */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-900">{vendor.name}</h3>
              <p className="text-sm text-blue-600 font-medium">{vendor.productType}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{vendor.description}</p>
            </div>

            {/* View Details Link */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => handleViewDetails(vendor.id)}
                className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
              >
                View Details
                <ArrowRightIcon />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
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
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
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
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  {totalPages}
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        </div>
      )}
    </motion.div>
  )
}
