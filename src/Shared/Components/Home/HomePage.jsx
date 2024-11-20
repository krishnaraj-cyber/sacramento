import React from 'react'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { EventProgram } from '../../../assets/Json/Event'
import CountdownTimer from './CountdownTimer';
import apiurl from '../../../shared/services/apiendpoint/apiendpoint';

function HomePage(props) {
    const { prevRef, nextRef, mobileNextRef, sponsors , event} = props;


    const activeEvents = event
  .filter(event => event.Status === "Active") 
  .map(event => ({
    id: event.id,
    Eventname: event.Eventname,
    Date: event.Date,
    Activities: event.Activities,
    Image: event.Image
  }));

    console.log(activeEvents)

    return (
        <>
            <section className="bg-[url('/assets/images/Header/Hero-sec.png')] bg-cover bg-no-repeat lg:my-0 my-10  flex items-center justify-center    lg:h-[100vh]   w-full">
                <div className='mx-auto max-w-[100rem] lg:my-0 my-10 px-5' >
                    <div className='grid lg:grid-cols-4 grid-cols-1 gap-10 items-center'>
                        <div className=' space-y-6 lg:col-span-3'>


                        {activeEvents && activeEvents.length > 0 ? (
                            <div>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    loop={true}
                                    speed={1500}
                                    pagination={{ clickable: true, }}
                                    autoplay={{ delay: 3000, disableOnInteraction: false, }}
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
                                    navigation={{ nextEl: '.swiper-button', prevEl: '.swiper-button' }}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="w-full " >
                                     {activeEvents.map((item, index) => (
                                        <SwiperSlide>
                                            <div key={index} className="flex flex-wrap md:flex-nowrap  justify-center items-center gap-5 cursor-pointer pb-10">
                                                <img className='w-96 rounded-2xl border-4 border-[#0670bd]' src={`${apiurl()}/${item.Image}`} />
                                                <div className='md:space-y-5 space-y-3'>
                                                    <p className=" concert-one-regular md:text-2xl text-base text-white w-fit px-3 rounded-md bg-[#0470BC]">UPCOMING EVENT</p>
                                                    <p className="md:text-2xl text-lg text-[#E91E31] font-semibold">சாக்ரமெண்டோ தமிழ் மன்றம்</p>
                                                    <p className="text-[#0470BC] font-semibold text-xl">நடத்தும்</p>
                                                    <p className="  font-bold  text-[#0470BC] xl:text-5xl lg:text-3xl text-2xl  text-outline-yellow"> {item.Eventname}</p>
                                                    <p className="font-bold text-[#FFD900] md:text-2xl  text-base  bg-[#0470BC] w-fit md:p-2 p-1 rounded-md"> {item.Activities}</p>
                                                    <p className="concert-one-regular text-[#0470BC] text-xl">Registration Deadline: <span className='text-[#E91E31]'> {item.Date.split('T')[0]}</span></p>
                                                    <p className="concert-one-regular text-[#0470BC] text-xl">Date Duration:  </p>
                                                    <CountdownTimer date={item.Date} />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                            ) :(
                            <div>
                                <div className='text-[#5c0000] max-w-[1000px] text-justify'>
                                    <h1 className='text-xl lg:text-5xl font-bold py-2'>ABOUT US</h1>
                                    <p className='py-2'>Sacramento Tamil Mandrum has been serving the Tamil speaking Community of Greater Sacramento and surrounding areas for about 20 years successfully. Come and explore the world of rich Tamil heritage, culture and traditions along with us in this journey.</p>
                                    <p className='py-2'>We are a non-profit, non-religious and non-political organization devoted to supporting Tamil Culture in the Sacramento region. Our goals are to promote better understanding of Tamil Language, and enlighten the younger generation about Tamil culture. To aid this cause, Mandrum regularly organizes cultural events in the Greater Sacramento area and requesting the community for its support. </p>
                                    <p className='py-2'>The beauty of Tamil is kept vibrantly alive and active by Tamil Mandrum volunteers in Sacramento. You are never left alone. Your cultural heritage and the affinity towards your language always surrounds you, irrespective of the technology and the fast moving things around you.</p>
                                </div>
                            </div> 
                            ) }
                        </div>
                        <div className='lg:ml-auto '>
                            <h2 className="text-2xl font-bold text-center text-red-600 md:mb-5 archivo-black-regular">OUR SPONSORS</h2>
                            <section className="flex flex-col items-center relative py-7 xl:h-[615px] lg:h-[500px] cursor-pointer ">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    loop={true}
                                    autoplay={{ delay: 3000, disableOnInteraction: false, }}
                                    breakpoints={{
                                        0: { slidesPerView: 1, direction: 'horizontal', },
                                        768: { slidesPerView: 2, direction: 'horizontal', },
                                        1024: { slidesPerView: 3, direction: 'vertical', },
                                    }}
                                    navigation={{ nextEl: '.swiper-button-nextdeal', prevEl: '.swiper-button-prevdeal' }}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="w-full max-w-5xl " >
                                    {sponsors.map((sponsor, index) => (
                                        <SwiperSlide key={index} className="flex justify-center items-center">
                                            <div>
                                                {/* <div className='flex flex-col justify-center  '>
                                                    <div class="relative  ">
                                                        <img src="/assets/images/Check/TopDesign.png" alt="Image" className='ml-1' />
                                                        <div class="absolute  top-0  left-10  ">
                                                            Silver
                                                        </div>
                                                    </div>
                                                    <img src="/assets/images/Check/Checking...png" alt="" />
                                                </div> */}
                                                <div className="flex items-center space-x-4">
                                                    <img src={`${apiurl()}/${sponsor.Image}`} className="bg-no-repeat mx-auto" />
                                                </div>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                <div ref={prevRef} className="absolute lg:top-0 lg:left-1/2 lg:transform lg:-translate-x-1/2      -left-10   lg:rotate-0   -rotate-90 top-1/2    lg:-translate-y-1/2 z-10 cursor-pointer"  >
                                    <img className="swiper-button-prevdeal px-2" src="/assets/images/Hero-Section/Top.png" alt="Previous" />
                                </div>
                                <div ref={nextRef} className="absolute  lg:-bottom-4   lg:left-1/2 lg:transform  lg:block hidden lg:-translate-x-1/2  lg:-translate-y-1/2  z-10   -rotate-90  lg:rotate-0  cursor-pointer" >
                                    <img className="swiper-button-nextdeal px-2" src="/assets/images/Hero-Section/Bottom.png" alt="Next" />
                                </div>
                                <div ref={mobileNextRef} className="absolute    z-10  lg:hidden block  -right-10 top-1/2 -rotate-90  cursor-pointer" >
                                    <img className="swiper-button-nextdeal px-2" src="/assets/images/Hero-Section/Bottom.png" alt="Next" />
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomePage
