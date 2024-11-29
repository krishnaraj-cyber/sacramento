import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import apiurl from '../../services/apiendpoint/apiendpoint';
function Event(props) {
    const { event, isLoading } = props;

    return (
        <>
            <section className=' max-w-[90rem] mx-auto  my-10 md:my-20 ' >
                <div>
                    <div className='md:space-y-10 space-y-5'>
                        <h2 className="text-2xl font-bold text-center text-[#8F000D] md:text-4xl  concert-one-regular">EVENTS</h2>
                        <section className="flex flex-col items-center relative  px-14 ">
                            {isLoading ? (   
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
                                    navigation={{
                                        nextEl: '.swiper-button-nextdeals',
                                        prevEl: '.swiper-button-prevdeals',
                                    }}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="w-full"   >
                                    {Array(4)
                                        .fill(0)
                                        .map((_, index) => (
                                            <SwiperSlide key={index} className="flex justify-center">
                                                <div className="animate-pulse relative group cursor-pointer">
                                                    <div className="w-full h-96 bg-gray-300 rounded-lg"></div>
                                                    <div className="absolute inset-0 bg-gray-300 opacity-70 rounded-lg"></div>

                                                </div>
                                            </SwiperSlide>
                                        ))}
                                </Swiper>
                            ) : (
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
                                        <SwiperSlide key={index} className="flex justify-center ">
                                            <div className="relative group cursor-pointer">
                                                <img src={`${apiurl()}/${sponsor.Image}`} className="w-full rounded-lg h-full object-cover" />
                                                <div className="absolute inset-0 bg-black rounded-lg bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <div className="flex items-center flex-wrap justify-center gap-4 h-full">
                                                        {sponsor.Poster_Type === "Registration Form" && (
                                                            <>
                                                                <Link to={`/register?id=${sponsor.id}&type=volunteer`}>
                                                                    <button className="text-[#E91E31] hover:bg-[#E91E31] hover:text-white duration-200 md:text-base text-sm bg-white px-4 py-2 concert-one-regular rounded">
                                                                        Volunteer
                                                                    </button>
                                                                </Link>
                                                                <Link to={`/register?id=${sponsor.id}`} ><button className="text-[#E91E31] hover:bg-[#E91E31] md:text-base text-sm hover:text-white duration-200 bg-white px-4 py-2 concert-one-regular rounded">Register Now</button></Link>
                                                            </>
                                                        )}
                                                        {sponsor.Poster_Type === "Donation" && (
                                                            <Link to={`/register?id=${sponsor.id}`}>
                                                                <button className="text-white bg-green-600 hover:bg-green-700 md:text-base text-sm px-4 py-2 rounded concert-one-regular">
                                                                    Donate
                                                                </button>
                                                            </Link>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                            <div className="absolute  right-0   top-1/2  rotate-90  cursor-pointer">
                                <img className=" swiper-button-nextdeals px-2 w-14" src="/assets/images/Hero-Section/Top.png" alt="Previous" />
                            </div>
                            <div className="absolute  left-0 top-1/2   rotate-90 cursor-pointer">
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
