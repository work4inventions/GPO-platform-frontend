import React from 'react'
import { motion } from 'framer-motion'
import { Button } from 'react-aria-components'

// Icons
const MoreVerticalIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
)

const ChatBubbleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
)

const ImplantIcon = ({ color }: { color: string }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: color }}>
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
)

// Summary cards data
const summaryCards = [
  { id: 1, title: 'Vendors Followed', value: '12', icon: MoreVerticalIcon },
  { id: 2, title: 'Upcoming Events', value: '2', icon: MoreVerticalIcon },
  { id: 3, title: 'Community Posts Joined', value: '5', icon: MoreVerticalIcon },
  { id: 4, title: 'Subscription Status', value: 'Basic Plan', icon: MoreVerticalIcon },
]

// Events data
const events = [
  { id: 1, title: 'Implant Training Workshop', date: 'Sep 14, 2025 - 10 AM EST', color: '#8B5CF6' },
  { id: 2, title: 'Implant Training Workshop', date: 'Sep 14, 2025 - 10 AM EST', color: '#10B981' },
  { id: 3, title: 'Implant Training Workshop', date: 'Sep 14, 2025 - 10 AM EST', color: '#F59E0B' },
  { id: 4, title: 'Implant Training Workshop', date: 'Sep 14, 2025 - 10 AM EST', color: '#3B82F6' },
]

// Discussions data
const discussions = [
  { id: 1, title: 'Tips for All-on-4 Procedures', replies: '12 Replies', icon: ChatBubbleIcon },
  { id: 2, title: 'Tips for All-on-4 Procedures', date: 'Sep 14, 2025 - 10 AM EST', icon: ChatBubbleIcon },
  { id: 3, title: 'Tips for All-on-4 Procedures', date: 'Sep 14, 2025 - 10 AM EST', icon: ChatBubbleIcon },
  { id: 4, title: 'Tips for All-on-4 Procedures', date: 'Sep 14, 2025 - 10 AM EST', icon: ChatBubbleIcon },
]

interface DashboardContentProps {
  activeTab: string
}

export default function DashboardContent({ activeTab: _ }: DashboardContentProps) {
  return (
    <div className="">
      {/* <div className='flex items-center justify-between'>
        <h1 className='text-2xl font-semibold leading-[1.5835]'>Dashboard</h1>
        <div>
          <img src="" alt="" />
          <p>Export</p>
        </div>

      </div> */}
       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Dashboard</h1>
            <Button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded- hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <img src="/assets/dashboard/exportIcon.svg" alt="exportIcon" />
              <span>Export</span>
            </Button>
          </div>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {summaryCards.map((card) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: card.id * 0.1 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
              <card.icon />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Events Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {events.map((event) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <ImplantIcon color={event.color} />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discussions Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Recent Discussions</h3>
            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {discussions.map((discussion) => (
              <div key={discussion.id} className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <discussion.icon />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{discussion.title}</p>
                  <p className="text-sm text-gray-600">{discussion.replies}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
