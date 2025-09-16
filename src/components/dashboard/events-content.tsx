import React from 'react'
import { motion } from 'framer-motion'

interface EventsContentProps {
  activeTab: string
}

export default function EventsContent({ activeTab: _ }: EventsContentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Events</h2>
        <p className="text-gray-600 mt-1">Discover and register for upcoming dental events and workshops</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Upcoming Events</h4>
          <p className="text-gray-600">View all scheduled events and workshops.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">My Registrations</h4>
          <p className="text-gray-600">Manage your event registrations and attendance.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Event Calendar</h4>
          <p className="text-gray-600">Browse events by date and category.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h4 className="text-lg font-semibold mb-4">Past Events</h4>
          <p className="text-gray-600">Access recordings and materials from past events.</p>
        </div>
      </div>
    </motion.div>
  )
}
