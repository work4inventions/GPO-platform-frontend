import React from 'react'
import { motion } from 'framer-motion'

interface ProfileContentProps {
  activeTab: string
}

export default function ProfileContent({ activeTab }: ProfileContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
        <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Personal Information</h4>
          <p className="text-gray-600">Update your personal details and contact information.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Professional Details</h4>
          <p className="text-gray-600">Manage your professional credentials and specializations.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Account Settings</h4>
          <p className="text-gray-600">Configure your account preferences and security settings.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Subscription</h4>
          <p className="text-gray-600">View and manage your subscription details and billing.</p>
        </div>
      </div>
    </motion.div>
  )
}
