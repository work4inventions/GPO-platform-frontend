import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router'
import { PaginationPageDefault } from '@/components/application/pagination/pagination'

interface DashboardContentProps {
  activeTab: string
}

// Icons
const SearchIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
)


const EyeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
)

const TrashIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
)

const SearchNotFoundIcon = () => (
  <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.571" />
  </svg>
)


// Sample data
const summaryCards = [
  { title: "Vendors Followed", value: "12"},
  { title: "Upcoming Events", value: "2"},
  { title: "Community Posts Joined", value: "5"},
  { title: "Subscription Status", value: "Basic Plan"}
]

const upcomingEvents = [
  { id: 1, title: "Implant Training Workshop", date: "Sep 14, 2025 - 10 AM EST"},
  { id: 2, title: "Implant Training Workshop", date: "Sep 14, 2025 - 10 AM EST"},
  { id: 3, title: "Implant Training Workshop", date: "Sep 14, 2025 - 10 AM EST"},
  { id: 4, title: "Implant Training Workshop", date: "Sep 14, 2025 - 10 AM EST"}
]

const latestDiscussions = [
  { id: 1, title: "Tips for All-on-4 Procedures", replies: "12 Replies", icon: "💬" },
  { id: 2, title: "Tips for All-on-4 Procedures", date: "Sep 14, 2025 - 10 AM EST", icon: "💬" },
  { id: 3, title: "Tips for All-on-4 Procedures", date: "Sep 14, 2025 - 10 AM EST", icon: "💬" },
  { id: 4, title: "Tips for All-on-4 Procedures", date: "Sep 14, 2025 - 10 AM EST", icon: "💬" }
]

const favoriteVendors = [
  {
    id: 1,
    name: "Catalog",
    category: "Implant",
    contact: "+1 234567890",
    email: "olivia@untitledui.com",
    offer: "15% off until Sept 30",
    icon: "🔵"
  },
  {
    id: 2,
    name: "Capsule",
    category: "Implant",
    contact: "+1 234567890",
    email: "olivia@untitledui.com",
    offer: "15% off until Sept 30",
    icon: "🔵"
  },
  {
    id: 3,
    name: "Command+R",
    category: "Implant",
    contact: "+1 234567890",
    email: "olivia@untitledui.com",
    offer: "15% off until Sept 30",
    icon: "🟠"
  },
  {
    id: 4,
    name: "Hourglass",
    category: "Implant",
    contact: "+1 234567890",
    email: "olivia@untitledui.com",
    offer: "15% off until Sept 30",
    icon: "🔵"
  },
  {
    id: 5,
    name: "Layers",
    category: "Implant",
    contact: "+1 234567890",
    email: "olivia@untitledui.com",
    offer: "15% off until Sept 30",
    icon: "🟣"
  },
  {
    id: 6,
    name: "DentalPro",
    category: "Equipment",
    contact: "+1 345678901",
    email: "contact@dentalpro.com",
    offer: "20% off new orders",
    icon: "🟢"
  },
  {
    id: 7,
    name: "MediSoft",
    category: "Software",
    contact: "+1 456789012",
    email: "support@medisoft.com",
    offer: "Free trial for 30 days",
    icon: "🟡"
  },
  {
    id: 8,
    name: "SmileTech",
    category: "Implant",
    contact: "+1 567890123",
    email: "info@smiletech.com",
    offer: "10% off bulk orders",
    icon: "🔴"
  },
  {
    id: 9,
    name: "DentalCare",
    category: "Equipment",
    contact: "+1 678901234",
    email: "sales@dentalcare.com",
    offer: "Free shipping on orders over $500",
    icon: "🟤"
  },
  {
    id: 10,
    name: "TechDent",
    category: "Software",
    contact: "+1 789012345",
    email: "hello@techdent.com",
    offer: "50% off first year subscription",
    icon: "⚪"
  },
  {
    id: 11,
    name: "OrthoMax",
    category: "Orthodontics",
    contact: "+1 890123456",
    email: "info@orthomax.com",
    offer: "Free consultation + 15% off treatment",
    icon: "🔷"
  },
  {
    id: 12,
    name: "DentalWorks",
    category: "Equipment",
    contact: "+1 901234567",
    email: "sales@dentalworks.com",
    offer: "Bulk discount up to 25%",
    icon: "🔶"
  },
  {
    id: 13,
    name: "ProDent",
    category: "Software",
    contact: "+1 012345678",
    email: "support@prodent.com",
    offer: "Free setup and training",
    icon: "🔸"
  },
  {
    id: 14,
    name: "ImplantPro",
    category: "Implant",
    contact: "+1 123456789",
    email: "contact@implantpro.com",
    offer: "Lifetime warranty on implants",
    icon: "🔹"
  },
  {
    id: 15,
    name: "DentalLab",
    category: "Laboratory",
    contact: "+1 234567890",
    email: "orders@dentallab.com",
    offer: "Express delivery in 24 hours",
    icon: "🔺"
  },
  {
    id: 16,
    name: "SmileCare",
    category: "Equipment",
    contact: "+1 345678901",
    email: "info@smilecare.com",
    offer: "Free maintenance for 1 year",
    icon: "🔻"
  },
  {
    id: 17,
    name: "DentTech",
    category: "Software",
    contact: "+1 456789012",
    email: "hello@denttech.com",
    offer: "Cloud backup included",
    icon: "🔴"
  },
  {
    id: 18,
    name: "OrthoCare",
    category: "Orthodontics",
    contact: "+1 567890123",
    email: "support@orthocare.com",
    offer: "Payment plans available",
    icon: "🟠"
  },
  {
    id: 19,
    name: "DentalSupply",
    category: "Supplies",
    contact: "+1 678901234",
    email: "orders@dentalsupply.com",
    offer: "Free shipping on orders over $200",
    icon: "🟡"
  },
  {
    id: 20,
    name: "ProSmile",
    category: "Equipment",
    contact: "+1 789012345",
    email: "sales@prosmile.com",
    offer: "Installation included",
    icon: "🟢"
  },
  {
    id: 21,
    name: "DentSoft",
    category: "Software",
    contact: "+1 890123456",
    email: "info@dentsoft.com",
    offer: "Multi-user licenses available",
    icon: "🔵"
  },
  {
    id: 22,
    name: "ImplantCare",
    category: "Implant",
    contact: "+1 901234567",
    email: "contact@implantcare.com",
    offer: "Free follow-up consultations",
    icon: "🟣"
  },
  {
    id: 23,
    name: "DentalTech",
    category: "Equipment",
    contact: "+1 012345678",
    email: "support@dentaltech.com",
    offer: "Extended warranty options",
    icon: "🟤"
  },
  {
    id: 24,
    name: "SmileLab",
    category: "Laboratory",
    contact: "+1 123456789",
    email: "orders@smilelab.com",
    offer: "Custom color matching",
    icon: "⚫"
  },
  {
    id: 25,
    name: "OrthoSoft",
    category: "Software",
    contact: "+1 234567890",
    email: "hello@orthosoft.com",
    offer: "3D modeling included",
    icon: "⚪"
  },
]

export default function DashboardContent({ activeTab: _ }: DashboardContentProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const navigate = useNavigate()

  // Filter vendors based on search
  const filteredVendors = favoriteVendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.offer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  // Pagination
  const itemsPerPage = 5
  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVendors = filteredVendors.slice(startIndex, startIndex + itemsPerPage)

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  // Navigation handlers
  const handleViewMoreEvents = () => {
    navigate('/events')
  }

  const handleViewMoreDiscussions = () => {
    navigate('/community')
  }

  // Empty state component
  const EmptyState = () => (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 px-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-6"
      >
        <SearchNotFoundIcon />
      </motion.div>
      <motion.h3 
        className="text-xl font-semibold text-gray-900 mb-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        Data not found
      </motion.h3>
      <motion.p 
        className="text-gray-500 text-center max-w-md"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        No vendors match your search criteria. Try adjusting your search terms or browse all vendors.
      </motion.p>
      <motion.button
        onClick={() => setSearchTerm('')}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Clear Search
      </motion.button>
    </motion.div>
  )

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.02 }
  }

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 }
  }

  return (
    <motion.div 
      className=""
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-xl sm:text-2xl font-bold text-gray-900"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Dashboard
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
        <button className='cursor-pointer flex items-center justify-center space-x-1 sm:space-x-2 text-[#344054] px-2 sm:px-4 py-2 sm:py-2.5 rounded-[8px] outline outline-offset-1 outline-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D]'>
          <img src="/assets/dashboard/exportIcon.svg" alt="exportIcon" className="w-4 h-4" />
          <span className='text-xs sm:text-sm font-semibold hidden xs:inline'>Export</span>
          
        </button>
        </motion.div>
      </motion.div>

      {/* Summary Cards */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8 mb-4 sm:mb-6"
        variants={containerVariants}
      >
        {summaryCards.map((card, index) => (
          <motion.div 
            key={index} 
            className="bg-white border border-gray-200 rounded-lg py-4 sm:py-5 px-3 sm:px-4 relative cursor-pointer"
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
            initial="hidden"
            animate="visible"
            transition={{ 
              delay: index * 0.1,
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
          >
          
              <div className="flex items-center justify-between mb-2">
                <motion.p 
                  className="text-xs sm:text-sm text-[#475467] truncate flex-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  {card.title}
                </motion.p> 
                <img src="/assets/dashboard/dotsIcon.svg" alt="dotsIcon" className='h-4 w-4 sm:h-5 sm:w-5 text-gray-400 hover:text-gray-600 cursor-pointer flex-shrink-0 ml-2' />
                </div>
                <motion.p 
                  className="text-2xl sm:text-3xl font-bold text-gray-900"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 200 }} >
                  {card.value}
                </motion.p>
          </motion.div>
        ))}
      </motion.div>

      {/* Middle Section - Events and Discussions */}
      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6"
        variants={containerVariants}
      >
        {/* Upcoming Events */}
        <motion.div 
          className="bg-white outline outline-[#EAECF0] outline-offset-1 rounded-lg p-4 sm:p-6 shadow-[0px_1px_2px_0px_#1018280D]"
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}  
        >
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
             <img src="/assets/dashboard/dotsIcon.svg" alt="dotsIcon" className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer' />
          </motion.div>
            <div className="space-y-3 sm:space-y-4">
            {upcomingEvents.map((event, index) => (
              <div key={index} className='flex items-center justify-between pt-3 sm:pt-4 pb-3 sm:pb-[15px] pr-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 border-b border-[#EAECF0]' >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                 <img src="/assets/dashboard/workshopIcon.svg" alt="workshopIcon" className='h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0' />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[#101828] text-xs sm:text-sm truncate">{event.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">{event.date}</p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 ml-2"
                >
                  <button  color="primary" className='py-1.5 px-3 text-sm bg-[#2980B9] rounded-[8px] cursor-pointer text-white'>
                    Join Event
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
          <motion.div 
            className="mt-4 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            <motion.button 
              onClick={handleViewMoreEvents}
              className="text-[#2980B9] text-sm font-medium cursor-pointer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              View More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Latest Discussions */}
        <motion.div 
          className="bg-white outline outline-[#EAECF0] outline-offset-1 rounded-lg p-4 sm:p-6 shadow-[0px_1px_2px_0px_#1018280F]"
          variants={itemVariants}
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="flex items-center justify-between mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <h3 className="text-lg font-semibold text-gray-900">Latest Discussions</h3>
            <img src="/assets/dashboard/dotsIcon.svg" alt="dotsIcon" className='h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer' />
          </motion.div>
          <div className="space-y-3 sm:space-y-4">
            {latestDiscussions.map((discussion, index) => (
              <div key={index} className='flex items-center justify-between pt-4 pb-[15px] rounded-lg hover:bg-gray-100 transition-colors duration-200 border-b border-[#EAECF0]' >
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <img src="/assets/dashboard/chatIcon.svg" alt="chatIcon" className='h-6 w-6 sm:h-8 sm:w-8 flex-shrink-0' />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 text-xs sm:text-sm truncate">{discussion.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600 truncate">
                      {discussion.replies || discussion.date}
                    </p>
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 ml-2"
                >
                    <button  color="primary" className='py-1.5 px-3 text-sm bg-[#2980B9] rounded-[8px] cursor-pointer text-white'>
                   Go to Chat
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
          <motion.div 
            className="mt-4 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
          >
            <motion.button 
              onClick={handleViewMoreDiscussions}
              className="text-[#2980B9]  text-sm font-medium cursor-pointer"
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.95 }}  
            >
              View More
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Favorite Vendors Section */}
      <motion.div 
          className="p-4 sm:p-6 border-b border-gray-200 mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="min-w-0 flex-1">
              <motion.h3 
                className="text-base sm:text-lg font-semibold text-gray-900 mb-1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.6 }}
              >
                Favorite Vendors
              </motion.h3>
              <motion.p 
                className="text-xs sm:text-sm text-gray-600"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.7 }}
              >
                Keep track of vendors and their security ratings.
              </motion.p>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full lg:w-auto">
              <motion.div 
                className="relative flex-1 lg:flex-none lg:w-80"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 }}
              >
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon />
                </div>
                <motion.input
                  type="text"
                  placeholder="Search vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 px-6 py-2.5 sm:py-2.5 border border-gray-300 rounded-lg text-xs sm:text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#2980B9] focus:border-transparent transition-colors duration-200"
                  whileFocus={{ scale: 1.02 }}
                />
                <AnimatePresence>
                  {searchTerm && (
                    <motion.button
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </motion.button>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {searchTerm && (
                  <motion.div 
                    className="text-xs sm:text-sm text-gray-500 text-center sm:text-left"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {filteredVendors.length} result{filteredVendors.length !== 1 ? 's' : ''} found
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      <motion.div 
        className="bg-white border border-gray-200 rounded-lg"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.4 }}
      >
      

        {/* Table or Empty State */}
        <motion.div 
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
          {filteredVendors.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-hidden">
                <table className="w-full table-fixed">
                  <motion.thead 
                    className="bg-gray-50"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.0 }}
                  >
                    <tr>
                      <th className="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendor
                      </th>
                      <th className="w-1/6 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categories
                      </th>
                      <th className="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact info
                      </th>
                      <th className="w-1/4 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Offers
                      </th>
                      <th className="w-1/12 px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </motion.thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <AnimatePresence mode="popLayout">
                      {paginatedVendors.map((vendor, index) => (
                        <motion.tr 
                          key={vendor.id} 
                          className="hover:bg-gray-50"
                          variants={tableRowVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          transition={{ delay: index * 0.05 }}
                          whileHover={{ 
                            scale: 1.01,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <td className="px-4 py-4">
                            <div className="flex items-center min-w-0">
                              <motion.div 
                                className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                                whileHover={{ rotate: 360 }}
                                transition={{ duration: 0.5 }}
                              >
                                <span className="text-lg">{vendor.icon}</span>
                              </motion.div>
                              <div className="min-w-0 flex-1">
                                <div className="text-sm font-medium text-gray-900 truncate">{vendor.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-900 truncate block">{vendor.category}</span>
                          </td>
                          <td className="px-4 py-4">
                            <div className="min-w-0">
                              <div className="text-sm text-gray-900 truncate">{vendor.contact}</div>
                              <div className="text-sm text-gray-500 truncate">{vendor.email}</div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span className="text-sm text-gray-900 truncate block">{vendor.offer}</span>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium">
                            <div className="flex space-x-2 justify-start">
                              <motion.button 
                                className="text-blue-600 hover:text-blue-900 flex-shrink-0 mr-3.5 cursor-pointer"
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <EyeIcon />
                              </motion.button>
                              <motion.button 
                                className="text-red-600 hover:text-red-900 flex-shrink-0 cursor-pointer"
                                whileHover={{ scale: 1.2, y: -2 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <TrashIcon />
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden">
                <div className="divide-y divide-gray-200">
                  <AnimatePresence mode="popLayout">
                    {paginatedVendors.map((vendor, index) => (
                      <motion.div 
                        key={vendor.id} 
                        className="p-4 hover:bg-gray-50 transition-colors duration-200"
                        variants={tableRowVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ 
                          scale: 1.01,
                          transition: { duration: 0.2 }
                        }}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center min-w-0 flex-1">
                            <motion.div 
                              className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3 flex-shrink-0"
                              whileHover={{ rotate: 360 }}
                              transition={{ duration: 0.5 }}
                            >
                              <span className="text-lg">{vendor.icon}</span>
                            </motion.div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 truncate">{vendor.name}</div>
                              <div className="text-xs text-gray-500 truncate">{vendor.category}</div>
                            </div>
                          </div>
                          <div className="flex space-x-2 ml-2">
                            <motion.button 
                              className="text-blue-600 hover:text-blue-900 flex-shrink-0 p-1 cursor-pointer"
                              whileHover={{ scale: 1.2, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <EyeIcon />
                            </motion.button>
                            <motion.button 
                              className="text-red-600 hover:text-red-900 flex-shrink-0 p-1 cursor-pointer"
                              whileHover={{ scale: 1.2, y: -2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <TrashIcon />
                            </motion.button>
                          </div>
                        </div>
                        <div className="space-y-2 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Contact:</span>
                            <span className="text-gray-900 font-medium">{vendor.contact}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Email:</span>
                            <span className="text-gray-900 font-medium truncate max-w-[150px]">{vendor.email}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500">Offer:</span>
                            <span className="text-gray-900 font-medium truncate max-w-[150px]">{vendor.offer}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </>
          )}
        </motion.div>

        {/* Pagination */}
        <AnimatePresence>
          {totalPages > 1 && filteredVendors.length > 0 && (
            <motion.div 
              className="px-4 sm:px-6 py-3 sm:py-4 border-t border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PaginationPageDefault
                page={currentPage}
                total={totalPages}
                onPageChange={handlePageChange}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
