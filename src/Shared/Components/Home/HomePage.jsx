import React from "react";
import "swiper/css";
import 'swiper/css/autoplay';
import "swiper/css/navigation";
import "swiper/css/pagination";
import 'swiper/swiper-bundle.css';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import CountdownTimer from "./CountdownTimer";
import apiurl from "../../services/apiendpoint/apiendpoint";
import { Link } from "react-router-dom";

function HomePage(props) {
  const { sponsors, event, isLoading } = props;
  return (
    <>
      <section className="  bg-[url('/assets/images/Hero-Section/secc.png')] bg-cover w-full bg-no-repeat lg:my-0 my-10 flex items-center justify-center min-h-[100vh]">
        <div className=" max-w-[107rem]  lg:my-0 my-10 lg:ml-8  px-5">
          <div className="grid lg:grid-cols-7 grid-cols-1 md:gap-10 items-center">
            <div className="space-y-6 lg:col-span-5 max-w-[90rem]">
              {isLoading ? (
                <div className="">
                  <div className="grid grid-cols-1 gap-6">
                    {Array(1)
                      .fill(0)
                      ?.map((_, index) => (
                        <div key={index} className="flex flex-wrap md:flex-nowrap items-center gap-5 pb-10 animate-pulse">
                          <div className="w-96 h-96 rounded-2xl bg-gray-300"></div>
                          <div className="flex flex-col space-y-3">
                            <div className=" w-40 h-10 bg-gray-300 rounded"></div>
                            <div className=" w-64 h-10  bg-gray-300 rounded"></div>
                            <div className="  w-40 h-10 bg-gray-300 rounded"></div>
                            <div className=" w-80 h-10  bg-gray-300 rounded"></div>
                            <div className="  w-64 h-10 bg-gray-300 rounded"></div>
                            <div className="  w-40 h-10 bg-gray-300 rounded"></div>
                            <div className=" w-56 h-10 bg-gray-300 rounded"></div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              ) : event && event.length > 0 ? (
                <div className="polygon-clip">
                  <Swiper
                    slidesPerView={1}
                    loop={true}
                    speed={1500}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }}
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
                    modules={[Pagination, Navigation, Autoplay]} className="w-full" >
                    {event?.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="flex flex-wrap md:flex-nowrap md:justify-start justify-center  items-center gap-5 cursor-default pb-10">
                          <Link to={`/register?id=${item.id}`} >
                          <img className="rounded-2xl border-4 min-w-[350px] w-[350px] lg:w-[400px] object-contain border-[#0670bd]" src={`${apiurl()}/${item.Image}`} alt={item.Eventname} />
                          </Link>
                          <div className="md:space-y-5 space-y-3  ">
                            <p className="concert-one-regular md:text-2xl text-base text-white w-fit px-3 rounded-md bg-[#0470BC]">
                              UPCOMING EVENT
                            </p>
                            <p className="md:text-2xl text-lg text-[#E91E31] font-semibold">சாக்ரமெண்டோ தமிழ் மன்றம்</p>
                            <p className="text-[#0470BC] font-semibold text-xl">நடத்தும்</p>
                            <p className="font-bold text-[#0470BC] xl:text-5xl lg:text-3xl text-2xl text-outline-yellow">
                              {item.Eventname}
                            </p>
                            <p className="font-bold text-[#FFD900] md:text-2xl text-base bg-[#0470BC] w-fit md:p-2 p-1 rounded-md">
                              {item.Activities}
                            </p>
                            {item.Poster_Type != 'Donation' &&
                            <p className="concert-one-regular text-[#0470BC] text-xl">
                              Registration Deadline:{' '}
                              <span className="text-[#E91E31] md:text-base text-sm">{item.Date.split('T')[0]}</span>
                            </p> }
                            <p className="concert-one-regular text-[#0470BC] text-xl">Date Duration:</p>
                            <div className=" flex md:justify-start justify-center">
                              <CountdownTimer date={item.Date} />
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              ) : (
                <div className="text-[#5c0000] max-w-[1000px] text-justify">
                  <h1 className="  md:text-4xl text-2xl font-bold py-2">ABOUT US</h1>
                  <p style={{ lineHeight: '1.6' }} className="py-2 md:text-xl leading-10">
                    Sacramento Tamil Mandrum has been serving the Tamil-speaking Community of Greater Sacramento and surrounding
                    areas for about 20 years successfully. Come and explore the world of rich Tamil heritage, culture and
                    traditions along with us in this journey.
                  </p>
                  <p style={{ lineHeight: '1.6' }} className="py-2  md:text-xl ">
                    We are a non-profit, non-religious and non-political organization devoted to supporting Tamil Culture in the
                    Sacramento region. Our goals are to promote better understanding of Tamil Language, and enlighten the younger
                    generation about Tamil culture. To aid this cause, Mandrum regularly organizes cultural events in the Greater
                    Sacramento area and requesting the community for its support.
                  </p>
                  <p style={{ lineHeight: '1.6' }} className="py-2  md:text-xl  ">
                    The beauty of Tamil is kept vibrantly alive and active by Tamil Mandrum volunteers in Sacramento. You are never
                    left alone. Your cultural heritage and the affinity towards your language always surrounds you, irrespective of
                    the technology and the fast moving things around you.
                  </p>
                </div>
              )}
            </div>
            <div className="col-span-2 md:space-y-7  md:mt-0 mt-10 ">
              <h2 className="md:text-2xl  text-xl  font-bold  text-center  text-[#E91E31]  archivo-black-regular">
                OUR SPONSORS
              </h2>
              <section className="flex flex-col items-center relative  py-5  px-5  2xl:h-[735px]  xl:h-[600px] lg:h-[600px] cursor-pointer">
                {isLoading ? (
                  <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
                    loop={true}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        direction: "horizontal"
                      },
                      768: {
                        slidesPerView: 2,
                        direction: "horizontal"
                      },
                      1024: {
                        slidesPerView: 3,
                        direction: "vertical"
                      },
                    }}
                    autoplay={{
                      delay: 3000,
                      disableOnInteraction: false,
                    }}
                    modules={[Pagination, Navigation, Autoplay]} className="w-full mx-auto"  >
                    {Array(3)
                      .fill(0)
                      ?.map((_, index) => (
                        <SwiperSlide key={index} className="animate-pulse flex flex-col justify-center items-center">
                          <div className="grid   lg:grid-cols-1 gap-6 w-full">
                            <div key={index} className="animate-pulse flex flex-col  justify-center    "  >
                              <div className="sponsor-clip-path w-40 h-5 bg-gray-300  flex justify-start"></div>
                              <div className="w-96 h-44 bg-gray-300  "></div>
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                ) : (
                  <Swiper
                    spaceBetween={10}
                    loop={true}
                    slidesPerView={3}
                    autoplay={{ delay: 3000, disableOnInteraction: false, reverseDirection: true }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                        direction: "horizontal"
                      },
                      768: {
                        slidesPerView: 2,
                        direction: "horizontal"
                      },
                      1024: {
                        slidesPerView: 3,
                        direction: "vertical"
                      },
                    }}
                    navigation={{
                      nextEl: ".swiper-button-nexx",
                      prevEl: ".swiper-button-pree",
                    }}
                    modules={[Pagination, Navigation, Autoplay]}
                    className="w-full max-w-5xl"  >
                    {sponsors?.map((sponsor, index) => (
                      <SwiperSlide key={index} className="flex justify-center items-center mx-auto "  >
                        <div className="flex items-center justify-center">
                          <div className="mx-auto">
                            <div
                              className={`sponsor-clip-path text-black font-semibold px-10 w-40 text-center ${sponsor.Category == "Gold"
                                ? "bg-[#d9a31c] "
                                : sponsor.Category == "Silver"
                                  ? "bg-[#d9d9d9]"
                                  : "bg-[#e8b692]"
                                }`}   >
                              {sponsor.Category}
                            </div>
                            <img
                              src={`${apiurl()}/${sponsor.Image}`}
                              className="bg-no-repeat mx-auto "
                              alt={`Duplicate Sponsor ${index + 1}`}
                            />
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                    {sponsors?.length < 4 &&
                      sponsors?.map((sponsor, index) => (
                        <SwiperSlide key={`duplicate-${index}`} className="flex justify-center items-center"  >
                          <div className="flex items-center justify-center">
                            <div className="mx-auto">
                              <div
                                className={`sponsor-clip-path text-black font-semibold px-10  w-40 text-center ${sponsor.Category == "Gold"
                                  ? "bg-[#d9a31c] "
                                  : sponsor.Category == "Silver"
                                    ? "bg-[#d9d9d9]"
                                    : "bg-[#e8b692]"
                                  }`} >
                                {sponsor.Category}
                              </div>
                              <img
                                src={`${apiurl()}/${sponsor.Image}`}
                                className="bg-no-repeat mx-auto"
                                alt={`Duplicate Sponsor ${index + 1}`}
                              />
                            </div>
                          </div>
                        </SwiperSlide>
                      ))}
                  </Swiper>
                )}
                <div className="swiper-button-pree absolute z-30 -left-5 top-1/2 translate-y-1/2 -rotate-90 lg:-top-3 lg:left-1/2 lg:-translate-x-1/2 lg:rotate-0">
                  <img className="px-2" src="/assets/images/Hero-Section/Top.png" alt="Previous" />
                </div>
                <div className="swiper-button-nexx absolute z-30 -right-5 bottom-1/2 translate-y-[150%] -rotate-90 lg:bottom-3 lg:right-1/2 lg:translate-x-1/2 lg:rotate-0">
                  <img className="px-2" src="/assets/images/Hero-Section/Bottom.png" alt="Next" />
                </div>
              </section>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}
export default HomePage;
