import React from 'react'
import { motion } from 'framer-motion'
// @ts-ignore
import Vendors from './vendors'

interface MarketplaceContentProps {
  activeTab: string
}

export default function MarketplaceContent({ activeTab }: MarketplaceContentProps) {
  const getContent = () => {
    switch (activeTab) {
      case 'vendors':
        return {
          title: 'Vendors',
          description: 'Browse and manage your vendor relationships',
          content: <Vendors />
        }
      case 'categories':
        return {
          title: 'Categories',
          description: 'Explore products by category',
          content: (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Product Categories</h4>
                <p className="text-gray-600">Browse products organized by categories for easy navigation.</p>
              </div>
            </div>
          )
        }
      case 'favorites':
        return {
          title: 'Favorites',
          description: 'Your saved products and vendors',
          content: (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Your Favorites</h4>
                <p className="text-gray-600">View and manage your favorite products and vendors.</p>
              </div>
            </div>
          )
        }
      default:
        return {
          title: 'Marketplace',
          description: 'Discover and purchase dental products',
          content: (
            <div className="space-y-4">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold mb-4">Welcome to Marketplace</h4>
                <p className="text-gray-600">Explore our comprehensive marketplace for dental products and services.</p>
              </div>
            </div>
          )
        }
    }
  }

  const { title, description, content } = getContent()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-gray-600 mt-1">{description}</p>
      </div>
      {content}
    </motion.div>
  )
}
