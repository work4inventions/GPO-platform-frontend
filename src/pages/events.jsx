import React from 'react'
import LayoutWrapper from '@/components/layout/layout-wrapper'
import EventsContent from '@/components/dashboard/events-content'

function EventsPage() {
  return (
    <LayoutWrapper activeTab="events">
      <EventsContent />
    </LayoutWrapper>
  )
}

export default EventsPage
