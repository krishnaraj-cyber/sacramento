import React, { useCallback, useEffect, useState } from 'react'
import { Sponsor } from '../../../assets/Json/Swiper'
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { getallSponsors } from '../../../Admin/shared/services/apisponsor/apisponsor';
function SponsorSwiper() {

    const [sponsors, setSponsors] = useState([]); 

const fetchSponsors = useCallback(async () => {
      let isMounted = true; 
      try {
        const response = await getallSponsors(); 
        console.log(response)
        if (isMounted) {  setSponsors(response);  }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
      return () => {
        isMounted = false; 
      };
}, []);
useEffect(() => { fetchSponsors();}, [fetchSponsors]);


    const mobilePreviousRef = useRef(null);
    const mobileNextStepRef = useRef(null);
    return (
        <>
            <div className='max-w-[78rem] mx-auto md:my-20 my-10 space-y-5'>
                <h2 className=" text-2xl md:text-3xl font-bold text-center text-red-600  concert-one-regular">OUR SPONSORS</h2>
                <section className="flex flex-col items-center relative  px-10">
                    <Swiper
                        slidesPerView={1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        navigation={{ nextEl: '.swiper-button-nextdeal', prevEl: '.swiper-button-prevdeal' }}
                        modules={[Pagination, Navigation, Autoplay]}
                        className=" w-full">
                        {sponsors.map((sponsor, index) => (
                            <SwiperSlide key={index} className="flex justify-center">
                                <div className='cursor-pointer'>
                                    <h3 className="text-xl font-semibold mb-2">{sponsor.tier}</h3>
                                    <div className="flex items-center space-x-4">
                                        <img src={`${apiurl()}/${sponsor.Image}`} className="bg-no-repeat" />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div
                        ref={mobileNextStepRef}
                        className="absolute  right-0   top-[47%]   z-40 cursor-pointer"  >
                        <img className=" swiper-button-nextdeal px-2 w-14" src="/assets/images/Pagination/Next page.png" alt="Previous" />
                    </div>
                    <div
                        ref={mobilePreviousRef}
                        className="absolute  left-0 top-[47%]   z-40 cursor-pointer">
                        <img className=" swiper-button-prevdeal px-2 w-14" src="/assets/images/Pagination/Next page (1).png" alt="Next" />
                    </div>
                </section>
            </div>
        </>
    )
}
export default SponsorSwiper
