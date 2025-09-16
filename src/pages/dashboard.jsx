import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import DashboardContent from '@/components/dashboard/dashboard-content'

function DashboardPage() {
  return (
    <LayoutWrapper activeTab="dashboard">
      <DashboardContent />
    </LayoutWrapper>
  )
}

export default DashboardPage