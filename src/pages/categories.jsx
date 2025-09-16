import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import MarketplaceContent from '@/components/dashboard/marketplace-content'

function CategoriesPage() {
  return (
    <LayoutWrapper activeTab="categories">
      <MarketplaceContent activeTab="categories" />
    </LayoutWrapper>
  )
}

export default CategoriesPage
