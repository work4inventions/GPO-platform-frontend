import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/base/buttons/button'
import { Input } from '@/components/base/input/input'
import { Select } from '@/components/base/select/select'
import { Search, Calendar, List, Grid3X3, Bookmark, ChevronDown } from 'lucide-react'
// @ts-ignore
import EventDetailsSidebar from './event-details-sidebar'
// @ts-ignore
import { useToast } from '@/components/base/toast'

interface EventsContentProps {
  activeTab: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  type: 'Free Online' | 'Paid In Person' | 'Free In Person' | 'Paid Online'
  category: string
  image: string
  isSaved: boolean
  isUpcoming: boolean
  tags: string[]
}

const mockEvents: Event[] = [
  // Upcoming Events
  {
    id: '1',
    title: 'Digital Dentistry Summit 2025 2025',
    description: 'How do you create compelling presentations that wow your.',
    date: 'Sept 22, 2025',
    time: '10:00 AM EST',
    type: 'Free Online',
    category: 'Healthcare',
    image: '/assets/events/events1.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'Online']
  },
  {
    id: '2',
    title: 'Digital Dentistry Summit 2025',
    description: 'Learn the latest techniques in modern healthcare.',
    date: 'Sept 25, 2025',
    time: '2:00 PM EST',
    type: 'Paid In Person',
    category: 'Healthcare',
    image: '/assets/events/events2.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Paid', 'In Person']
  },
  {
    id: '3',
    title: 'Digital Dentistry Summit 2025',
    description: 'Learn the latest techniques in modern healthcare',
    date: 'Sept 28, 2025',
    time: '9:00 AM EST',
    type: 'Free Online',
    category: 'Technology',
    image: '/assets/events/events3.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'Online']
  },
  {
    id: '4',
    title: 'Digital Dentistry Summit 2025',
    description: 'Master the art of business growth and development.',
    date: 'Oct 1, 2025',
    time: '11:00 AM EST',
    type: 'Free Online',
    category: 'Business',
    image: '/assets/events/events4.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'Online']
  },
  {
    id: '5',
    title: 'Digital Dentistry Summit 2025',
    description: 'Explore the future of digital learning.',
    date: 'Oct 5, 2025',
    time: '3:00 PM EST',
    type: 'Paid Online',
    category: 'Education',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Paid', 'Online']
  },
  {
    id: '6',
    title: 'Digital Dentistry Summit 2025',
    description: 'Learn essential financial management skills.',
    date: 'Oct 8, 2025',
    time: '1:00 PM EST',
    type: 'Free In Person',
    category: 'Finance',
    image: '/assets/events/events6.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'In Person']
  },
  // Past Events
  {
    id: '7',
    title: 'Digital Dentistry Summit 2025 2024',
    description: 'A comprehensive look at healthcare technology trends.',
    date: 'Aug 15, 2024',
    time: '10:00 AM EST',
    type: 'Paid In Person',
    category: 'Healthcare',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: false,
    tags: ['Paid', 'In Person']
  },
  {
    id: '8',
    title: 'Digital Dentistry Summit 2025',
    description: 'Advanced strategies for digital marketing success.',
    date: 'Aug 20, 2024',
    time: '2:00 PM EST',
    type: 'Free Online',
    category: 'Business',
    image: '/assets/events/events5.svg',  
    isSaved: false,
    isUpcoming: false,
    tags: ['Free', 'Online']
  },
  {
    id: '9',
    title: 'Digital Dentistry Summit 2025 Learning Conference',
    description: 'Exploring the future of artificial intelligence.',
    date: 'Aug 25, 2024',
    time: '9:00 AM EST',
    type: 'Paid Online',
    category: 'Technology',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: false,
    tags: ['Paid', 'Online']
  },
  // Additional events for Load More functionality
  {
    id: '10',
    title: 'Digital Dentistry Summit 2025',
    description: 'Advanced techniques in cardiovascular medicine.',
    date: 'Oct 12, 2025',
    time: '8:00 AM EST',
    type: 'Paid In Person',
    category: 'Healthcare',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Paid', 'In Person']
  },
  {
    id: '11',
    title: 'Digital Dentistry Summit 2025',
    description: 'Master cloud technologies and deployment strategies.',
    date: 'Oct 15, 2025',
    time: '1:00 PM EST',
    type: 'Free Online',
    category: 'Technology',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'Online']
  },
  {
    id: '12',
    title: 'Digital Dentistry Summit 2025',
    description: 'Develop your leadership skills and team management.',
    date: 'Oct 18, 2025',
    time: '10:00 AM EST',
    type: 'Paid In Person',
    category: 'Business',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Paid', 'In Person']
  },
  {
    id: '13',
    title: 'Digital Dentistry Summit 2025',
    description: 'Revolutionary approaches to online education.',
    date: 'Oct 22, 2025',
    time: '2:00 PM EST',
    type: 'Free Online',
    category: 'Education',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'Online']
  },
  {
    id: '14',
    title: 'Investment Strategies Workshop',
    description: 'Learn advanced investment and portfolio management.',
    date: 'Oct 25, 2025',
    time: '11:00 AM EST',
    type: 'Paid Online',
    category: 'Finance',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Paid', 'Online']
  },
  {
    id: '15',
    title: 'Mental Health Awareness Conference',
    description: 'Understanding and supporting mental health in healthcare.',
    date: 'Oct 28, 2025',
    time: '9:00 AM EST',
    type: 'Free In Person',
    category: 'Healthcare',
    image: '/assets/events/events5.svg',
    isSaved: false,
    isUpcoming: true,
    tags: ['Free', 'In Person']
  }
]

const categoryOptions = [
  { id: 'all', label: 'All Categories' },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'technology', label: 'Technology' },
  { id: 'business', label: 'Business' },
  { id: 'education', label: 'Education' },
  { id: 'finance', label: 'Finance' }
]

const monthOptions = [
  { id: 'this-month', label: 'This Month' },
  { id: 'next-month', label: 'Next Month' },
  { id: 'this-quarter', label: 'This Quarter' },
  { id: 'this-year', label: 'This Year' }
]

export default function EventsContent({ activeTab: _ }: EventsContentProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('Upcoming')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('this-month')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [savedEvents, setSavedEvents] = useState<string[]>([])
  const [eventsPerPage, setEventsPerPage] = useState(6)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { showSuccess, showInfo } = useToast()

  const filterTabs = ['Upcoming', 'Past', 'Free', 'Paid', 'Saved']

  const filteredEvents = useMemo(() => {
    let filtered = mockEvents

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Active filter tabs
    switch (activeFilter) {
      case 'Upcoming':
        filtered = filtered.filter(event => event.isUpcoming)
        break
      case 'Past':
        filtered = filtered.filter(event => !event.isUpcoming)
        break
      case 'Free':
        filtered = filtered.filter(event => event.type.includes('Free'))
        break
      case 'Paid':
        filtered = filtered.filter(event => event.type.includes('Paid'))
        break
      case 'Saved':
        filtered = filtered.filter(event => savedEvents.includes(event.id))
        break
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => 
        event.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    return filtered
  }, [searchQuery, activeFilter, selectedCategory, savedEvents])

  const displayedEvents = useMemo(() => {
    return filteredEvents.slice(0, eventsPerPage)
  }, [filteredEvents, eventsPerPage])

  const hasMoreEvents = filteredEvents.length > eventsPerPage

  const toggleSaveEvent = (eventId: string) => {
    const event = mockEvents.find(e => e.id === eventId)
    const isCurrentlySaved = savedEvents.includes(eventId)
    
    setSavedEvents(prev => 
      prev.includes(eventId) 
        ? prev.filter(id => id !== eventId)
        : [...prev, eventId]
    )

    // Show toast notification
    if (isCurrentlySaved) {
      showInfo(
        'Event Removed',
        `${event?.title} has been removed from your saved events.`,
        { duration: 3000 }
      )
    } else {
      showSuccess(
        'Event Saved',
        `${event?.title} has been added to your saved events.`,
        { duration: 3000 }
      )
    }
  }

  const handleLoadMore = async () => {
    setIsLoadingMore(true)
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    setEventsPerPage(prev => prev + 6)
    setIsLoadingMore(false)
  }

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event)
    setIsSidebarOpen(true)
  }

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false)
    setSelectedEvent(null)
  }

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'Free':
        return 'bg-blue-100 text-blue-800'
      case 'Paid':
        return 'bg-purple-100 text-purple-800'
      case 'Online':
        return 'bg-purple-100 text-purple-800'
      case 'In Person':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 "
    >
      {/* Header Section */}
      <div className="mb-[23px]">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-[23px]">
          <h1 className="text-2xl font-bold text-gray-900">Events</h1>
          
          {/* Search Bar */}
          <div className="w-full sm:w-80">
            <Input
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e)}
              icon={Search}
              size="md"
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {filterTabs.map((tab) => (
              <Button
                key={tab}
                size="sm"
                color={activeFilter === tab ? 'primary' : 'secondary'}
                onClick={() => setActiveFilter(tab)}
                className="text-sm px-3 py-2"
              >
                {tab}
              </Button>
            ))}
          </div>

          {/* Dropdowns and View Toggle */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Month Dropdown */}
            <div className="w-full sm:w-40">
              <Select
                placeholder="This Month"
                selectedKey={selectedMonth}
                onSelectionChange={(key) => setSelectedMonth(key as string)}
                items={monthOptions}
                size="sm"
              >
                {(item) => (
                  <Select.Item key={item.id} id={item.id}>
                    {item.label}
                  </Select.Item>
                )}
              </Select>
            </div>

            {/* Category Dropdown */}
            <div className="w-full sm:w-40">
              <Select
                placeholder="Category"
                selectedKey={selectedCategory}
                onSelectionChange={(key) => setSelectedCategory(key as string)}
                items={categoryOptions}
                size="sm"
              >
                {(item) => (
                  <Select.Item key={item.id} id={item.id}>
                    {item.label}
                  </Select.Item>
                )}
              </Select>
            </div>

            {/* View Toggle */}
            <div className="flex gap-1">
              <Button
                size="sm"
                color={viewMode === 'list' ? 'primary' : 'secondary'}
                onClick={() => setViewMode('list')}
                className="p-2"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                color={viewMode === 'grid' ? 'primary' : 'secondary'}
                onClick={() => setViewMode('grid')}
                className="p-2"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Events Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          : "space-y-4"
      }>
        {displayedEvents.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            onClick={() => handleEventClick(event)}
            className={`bg-white rounded-lg shadow-sm outline outline-gray-200 outline-offset-1 overflow-hidden
              hover:shadow-md transition-shadow duration-200 cursor-pointer
              ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}
            `}
          >
            {/* Event Image */}
            <div className={`
              relative
              ${viewMode === 'list' ? 'w-full sm:w-64 h-auto sm:h-auto' : 'w-full aspect-[21_/_14.652]'}
            `}>
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  toggleSaveEvent(event.id)
                }}
                className="absolute top-3 right-3 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
              >
                <Bookmark 
                  className={`w-4 h-4 ${
                    savedEvents.includes(event.id) 
                      ? 'text-blue-600 fill-current' 
                      : 'text-gray-400'
                  }`} 
                />
              </button>
            </div>

            {/* Event Details */}
            <div className={` pt-4 px-6 pb-6 flex-1
              ${viewMode === 'list' ? 'flex flex-col justify-between' : ''}
            `}>
              <div className="">
                {/* Date and Time */}
                <div className="flex items-center gap-2 text-sm text-[#2980B9] mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date} - {event.time}</span>
                </div>
                
                {/* Title with External Link Icon */}
                <div className="flex items-start justify-between">
                  <h3 className="text-[20px] font-semibold text-gray-900 line-clamp-2 flex-1 leading-[1.6]">
                    {event.title}
                  </h3>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      handleEventClick(event)
                    }}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors ml-2 flex-shrink-0"
                  >
                    <img src="/assets/events/rightArrow.svg" alt="rightArrow" className='cursor-pointer' />
                  </button>
                </div>
                
                {/* Description */}
                <p className="text-[#475467] text-base line-clamp-2 mb-3.5 mt-2">
                  {event.description}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {event.tags.map((tag, index) => (
                    <span
                      key={index}
                      className={`px-2.5 py-[2px] rounded-full text-sm font-medium
                        ${getTagColor(tag)}
                      `}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMoreEvents && (
        <div className="flex justify-center mt-16">
          <Button
            onClick={handleLoadMore}
            disabled={isLoadingMore}
            size="md"
            color="secondary"
            className="px-8 py-3"
            iconTrailing={isLoadingMore ? undefined : ChevronDown}
          >
            {isLoadingMore ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                Loading...
              </div>
            ) : (
              'Load more'
            )}
          </Button>
        </div>
      )}

      {/* Empty State */}
      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}

      {/* Event Details Sidebar */}
      <EventDetailsSidebar
        event={selectedEvent}
        isOpen={isSidebarOpen}
        onClose={handleCloseSidebar}
      />
    </motion.div>
  )
}
