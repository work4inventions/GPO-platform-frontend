import React, { useState } from 'react'
import DashboardLayout from '../layout/dashboard-layout'
import DashboardContent from './dashboard-content'
import MarketplaceContent from './marketplace-content'
import CommunityContent from './community-content'
import EventsContent from './events-content'
import SettingsContent from './settings-content'

// Tab content mapping
const tabContentMap = {
  dashboard: DashboardContent,
  marketplace: MarketplaceContent,
  vendors: MarketplaceContent,
  categories: MarketplaceContent,
  favorites: MarketplaceContent,
  community: CommunityContent,
  events: EventsContent,
  settings: SettingsContent,
}

export default function MainDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId)
  }

  // Get the appropriate content component
  const ContentComponent = tabContentMap[activeTab as keyof typeof tabContentMap] || DashboardContent

  return (
    <DashboardLayout
      activeTab={activeTab}
      onTabChange={handleTabChange}
      userName="Dr. Olivia"
      subscriptionInfo="Your subscription: Education Plan - renews Sept 28, 2025"
    >
      <ContentComponent activeTab={activeTab} />
    </DashboardLayout>
  )
}
