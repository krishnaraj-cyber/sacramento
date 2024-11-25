import React from 'react'
import apiurl from '../../../shared/services/apiendpoint/apiendpoint';
import AboutUs from '../../../Shared/Components/About/AboutUs'
import SponsorSwiper from '../SponsorSwiper/SponsorSwiper';

function Aboutt(props) {
    const { boardmem } = props;
    return (
        <>
            <section>
                <AboutUs title="BOARD MEMBERS" />
            </section>
            <section className='max-w-[70rem] mx-auto px-5'>
                <div className='border-b-4 border-b-[#E91E31]  md:text-lg text-sm bg-[#0571BC] md:p-5 p-3 text-white  my-10 rounded-lg space-y-5'>
                    <p className="text-outline-white text-[#E91E31] md:text-5xl text-2xl text-center concert-one-regular font-bold ">Trustees and Board of Directors</p>
                    <p className="text-justify">Sacramento Tamil Mandrum was founded in 1999. Since then STM has been growing gradually,
                        and very steadily through the support of our community. Our motive is to promote and preserve our
                        great Tamil culture, involve our younger generation in our cultural activities, encourage local talents,
                        and introduce them into our programs.</p>
                    <p className="text-[#FFD900]">The purpose or the purposes of Tamil Mandrum Board of Directors are:</p>
                    <div className='flex items-center gap-4'>
                        <div className='w-5 h-5 border-[#FFD900] border-4 '>
                        </div>
                        <p className="">To cultivate, promote, foster and develop the advancement of knowledge in Tamil language and literature.</p>
                    </div>
                    <div className='flex  items-center gap-4'>
                        <div className='w-5 h-5 border-[#FFD900] border-4 '>
                        </div>
                        <p className="">To promote fellowships and to provide, organize and participate in cultural and social functions.</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='w-5 h-5 border-[#FFD900] border-4 '>
                        </div>
                        <p className="">To work closely with other Tamil Mandrums to further the common interests.</p>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='w-5 h-5 border-[#FFD900] border-4 '>
                        </div>
                        <p className="">To cultivate, promote and foster the exchange of ideas and understanding between the people of Tamil and other cultures.</p>
                    </div>
                </div>
            </section>
            <section className='max-w-[90rem] mx-auto px-5 my-20'>
                <div className='grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 justify-center items-center  md:gap-10 gap-5  '>
                    {boardmem.map((item, index) => (
                        <div key={index} className="text-center w-full">
                            <img className='  md:w-72 border-2 border-[#0571BC] rounded-t-xl w-full ' src={`${apiurl()}/${item.Image}`} />
                            <div className='  flex flex-col justify-center items-center mx-2  h-24  rounded-bl-lg  rounded-br-lg bg-[#0571BC]'>
                                <p className="  md:text-base text-sm text-[#FFD900]"> {item.Name}</p>
                                <p className=" text-white  text-xs md:text-sm"> {item.Designation}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section>
                <SponsorSwiper />
            </section>
        </>
    )
}
export default Aboutt
