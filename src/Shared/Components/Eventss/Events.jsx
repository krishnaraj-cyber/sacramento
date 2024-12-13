import React from 'react'
import CountdownTimer from '../Home/CountdownTimer'
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Link } from 'react-router-dom';
function Events(props) {
  const { event, isLoading } = props;
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
            speed={1000}
            loop={true}
            slidesPerView={3}
            autoplay={{ delay: 3000, disableOnInteraction: false, }}
            pagination={{ clickable: true, }}
            breakpoints={{
              0: { slidesPerView: 1, },
              768: { slidesPerView: 1,},
              1024: { slidesPerView: 1,},
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
            {isLoading ? (
              <div className="w-full flex gap-5">
                {Array(1).fill(0).map((_, index) => (
                    <SwiperSlide key={index}>
                      <div className="animate-pulse flex flex-col gap-4 w-full px-5">
                        <div className="bg-gray-300 h-20 rounded-md w-full"></div>
                      </div>
                    </SwiperSlide>
                ))}
              </div>
            ) : (
              activeEvents && activeEvents.length > 0 && (
                <div className='  bg-[#0571BC] rounded-lg border-4 py-2  border-[#FFD900] '>
                  {activeEvents.map((item, i) => (
                    <SwiperSlide>
                       <Link to={`/register?id=${item.id}`} >
                      <div key={i} className='grid md:grid-cols-2 items-center px-5  md:mb-5 mb-10'>
                        <div className='flex gap-4 items-center'>
                          <img src="/assets/images/Main/Calendar.png" alt="" />
                          <div>
                            <p className='concert-one-regular text-white md:text-2xl text-base '>UPCOMING EVENT</p>
                            <p className='concert-one-regular text-[#FFD900] md:text-xl text-sm'> {item.Eventname}{' '}{item.Date && `( ${item.Date.split('T')[0]} )`} </p>
                          </div>
                        </div>
                        <div className='md:ml-auto'>
                          <CountdownTimer date={item.Date} bgColor="#fff" textColor="#E91E31" texColor="#FFD900" justify={'justify-center'} />
                        </div>
                      </div>
                      </Link>
                    </SwiperSlide>
                  ))}
                </div>
              )
            )}
          </Swiper>
        </div>
      </section>
    </>
  )
}
export default Events
