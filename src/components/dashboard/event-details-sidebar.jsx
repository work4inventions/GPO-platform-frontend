import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Calendar, MapPin, Bookmark, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/base/buttons/button'

const EventDetailsSidebar = ({ event, isOpen, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false)
  
  
  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'  
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])
  
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
            className="fixed right-0 top-0 h-full w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 sm:p-6 flex items-center justify-between z-1">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 truncate pr-4">
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
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
              {/* Event Image */}
              <div className="relative w-full h-40 sm:h-48 rounded-lg overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Event Title and Date */}
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {event.title}
                </h3>
                <div className="flex items-center gap-2 text-sm text-[#2980B9]">
                  <Calendar className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate">{event.date} – {event.time}</span>
                </div>
              </div>

              {/* About Section */}
              <div className="space-y-3">
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">About</h4>
                <div className="space-y-3">
                  {/* Initial truncated content */}
                  <div className="text-gray-600 text-sm leading-relaxed">
                    <p>
                      Enim feugiat ut ipsum, neque ut. Tristique mi id elementum praesent. 
                      <strong>Gravida in tempus</strong> feugiat netus enim aliquet a, quam scelerisque. 
                      Dictumst in convallis nec in bibendum aenean arcu.
                    </p>
                  </div>
                  
                  {/* Show/Hide additional content toggle */}
                  <button 
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-1 text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        Show less
                        <ChevronUp className="w-4 h-4" />
                      </>
                    ) : (
                      <>
                        Show more
                        <ChevronDown className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="space-y-3"
                      >
                        {/* Additional content without CKEditor for now */}
                        <div className="text-gray-600 text-sm leading-relaxed space-y-3">
                          <p>
                            This comprehensive event brings together industry leaders, practitioners, and innovators 
                            in the field of digital dentistry. You'll have the opportunity to explore cutting-edge 
                            technologies, attend hands-on workshops, and network with like-minded professionals.
                          </p>
                          
                          <p>
                            Key topics covered include digital impressions, CAD/CAM systems, 3D printing in dentistry, 
                            digital workflow optimization, and the latest trends in patient care technology. 
                            The event features keynote presentations, panel discussions, and interactive sessions 
                            designed to enhance your practice and stay ahead of industry developments.
                          </p>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">What you'll learn:</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>Advanced digital impression techniques</li>
                              <li>Integration of AI in dental practice</li>
                              <li>Cost-effective digital solutions</li>
                              <li>Patient communication strategies</li>
                              <li>Future trends in digital dentistry</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Event Schedule:</h5>
                            <div className="space-y-2">
                              <p className="font-medium">Day 1 - Foundation & Fundamentals</p>
                              <ul className="list-disc list-inside space-y-1 ml-2 text-xs">
                                <li>9:00 AM - Registration & Welcome Coffee</li>
                                <li>9:30 AM - Keynote: "The Future of Digital Dentistry"</li>
                                <li>10:30 AM - Break & Networking</li>
                                <li>11:00 AM - Workshop: Digital Impression Techniques</li>
                                <li>12:30 PM - Lunch & Exhibition</li>
                                <li>2:00 PM - Panel Discussion: AI in Dental Practice</li>
                                <li>3:30 PM - Hands-on Session: CAD/CAM Systems</li>
                                <li>5:00 PM - Q&A & Wrap-up</li>
                              </ul>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Speakers & Experts:</h5>
                            <p className="mb-2">Our event features renowned experts in digital dentistry including:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li><strong>Dr. Sarah Johnson</strong> - Director of Digital Innovation at DentalTech Institute</li>
                              <li><strong>Prof. Michael Chen</strong> - Leading researcher in AI applications for dentistry</li>
                              <li><strong>Dr. Emily Rodriguez</strong> - Pioneer in 3D printing for dental prosthetics</li>
                              <li><strong>Dr. James Wilson</strong> - Expert in digital workflow optimization</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Registration Includes:</h5>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>Access to all sessions and workshops</li>
                              <li>Digital materials and resources</li>
                              <li>Networking lunch and coffee breaks</li>
                              <li>Certificate of participation</li>
                              <li>Exhibition access to latest dental technology</li>
                              <li>Digital toolkit with software trials</li>
                            </ul>
                          </div>
                          
                          <div>
                            <h5 className="font-semibold text-gray-900 mb-2">Who Should Attend:</h5>
                            <p className="mb-2">This event is perfect for:</p>
                            <ul className="list-disc list-inside space-y-1 ml-2">
                              <li>General dentists looking to modernize their practice</li>
                              <li>Dental specialists interested in digital workflows</li>
                              <li>Dental technicians and lab professionals</li>
                              <li>Practice managers and administrators</li>
                              <li>Students and recent graduates in dentistry</li>
                            </ul>
                          </div>
                          
                          <p className="italic text-gray-500">
                            Don't miss this opportunity to stay ahead of the curve in digital dentistry. 
                            Limited seats available - register now to secure your spot!
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">Address</h4>
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
                <h4 className="text-base sm:text-lg font-semibold text-gray-900">Location</h4>
                <div className="w-full h-40 sm:h-48 bg-gray-100 rounded-lg flex items-center justify-center">
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
            <div className="flex-shrink-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-4">
              <div className="flex items-center justify-between gap-4">
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="text-base sm:text-lg font-bold text-gray-900">
                    $27.00-$36.00
                  </div>
                  <div className="text-xs sm:text-sm text-gray-500">
                    90 Spots Left
                  </div>
                </div>
                <Button
                  size="md"
                  color="primary"
                  className="px-4 sm:px-6 py-2 flex-shrink-0"
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
