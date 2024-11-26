import React, { useCallback, useEffect, useState } from 'react'
import Events from '../../Shared/Components/Eventss/Events'
import EventSwipe from '../../Shared/Components/EventSwipe/EventSwipe'
import { getallEvents } from '../../Admin/shared/services/apievent/apievent'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import AboutUs from '../../Shared/Components/About/AboutUs';
function EventsPage() {
  
  const [event, setEvent] = useState([]); 

  const fetchEvent = useCallback(async () => {
    let isMounted = true; 
    try {
      const response = await getallEvents(); 
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
