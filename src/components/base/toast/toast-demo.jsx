import React from 'react'
import { Button } from '@/components/base/buttons/button'
import { useToast } from './toast-context'

export const ToastDemo = () => {
  const { showSuccess, showError, showWarning, showInfo } = useToast()

  const handleSuccess = () => {
    showSuccess(
      'Success!',
      'This is a success message with animation.',
      { duration: 4000 }
    )
  }

  const handleError = () => {
    showError(
      'Error!',
      'This is an error message with animation.',
      { duration: 5000 }
    )
  }

  const handleWarning = () => {
    showWarning(
      'Warning!',
      'This is a warning message with animation.',
      { duration: 4000 }
    )
  }

  const handleInfo = () => {
    showInfo(
      'Info!',
      'This is an info message with animation.',
      { duration: 4000 }
    )
  }

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Toast Notification Demo</h2>
      <div className="flex flex-wrap gap-4">
        <Button onClick={handleSuccess} className="bg-green-600 hover:bg-green-700">
          Show Success Toast
        </Button>
        <Button onClick={handleError} className="bg-red-600 hover:bg-red-700">
          Show Error Toast
        </Button>
        <Button onClick={handleWarning} className="bg-yellow-600 hover:bg-yellow-700">
          Show Warning Toast
        </Button>
        <Button onClick={handleInfo} className="bg-blue-600 hover:bg-blue-700">
          Show Info Toast
        </Button>
      </div>
    </div>
  )
}
