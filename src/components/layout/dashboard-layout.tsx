import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Icons
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

const ChevronDownIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
)

// Navigation items configuration
const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChartIcon, hasDropdown: false },
  { 
    id: 'marketplace', 
    label: 'Market Place', 
    icon: StackedBoxesIcon, 
    hasDropdown: true,
    dropdownItems: [
      { id: 'vendors', label: 'Vendors' },
      { id: 'categories', label: 'Categories' },
      { id: 'favorites', label: 'Favorites', badge: '0' }
    ]
  },
  { id: 'community', label: 'Community', icon: PeopleIcon, hasDropdown: false },
  { id: 'events', label: 'Events', icon: CalendarIcon, hasDropdown: false },
  { id: 'profile', label: 'Profile', icon: GlobeIcon, hasDropdown: false },
  { id: 'settings', label: 'Settings', icon: SettingsIcon, hasDropdown: false },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  activeTab?: string
  onTabChange?: (tabId: string) => void
  userName?: string
  subscriptionInfo?: string
}

export default function DashboardLayout({ 
  children, 
  activeTab = 'dashboard', 
  onTabChange,
  userName = 'Dr. Olivia',
  subscriptionInfo = 'Your subscription: Education Plan - renews Sept 28, 2025'
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [marketplaceDropdownOpen, setMarketplaceDropdownOpen] = useState(false)

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setSidebarOpen(false)
      setMarketplaceDropdownOpen(false)
    }
  }

  // Handle tab click
  const handleTabClick = (tabId: string) => {
    if (onTabChange) {
      onTabChange(tabId)
    }
  }

  // Handle dropdown item click
  const handleDropdownItemClick = (itemId: string) => {
    if (onTabChange) {
      onTabChange(itemId)
    }
    setMarketplaceDropdownOpen(false)
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

      {/* Desktop Sidebar */}
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
                  ${activeTab === item.id || (item.hasDropdown && activeTab.startsWith(item.id))
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                  }
                `}
                onClick={() => {
                  if (item.hasDropdown) {
                    setMarketplaceDropdownOpen(!marketplaceDropdownOpen)
                  } else {
                    handleTabClick(item.id)
                  }
                }}
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
                  {item.dropdownItems?.map((dropdownItem) => (
                    <button
                      key={dropdownItem.id}
                      className={`
                        flex justify-between w-full text-left px-3 py-2 text-base rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${activeTab === dropdownItem.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-[#344054] hover:bg-gray-200'
                        }
                      `}
                      onClick={() => handleDropdownItemClick(dropdownItem.id)}
                      role="menuitem"
                    >
                      {dropdownItem.label}
                      {dropdownItem.badge && (
                        <span className='text-[12px] py-[2px] px-2 text-[#344054] bg-[#F2F4F7] rounded-[16px]'>
                          {dropdownItem.badge}
                        </span>
                      )}
                    </button>
                  ))}
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
        className="fixed lg:hidden inset-y-0 left-0 z-50 w-64 bg-gray-100 transform transition-transform duration-300 ease-in-out"
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
                  ${activeTab === item.id || (item.hasDropdown && activeTab.startsWith(item.id))
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-200'
                  }
                `}
                onClick={() => {
                  if (item.hasDropdown) {
                    setMarketplaceDropdownOpen(!marketplaceDropdownOpen)
                  } else {
                    handleTabClick(item.id)
                    setSidebarOpen(false)
                  }
                }}
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
                  {item.dropdownItems?.map((dropdownItem) => (
                    <button
                      key={dropdownItem.id}
                      className={`
                        flex justify-between w-full text-left px-3 py-2 text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
                        ${activeTab === dropdownItem.id
                          ? 'bg-blue-50 text-blue-700'
                          : 'text-gray-600 hover:bg-gray-200'
                        }
                      `}
                      onClick={() => {
                        handleDropdownItemClick(dropdownItem.id)
                        setSidebarOpen(false)
                      }}
                      role="menuitem"
                    >
                      {dropdownItem.label}
                      {dropdownItem.badge && (
                        <span className='text-[12px] py-[2px] px-2 text-[#344054] bg-[#F2F4F7] rounded-[16px]'>
                          {dropdownItem.badge}
                        </span>
                      )}
                    </button>
                  ))}
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
                <h2 className="text-lg font-semibold text-[#101828] leading-[1.223]">Welcome back, {userName}</h2>
                <p className="text-sm text-gray-600 max-sm:hidden leading-[1.7145]">{subscriptionInfo}</p>
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

        {/* Content Area */}
        <main className="flex-1 pt-5 pb-12 px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
