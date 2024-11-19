import React, { useCallback, useEffect, useState } from 'react'
import Events from '../../Shared/Components/Eventss/Events'
import EventSwipe from '../../Shared/Components/EventSwipe/EventSwipe'
import AboutUs from '../../shared/components/About/AboutUs'
import SponsorSwiper from '../../shared/components/SponsorSwiper/SponsorSwiper'
import { getallEvents } from '../../Admin/shared/services/apievent/apievent'
function EventsPage() {
  
  const [event, setEvent] = useState([]); 

  const fetchEvent = useCallback(async () => {
    let isMounted = true; 
    try {
      const response = await getallEvents(); 
      console.log(response)
      if (isMounted) {  setEvent(response);  }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    }
    return () => {
      isMounted = false; 
    };
}, []);
  useEffect(() => { fetchEvent();}, [fetchEvent]);

  return (
    <>
      <AboutUs title="EVENTS" />
      <Events  />
      <EventSwipe event={event} />
      <SponsorSwiper />
    </>
  )
}
export default EventsPage
