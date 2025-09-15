import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/base/buttons/button'

// Icons (using simple SVG icons for now)
const BarChartIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
)

const StackedBoxesIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
  </svg>
)

const PeopleIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
  </svg>
)

const CalendarIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const GlobeIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
  </svg>
)

const SettingsIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const SearchIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)

const BellIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM4.828 7l2.586 2.586a2 2 0 002.828 0L12.828 7H4.828zM4.828 17l2.586-2.586a2 2 0 012.828 0L12.828 17H4.828z" />
  </svg>
)

const CloudArrowUpIcon = () => (
  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
  </svg>
)

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

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

const ImplantIcon = ({ color }) => (
  <div className={`w-8 h-8 rounded-full flex items-center justify-center`} style={{ backgroundColor: color }}>
    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
)

// Navigation items
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChartIcon, active: true },
  { id: 'marketplace', label: 'Market Place', icon: StackedBoxesIcon, hasDropdown: true },
  { id: 'community', label: 'Community', icon: PeopleIcon },
  { id: 'events', label: 'Events', icon: CalendarIcon },
  { id: 'profile', label: 'Profile', icon: GlobeIcon },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
]

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

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [marketplaceDropdownOpen, setMarketplaceDropdownOpen] = useState(false)

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setSidebarOpen(false)
      setMarketplaceDropdownOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" onKeyDown={handleKeyDown}>
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className="hidden lg:flex lg:flex-col w-full max-w-[280px] bg-gray-100">
        <div className="mt-8 ml-6 mb-6">
          <img src="/assets/loginPage/componyLogo.png" alt="companyLogo" />
        </div>

        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.id}>
              <button
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${item.active
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                  }
                `}
                onClick={() => item.hasDropdown && setMarketplaceDropdownOpen(!marketplaceDropdownOpen)}
                aria-expanded={item.hasDropdown ? marketplaceDropdownOpen : undefined}
                aria-haspopup={item.hasDropdown ? 'menu' : undefined}
              >
                <div className="flex items-center space-x-3">
                  <item.icon />
                  <span className='text-sm font-semibold leading-[1.715]'>{item.label}</span>
                </div>
                {item.hasDropdown && (
                  <ChevronDownIcon />
                )}
              </button>

              {/* Dropdown for Market Place */}
              {item.hasDropdown && marketplaceDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-6 sm:ml-8 mt-2 space-y-1"
                  role="menu"
                >
                  <button
                    className="block w-full text-left px-3 py-2 text-base text-[#344054] hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="menuitem"
                  >
                    vendors
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2  text-base text-[#344054] hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="menuitem"
                  >
                    Categories
                  </button>


                  <button
                    className="flex justify-between w-full text-left px-3 py-2  text-base text-[#344054] hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="menuitem"
                  >
                    Favourite
                    <p className='text-[12px] py-[2px] px-2 text-[#344054] bg-[#F2F4F7] rounded-[16px]'>0</p>
                  </button>




                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Mobile Sidebar */}
      <motion.div
        initial={false}
        animate={{ x: sidebarOpen ? 0 : '-100%' }}
        className={`
          fixed lg:hidden inset-y-0 left-0 z-50 w-64 bg-gray-100 transform transition-transform duration-300 ease-in-out
        `}
      >
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 border-b border-gray-200">
          <h1 className="text-lg sm:text-xl font-semibold text-gray-900">4M INSTITUTE</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Close sidebar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 px-3 sm:px-4 py-4 sm:py-6 space-y-2">
          {navigationItems.map((item) => (
            <div key={item.id}>
              <button
                className={`
                  w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${item.active
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                  }
                `}
                onClick={() => item.hasDropdown && setMarketplaceDropdownOpen(!marketplaceDropdownOpen)}
                aria-expanded={item.hasDropdown ? marketplaceDropdownOpen : undefined}
                aria-haspopup={item.hasDropdown ? 'menu' : undefined}
              >
                <div className="flex items-center space-x-3">
                  <item.icon />
                  <span>{item.label}</span>
                </div>
                {item.hasDropdown && (
                  <ChevronDownIcon />
                )}
              </button>

              {/* Dropdown for Market Place */}
              {item.hasDropdown && marketplaceDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="ml-6 sm:ml-8 mt-2 space-y-1"
                  role="menu"
                >
                  <button
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="menuitem"
                  >
                    All Products
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 text-sm text-gray-600 hover:bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    role="menuitem"
                  >
                    Categories
                  </button>
                </motion.div>
              )}
            </div>
          ))}
        </nav>
      </motion.div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="bg-white px-8 max-sm:px-6 py-[13px] my-[5px]">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Open sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>

              <div className="block">
                <h2 className="text-lg font-semibold text-[#101828] leading-[1.223]">Welcome back, Dr. Olivia</h2>
                <p className="text-sm text-gray-600 max-sm:hidden leading-[1.7145]">Your subscription: Education Plan - renews Sept 28, 2025</p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-4">
              <img className='cursor-pointer mr-1 p-2.5' src="/assets/dashboard/searchIcon.svg" alt="searchIcon" />
              <img className='cursor-pointer mr-1 p-2.5 h-10 w-10' src="/assets/dashboard/notificationIcon.svg" alt="notificationIcon" />
              <div className=" rounded-[50%] bg-gray-300  flex items-center justify-center">
                <img className='w-10 h-10 object-cover object-center rounded-[50%]' src="/assets/dashboard/adminImg.jpg" alt="admin" />
              </div>
            </div>
          </div>
        </header>


      </div>
    </div>
  )
}

export default Dashboard
