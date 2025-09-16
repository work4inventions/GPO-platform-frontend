import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { ToastContainer } from './toast'

const ToastContext = createContext()

const toastReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TOAST':
      return [...state, action.payload]
    case 'REMOVE_TOAST':
      return state.filter(toast => toast.id !== action.payload)
    case 'CLEAR_ALL':
      return []
    default:
      return state
  }
}

export const ToastProvider = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, [])

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random()
    const newToast = {
      id,
      type: 'info',
      duration: 5000,
      showProgress: true,
      ...toast,
    }

    dispatch({ type: 'ADD_TOAST', payload: newToast })

    // Auto remove toast after duration
    if (newToast.duration > 0) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_TOAST', payload: id })
      }, newToast.duration)
    }

    return id
  }, [])

  const removeToast = useCallback((id) => {
    dispatch({ type: 'REMOVE_TOAST', payload: id })
  }, [])

  const clearAll = useCallback(() => {
    dispatch({ type: 'CLEAR_ALL' })
  }, [])

  // Convenience methods for different toast types
  const showSuccess = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'success',
      title,
      message,
      ...options,
    })
  }, [addToast])

  const showError = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'error',
      title,
      message,
      ...options,
    })
  }, [addToast])

  const showWarning = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'warning',
      title,
      message,
      ...options,
    })
  }, [addToast])

  const showInfo = useCallback((title, message, options = {}) => {
    return addToast({
      type: 'info',
      title,
      message,
      ...options,
    })
  }, [addToast])

  const value = {
    toasts,
    addToast,
    removeToast,
    clearAll,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}
