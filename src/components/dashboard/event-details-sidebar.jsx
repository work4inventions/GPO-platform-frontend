import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Bookmark } from 'lucide-react'
import { Button } from '@/components/base/buttons/button'

const EventDetailsSidebar = ({ event, isOpen, onClose }) => {
  if (!event) return null

  const getTagColor = (tag) => {
    switch (tag) {
      case 'Free':
        return 'bg-blue-100 text-blue-800'
      case 'Paid':
        return 'bg-blue-600 text-white'
      case 'Online':
        return 'bg-purple-100 text-purple-800'
      case 'In Person':
        return 'bg-blue-600 text-white'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 mb-0"
            onClick={onClose}
          />
          
          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-1">
              <h2 className="text-xl font-bold text-gray-900 truncate pr-4">
                {event.title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0 cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-6">
              {/* Event Image */}
              <div className="relative w-full h-48 rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Title and Date */}
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#2980B9]">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date} – {event.time}</span>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900">About</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. 
                  Gravida in tempus feugiat netus enim aliquet a, quam scelerisque. 
                  Dictumst in convallis nec in bibendum aenean arcu.
                </p>
                <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                  Show more
                </button>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Address Section */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900">Address</h4>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 text-sm">
                    18, Canva Street, Near Figma Components<br />
                    California, USA, 315478
                  </p>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="space-y-3">
                <h4 className="text-lg font-semibold text-gray-900">Location</h4>
                <div className="w-full h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-500">
                    <MapPin className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm">Interactive Map</p>
                    <p className="text-xs">Sheridan Shores Park</p>
                    <p className="text-xs">National Shrine of St. Jude</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer with Price and Book Button */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-lg font-bold text-gray-900">
                    $27.00-$36.00
                  </div>
                  <div className="text-sm text-gray-500">
                    90 Spots Left
                  </div>
                </div>
                <Button
                  size="md"
                  color="primary"
                  className="px-6 py-2"
                >
                  Book Now
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default EventDetailsSidebar
