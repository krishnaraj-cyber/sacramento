import React, { useCallback, useEffect, useState } from "react";
import { useRef } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import apiurl from "../../../shared/services/apiendpoint/apiendpoint";
import { getallSponsors } from "../../../Admin/shared/services/apisponsor/apisponsor";
function SponsorSwiper() {
  const [sponsors, setSponsors] = useState([]);

  const fetchSponsors = useCallback(async () => {
    let isMounted = true;
    try {
      const response = await getallSponsors();
      if (isMounted) {
        setSponsors(response);
      }
    } catch (error) {
      console.error("Error fetching sponsors:", error);
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    fetchSponsors();
  }, [fetchSponsors]);

  const mobilePreviousRef = useRef(null);
  const mobileNextStepRef = useRef(null);
  return (
    <>
      <div className="max-w-[80rem] px-5 lg:px-0 w-full  mx-auto md:my-20 my-10 space-y-5">
        <h2 className=" text-2xl md:text-3xl font-bold text-center text-red-600  concert-one-regular">
          OUR SPONSORS
        </h2>
        <section className="flex flex-col items-center relative  px-10 ">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2,
                spaceBetween:15,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween:20,
              },
            }}
            navigation={{
              nextEl: ".swiper-button-nextdeal",
              prevEl: ".swiper-button-prevdeal",
            }}
            modules={[Pagination, Navigation, Autoplay]}
            className=" w-full mx-auto "
          >
            {sponsors.map((sponsor, index) => (
              <SwiperSlide key={index} className="flex justify-center mx-auto">
                <div className="flex items-center justify-center">
                  <div className="mx-auto">
                    <div
                      className={`sponsor-clip-path text-black font-semibold px-10 w-40 text-center ${
                        sponsor.Category == "Gold"
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
              </SwiperSlide>
            ))}
            {sponsors.length < 4 &&
              sponsors.map((sponsor, index) => (
                <SwiperSlide key={index} className="flex justify-center">
                  <div className="flex items-center justify-center">
                    <div className="mx-auto">
                      <div
                        className={`sponsor-clip-path text-black font-semibold px-10 w-40 text-center ${
                          sponsor.Category == "Gold"
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
                </SwiperSlide>
              ))}
          </Swiper>
          <div
            ref={mobileNextStepRef}
            className="absolute  -right-5   top-[47%]   z-40 cursor-pointer"
          >
            <img
              className=" swiper-button-nextdeal px-2 w-14"
              src="/assets/images/Pagination/Next page.png"
              alt="Previous"
            />
          </div>
          <div
            ref={mobilePreviousRef}
            className="absolute  -left-5 top-[47%]   z-40 cursor-pointer"
          >
            <img
              className=" swiper-button-prevdeal px-2 w-14"
              src="/assets/images/Pagination/Next page (1).png"
              alt="Next"
            />
          </div>
        </section>
      </div>
    </>
  );
}
export default SponsorSwiper;
