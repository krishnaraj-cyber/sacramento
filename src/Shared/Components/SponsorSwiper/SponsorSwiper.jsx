import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getSponsorByStatus } from "../../../Admin/shared/services/apisponsor/apisponsor";
import apiurl from "../../services/apiendpoint/apiendpoint";
function SponsorSwiper() {
  const [sponsors, setSponsors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  let isMounted = true;
  
  const fetchSponsors = useCallback(async () => {
    setIsLoading(true);  
      const response = await getSponsorByStatus(); 
        setSponsors(response.resdata);   
        setIsLoading(false);  
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);
  return (
    <>
      <div className="max-w-[80rem] px-5 w-full 2xl:px-0  mx-auto md:my-20 my-10 space-y-5">
        <h2 className=" text-2xl md:text-4xl font-bold text-center text-red-600  concert-one-regular">
          OUR SPONSORS
        </h2>
        <section className="flex flex-col items-center relative  px-10  ">
          {isLoading ? (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                768: { slidesPerView: 2, spaceBetween: 20, },
                1024: { slidesPerView: 3, spaceBetween: 20, },
              }}
              autoplay={{ delay: 3000, disableOnInteraction: false, }}
              modules={[Pagination, Navigation, Autoplay]} className="w-full mx-auto"  >
              {Array(3).fill(0).map((_, index) => (
                  <SwiperSlide key={index} className="animate-pulse flex flex-col">
                    <div className="sponsor-clip-path w-40 h-5 bg-gray-400"></div>
                    <div className="w-96 h-44 bg-gray-300"></div>
                  </SwiperSlide>
                ))}
            </Swiper>
          ) : (
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              speed={4000}
              loop={true}
              autoplay={{ delay: 4000, disableOnInteraction: false, }}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 10, },
                768: { slidesPerView: 2, spaceBetween: 15, },
                1024: { slidesPerView: 3, spaceBetween: 20, },
              }}
              navigation={{
                nextEl: ".swiper-button-nextdeal",
                prevEl: ".swiper-button-prevdeal",
              }}
              modules={[Pagination, Navigation, Autoplay]}
              className=" w-full mx-auto "
            >
              {sponsors?.map((sponsor, index) => (
                <SwiperSlide key={index} className="flex justify-center cursor-pointer mx-auto">
                  <a href={sponsor.URL} target="_blank" rel="noopener noreferrer">
                  <div className="flex items-center justify-center">
                    <div className="mx-auto">
                      <div
                        className={`sponsor-clip-path text-black font-semibold px-10 w-40 text-center ${sponsor.Category == "Gold"
                          ? "bg-[#d9a31c] "
                          : sponsor.Category == "Silver"
                            ? "bg-[#d9d9d9]"
                            : "bg-[#e8b692]"
                          }`}  >
                        {sponsor.Category}
                      </div>
                      <img
                        src={`${apiurl()}/${sponsor.Image}`}
                        className="bg-no-repeat w-full   mx-auto"
                        alt={`Sponsor ${index + 1}`}
                      />
                    </div>
                  </div>
                  </a>
                </SwiperSlide>
              ))}
              {sponsors?.length < 4 &&
                sponsors?.map((sponsor, index) => (
                  <SwiperSlide key={index} className="flex justify-center">
                    <a href={sponsor.URL} target="_blank" rel="noopener noreferrer">
                    <div className="flex items-center justify-center">
                      <div className="mx-auto">
                        <div
                          className={`sponsor-clip-path text-black font-semibold px-10 w-40 text-center ${sponsor.Category == "Gold"
                            ? "bg-[#d9a31c] "
                            : sponsor.Category == "Silver"
                              ? "bg-[#d9d9d9]"
                              : "bg-[#e8b692]"
                            }`}
                        >
                          {sponsor.Category}
                        </div>
                        <img
                          src={`${apiurl()}/${sponsor.Image}`}
                          className="bg-no-repeat mx-auto"
                          alt={`Sponsor ${index + 1}`}
                        />
                      </div>
                    </div>
                    </a>
                  </SwiperSlide>
                ))}
            </Swiper>
          )}
          <div className="absolute  -right-5   top-[47%]   z-40 cursor-pointer" >
            <img className=" swiper-button-nextdeal px-2 w-14" src="/assets/images/Pagination/Next page.png" alt="Previous" />
          </div>
          <div
            className="absolute  -left-5 top-[47%]   z-40 cursor-pointer" >
            <img className=" swiper-button-prevdeal px-2 w-14" src="/assets/images/Pagination/Next page (1).png" alt="Next" />
          </div>
        </section>
      </div>
    </>
  );
}
export default SponsorSwiper;
