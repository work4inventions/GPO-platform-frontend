import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import ProfileContent from '@/components/dashboard/profile-content'

function ProfilePage() {
  return (
    <LayoutWrapper activeTab="profile">
      <ProfileContent />
    </LayoutWrapper>
  )
}

export default ProfilePage
