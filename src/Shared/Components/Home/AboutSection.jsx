import React from 'react'
import { Link } from 'react-router-dom'
import apiurl from '../../../Shared/services/apiendpoint/apiendpoint';
function AboutSection(props) {
    const { boardmem } = props;
    return (
        <>
            <section className="bg-[url('/assets/images/Main/Main-section.png')]   space-y-20   md:py-20 md:pt-0  lg:pt-20 md:mb-0     w-full">
                <div className='max-w-[60rem] px-5 mx-auto space-y-7 md:text-base text-sm'>
                    <div>
                        <p className=" text-2xl  concert-one-regular text-center  md:text-4xl text-[#E91E31]">WHAT WE DO</p>
                    </div>
                    <div className='grid md:grid-cols-2  grid-cols-2 gap-3 md:text-base vietnam  text-sm'>
                        <div className='bg-[#E91E31] text-center p-2 md:px-10 text-white font-semibold rounded-tl-3xl rounded-bl-3xl '>
                            <p className="">Serving</p>
                            <p className=""> Sacramento Tamils</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tr-3xl rounded-br-3xl '>
                            <p className=""> Hosting discussions </p>
                            <p className=""> on Tamil topics</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tl-3xl rounded-bl-3xl '>
                            <p className=""> Promoting Tamil </p>
                            <p className="">
                                language and culture</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tr-3xl rounded-br-3xl '>
                            <p className="">  Promoting</p>
                            <p className="">Tamil music and arts</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tl-3xl rounded-bl-3xl '>
                            <p className="">  Sharing Tamil </p>
                            <p className=""> educational resources</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tr-3xl rounded-br-3xl '>
                            <p className=""> Ensuring</p>
                            <p className="">religious neutrality</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tl-3xl rounded-bl-3xl '>
                            <p className="">   Organizing </p>
                            <p className="">Tamil cultural events</p>
                        </div>
                        <div className='bg-[#E91E31] text-center p-2 md:px-14 text-white font-semibold rounded-tr-3xl rounded-br-3xl '>
                            <p className="">  Offering</p>
                            <p className="">Moral Support</p>
                        </div>
                    </div>
                </div>
                <div className=' max-w-[60rem]   mx-auto px-5  '>
                    <div className='bg-[#0571BC] space-y-6 rounded-2xl p-5 '>
                        <p className="text-[#FFE134] text-center md:text-4xl text-2xl concert-one-regular" >BOARD MEMBERS</p>
                        <div className='flex justify-evenly flex-wrap gap-6 text-center'>
                            {boardmem.slice(0, 3).map((item, index) => (
                                <div key={index} className="      ">
                                    <img className='  mx-auto border-2 rounded-tr-xl rounded-tl-xl w-60' src={`${apiurl()}/${item.Image}`} />
                                    <div className='border   mx-3 md:text-base text-sm  rounded-bl-lg rounded-br-lg bg-[#FFE134]'>
                                        <p className="text-[#E91E31] md:text-lg text-base baumans-regular "> {item.Name}</p>
                                        <p className="vietnam text-sm"> {item.Designation}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div>
                            <div className='text-center'>
                                <Link to="/board-members" className=' concert-one-regular cursor-pointer  text-[#E91E31] rounded-lg px-3 hover:bg-[#E91E31] hover:text-white duration-200 bg-white p-2 w-fit mx-auto'>
                                    VIEW ALL
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default AboutSection
