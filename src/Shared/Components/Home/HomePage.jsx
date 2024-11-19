import React from 'react'
import { Sponsor } from '../../../assets/Json/Swiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { EventProgram } from '../../../assets/Json/Event'
import CountdownTimer from './CountdownTimer';
function HomePage(props) {
    const { prevRef, nextRef, mobileNextRef } = props;
    return (
        <>
            <section className="bg-[url('/assets/images/Header/Hero-sec.png')] bg-cover bg-no-repeat lg:my-0 my-10  flex items-center justify-center    lg:h-[100vh]   w-full">
                <div className='mx-auto max-w-[100rem] lg:my-0 my-10 px-5' >
                    <div className='grid lg:grid-cols-4 grid-cols-1   gap-10 items-center'>
                        <div className=' space-y-6 lg:col-span-3  '>
                            <div>
                                {EventProgram.map((item, index) => (
                                    <div key={index} className="flex flex-wrap md:flex-nowrap  justify-center items-center gap-5">
                                        <img className='w-96' src={item.imgSrc} />
                                        <div className='md:space-y-5 space-y-3'>
                                            <p className=" concert-one-regular md:text-2xl text-base text-white w-fit px-3 rounded-md bg-[#0470BC]">UPCOMING EVENT</p>
                                            <p className="md:text-2xl text-lg text-[#E91E31] font-semibold">சாக்ரமெண்டோ தமிழ் மன்றம்</p>
                                            <p className="text-[#0470BC] font-semibold text-xl">நடத்தும்</p>
                                            <p className="  font-bold  text-[#0470BC] xl:text-5xl lg:text-3xl text-2xl  text-outline-yellow">முதலாம் ஆண்டு  விளையாட்டு போட்டி  </p>
                                            <p className="font-bold text-[#FFD900] md:text-2xl  text-base  bg-[#0470BC] w-fit md:p-2 p-1 rounded-md">GAMES-CARROM, CHESS <span className='text-white'> &</span> TABLE TENNIS</p>
                                            <p className="concert-one-regular text-[#0470BC] text-xl">Registration Deadline: <span className='text-[#E91E31]'> 23-11-24</span></p>
                                            <p className="concert-one-regular text-[#0470BC] text-xl">Date Duration:  </p>
                                            <CountdownTimer />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='lg:ml-auto'>
                            <h2 className="text-2xl font-bold text-center text-red-600 md:mb-5 archivo-black-regular">OUR SPONSORS</h2>
                            <section className="flex flex-col items-center relative py-7 xl:h-[615px] lg:h-[500px] cursor-pointer ">
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={10}
                                    loop={true}
                                    autoplay={{ delay: 3000, disableOnInteraction: false, }}
                                    breakpoints={{
                                        0: {
                                            slidesPerView: 1,
                                            direction: 'horizontal',
                                        },
                                        768: {
                                            slidesPerView: 2,
                                            direction: 'horizontal',
                                        },
                                        1024: {
                                            slidesPerView: 3,
                                            direction: 'vertical',
                                        },
                                    }}
                                    navigation={{ nextEl: '.swiper-button-nextdeal', prevEl: '.swiper-button-prevdeal' }}
                                    modules={[Pagination, Navigation, Autoplay]}
                                    className="w-full max-w-5xl" >
                                    {Sponsor.map((sponsor, index) => (
                                        <SwiperSlide key={index} className="flex justify-center">
                                            <div>
                                                <h3 className="text-xl font-semibold mb-2">{sponsor.tier}</h3>
                                                <div className="flex items-center space-x-4">
                                                    <img src={sponsor.imgSrc} className="bg-no-repeat" />
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
