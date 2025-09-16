import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import CommunityContent from '@/components/dashboard/community-content'

function CommunityPage() {
  return (
    <LayoutWrapper activeTab="community">
      <CommunityContent />
    </LayoutWrapper>
  )
}

export default CommunityPage
