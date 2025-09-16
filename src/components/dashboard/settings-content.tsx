import React from 'react'
import { motion } from 'framer-motion'

interface SettingsContentProps {
  activeTab: string
}

export default function SettingsContent({ activeTab }: SettingsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600 mt-1">Configure your application preferences and system settings</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">General Settings</h4>
          <p className="text-gray-600">Configure general application preferences and display options.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Notifications</h4>
          <p className="text-gray-600">Manage your notification preferences and alerts.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Privacy & Security</h4>
          <p className="text-gray-600">Control your privacy settings and security options.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Data & Storage</h4>
          <p className="text-gray-600">Manage your data storage and backup preferences.</p>
        </div>
      </div>
    </motion.div>
  )
}
