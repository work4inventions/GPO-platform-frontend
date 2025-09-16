import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import SettingsContent from '@/components/dashboard/settings-content'

function SettingsPage() {
  return (
    <LayoutWrapper activeTab="settings">
      <SettingsContent />
    </LayoutWrapper>
  )
}

export default SettingsPage
