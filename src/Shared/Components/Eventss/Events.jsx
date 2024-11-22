import React, { useCallback, useEffect, useState } from 'react'
import CountdownTimer from '../Home/CountdownTimer'
import { getallEvents } from '../../../Admin/shared/services/apievent/apievent';
function Events() {
    
  const [event, setEvent] = useState([]);

    const fetchEvent = useCallback(async () => {
        let isMounted = true;
        try {
          const response = await getallEvents();
          if (isMounted) { setEvent(response); }
        } catch (error) {
          console.error('Error fetching sponsors:', error);
        }
        return () => {
          isMounted = false;
        };
      }, []);
      useEffect(() => { fetchEvent(); }, [fetchEvent]);

      const activeEvents = event
      .filter(event => event.Status === "Active") 
      .map(event => ({
        id: event.id,
        Eventname: event.Eventname,
        Date: event.Date,
        Activities: event.Activities,
        Image: event.Image
      }));

    return (
        <>
            <section className='max-w-[60rem] mx-auto my-10 px-5'>
                {activeEvents && activeEvents.length > 0 && (
                    
                    <div className='  bg-[#0571BC] rounded-lg border-4 py-2 border-[#FFD900] '>
                    {activeEvents.map((item, i) => (
                    <div key={i} className='flex items-center flex-wrap justify-around'>
                    <div className='flex gap-4 items-center'>
                        <img src="/assets/images/Main/Calendar.png" alt="" />
                        <div>
                            <p className='concert-one-regular text-white md:text-2xl text-base '>UPCOMING EVENT</p>
                            <p className='concert-one-regular text-[#FFD900] md:text-3xl text-sm'> {item.Eventname}</p>
                        </div>
                    </div>
                    <div className=''>
                        <CountdownTimer date={item.Date} bgColor="#fff" textColor="#E91E31" texColor="#FFD900" justify={'justify-center'} />
                    </div>
                    </div>
                    ))}
                    </div>
                )}
            </section>
        </>
    )
}
export default Events
