import React from 'react'
import { Video } from '../../../assets/Json/VideoSwiper'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
function VideoSwiper() {

    return (
        <>
            <div className='  max-w-[78rem] mx-auto my-10 space-y-5 cursor-pointer '>
                <section className="flex flex-col items-center relative  px-10">
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        breakpoints={{
                            0: { slidesPerView: 1, },
                            768: { slidesPerView: 1, },
                            1024: { slidesPerView: 1, },
                        }}
                        navigation={{ nextEl: '.swiper-video-nextdeal', prevEl: '.swiper-video-prevdeal' }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className=" w-full   "  >
                        {Video.map((sponsor, index) => (
                            <SwiperSlide key={index} className="flex justify-center">
                                <video controls className=" w-full h-[600px] rounded-lg px-5" poster="/assets/images/Header/Logo (2).png" >
                                    <source src={sponsor.videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        className="absolute  right-0   top-[47%]   z-40 cursor-pointer"  >
                        <img className=" swiper-video-nextdeal px-2 w-14" src="/assets/images/Pagination/Next page.png" alt="Previous" />
                    </div>
                    <div
                        className="absolute  left-0 top-[47%]   z-40 cursor-pointer">
                        <img className=" swiper-video-prevdeal px-2 w-14" src="/assets/images/Pagination/Next page (1).png" alt="Next" />
                    </div>
                </section>
            </div>
        </>
    )
}
export default VideoSwiper
