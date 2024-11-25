import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import apiurl from '../../../shared/services/apiendpoint/apiendpoint';
import { Link } from 'react-router-dom';
function Event(props) {
    const {  event } = props;
    return (
        <>
            <section className=' max-w-[90rem] mx-auto  my-10 md:my-20 ' >
                <div>
                    <div className='md:space-y-10 space-y-5'>
                        <h2 className="text-2xl font-bold text-center text-[#8F000D] md:text-4xl   concert-one-regular">EVENTS</h2>
                        <section className="flex flex-col items-center relative  px-14 ">
                            <Swiper
                                slidesPerView={1}
                                spaceBetween={30}
                                loop={true}
                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,
                                    },
                                    768: {
                                        slidesPerView: 2,
                                    },
                                    1024: {
                                        slidesPerView: 4,
                                    },
                                }}
                                navigation={{ nextEl: '.swiper-button-nextdeals', prevEl: '.swiper-button-prevdeals' }} modules={[Pagination, Navigation, Autoplay]} className="w-full "  >
                                {event.map((sponsor, index) => (
                                    <SwiperSlide key={index} className="flex justify-center">
                                        <div className="relative group cursor-pointer">
                                            <img src={`${apiurl()}/${sponsor.Image}`} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="flex items-center justify-center h-full">
                                                    <Link to='/events'><button className="text-[#E91E31] hover:bg-[#E91E31] hover:text-white duration-200 bg-white px-4 py-2 concert-one-regular rounded">View all</button></Link>
                                                </div>
                                            </div>
                                        </div>

                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            <div
                             
                                className="absolute  right-0   top-1/2  rotate-90  cursor-pointer"  >
                                <img className=" swiper-button-nextdeals px-2 w-14" src="/assets/images/Hero-Section/Top.png" alt="Previous" />
                            </div>
                            <div
                                
                                className="absolute  left-0 top-1/2   rotate-90 cursor-pointer">
                                <img className=" swiper-button-prevdeals px-2 w-14" src="/assets/images/Hero-Section/Bottom.png" alt="Next" />
                            </div>
                        </section>
                    </div>
                </div>
                <div id="scrfeed_backsec">

                </div>
            </section>

        </>
    )
}
export default Event
