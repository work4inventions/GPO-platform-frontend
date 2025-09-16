import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import Vendors from '@/components/dashboard/vendors'

function VendorsPage() {
  return (
    <LayoutWrapper activeTab="vendors">
      <Vendors />
    </LayoutWrapper>
  )
}

export default VendorsPage
