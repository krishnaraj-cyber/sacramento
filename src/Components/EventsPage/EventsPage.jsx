import React from 'react'
import Events from '../../Shared/Components/Eventss/Events'
import AboutUs from '../../Shared/Components/About/AboutUs'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper'
import EventSwipe from '../../Shared/Components/EventSwipe/EventSwipe'
function EventsPage() {
  return (
    <>
      <AboutUs title="EVENTS" />
      <Events />
      <EventSwipe />
      <SponsorSwiper />
    </>
  )
}
export default EventsPage
