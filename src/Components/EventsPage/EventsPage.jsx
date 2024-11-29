import React, { useCallback, useEffect, useState } from 'react'
import Events from '../../Shared/Components/Eventss/Events'
import EventSwipe from '../../Shared/Components/EventSwipe/EventSwipe'
import { getallEvents } from '../../Admin/shared/services/apievent/apievent'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import AboutUs from '../../Shared/Components/About/AboutUs';
function EventsPage() {

  const [event, setEvent] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchEvent = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    try {
      const response = await getallEvents();
      if (isMounted) { setEvent(response.resdata); }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => { fetchEvent(); }, [fetchEvent]);

  return (
    <>
      <AboutUs title="EVENTS" />
      <Events event={event} isLoading={isLoading} />
      <EventSwipe isLoading={isLoading} event={event} />
      <SponsorSwiper />
    </>
  )
}
export default EventsPage
