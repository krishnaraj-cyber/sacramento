import React, { useCallback, useEffect, useState } from 'react'
import CountdownTimer from '../Home/CountdownTimer'
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getallEvents } from '../../../Admin/shared/services/apievent/apievent';
function Events() {

  const [event, setEvent] = useState([]);

  const fetchEvent = useCallback(async () => {
    let isMounted = true;
    try {
      const response = await getallEvents();
      if (isMounted) { setEvent(response.resdata); }
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
      <section className="   max-w-[60rem] px-5  my-10  mx-auto   cursor-pointer">
        <div className=' bg-[#0571BC] rounded-lg border-4 py-2 border-[#FFD900] '>
          <Swiper
            spaceBetween={10}
            loop={true}
            slidesPerView={3}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}

            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,

              },
              1024: {
                slidesPerView: 1,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-nexx",
              prevEl: ".swiper-button-pree",
            }}
            style={{
              "--swiper-navigation-color": "#000",
              "--swiper-pagination-color": "#fff",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className="w-full max-w-5xl  py-10"  >
            {activeEvents && activeEvents.length > 0 && (
              <div className='  bg-[#0571BC] rounded-lg border-4 py-2  border-[#FFD900] '>
                {activeEvents.map((item, i) => (
                  <SwiperSlide>
                    <div key={i} className='grid md:grid-cols-2 items-center px-5  md:mb-5 mb-10'>
                      <div className='flex gap-4 items-center'>
                        <img src="/assets/images/Main/Calendar.png" alt="" />
                        <div>
                          <p className='concert-one-regular text-white md:text-2xl text-base '>UPCOMING EVENT</p>
                          <p className='concert-one-regular text-[#FFD900] md:text-xl text-sm'> {item.Eventname}</p>
                        </div>
                      </div>
                      <div className='md:ml-auto'>
                        <CountdownTimer date={item.Date} bgColor="#fff" textColor="#E91E31" texColor="#FFD900" justify={'justify-center'} />
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </div>
            )}
          </Swiper>
        </div>
      </section>
    </>
  )
}
export default Events
