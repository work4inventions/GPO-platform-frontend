import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, InfoCircle, X } from '@untitledui/icons'

const toastVariants = {
  initial: {
    opacity: 0,
    y: -50,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    y: -50,
    scale: 0.9,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    },
  },
}

const progressVariants = {
  initial: {
    scaleX: 1,
  },
  animate: {
    scaleX: 0,
    transition: {
      duration: 5, // 5 seconds
      ease: "linear",
    },
  },
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: InfoCircle,
}

const colorMap = {
  success: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    text: 'text-green-800',
    progress: 'bg-green-500',
  },
  error: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    text: 'text-red-800',
    progress: 'bg-red-500',
  },
  warning: {
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
    icon: 'text-yellow-600',
    text: 'text-yellow-800',
    progress: 'bg-yellow-500',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-blue-200',
    icon: 'text-blue-600',
    text: 'text-blue-800',
    progress: 'bg-blue-500',
  },
}

export const Toast = ({ 
  id, 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose, 
  showProgress = true 
}) => {
  const Icon = iconMap[type] || InfoCircle
  const colors = colorMap[type] || colorMap.info

  return (
    <motion.div
      layout
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`
        relative max-w-sm w-full bg-white rounded-lg shadow-lg border-l-4 ${colors.border}
        ${colors.bg} p-4 mb-3 overflow-hidden
      `}
    >
      {/* Progress bar */}
      {showProgress && duration > 0 && (
        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${colors.progress} origin-left`}
          variants={progressVariants}
          initial="initial"
          animate="animate"
        />
      )}

      <div className="flex items-start">
        <div className="flex-shrink-0">
          <Icon className={`w-5 h-5 ${colors.icon}`} />
        </div>
        
        <div className="ml-3 flex-1">
          {title && (
            <h4 className={`text-sm font-semibold ${colors.text} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm ${colors.text} ${title ? 'mt-1' : ''}`}>
              {message}
            </p>
          )}
        </div>

        <div className="ml-4 flex-shrink-0">
          <button
            onClick={() => onClose(id)}
            className={`
              inline-flex rounded-md p-1.5 ${colors.text} hover:bg-gray-100 hover:bg-opacity-50
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white
              transition-colors duration-200
            `}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export const ToastContainer = ({ toasts, onClose }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
