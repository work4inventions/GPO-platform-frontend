import React from 'react'
import { motion } from 'framer-motion'

interface CommunityContentProps {
  activeTab: string
}

export default function CommunityContent({ activeTab }: CommunityContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Community</h2>
        <p className="text-gray-600 mt-1">Connect with fellow dental professionals and share knowledge</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Recent Discussions</h4>
          <p className="text-gray-600">Join ongoing conversations in the dental community.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Expert Q&A</h4>
          <p className="text-gray-600">Get answers from experienced dental professionals.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Case Studies</h4>
          <p className="text-gray-600">Learn from real-world dental cases and procedures.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Best Practices</h4>
          <p className="text-gray-600">Share and discover industry best practices.</p>
        </div>
      </div>
    </motion.div>
  )
}
