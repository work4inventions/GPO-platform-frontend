import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import MarketplaceContent from '@/components/dashboard/marketplace-content'

function FavoritesPage() {
  return (
    <LayoutWrapper activeTab="favorites">
      <MarketplaceContent activeTab="favorites" />
    </LayoutWrapper>
  )
}

export default FavoritesPage
