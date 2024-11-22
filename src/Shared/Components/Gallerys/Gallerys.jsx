import React from 'react'
import apiurl from '../../../shared/services/apiendpoint/apiendpoint'
function Gallerys({ gallery }) {
    return (
        <>
            <section className='max-w-[80rem] mx-auto px-5 my-10'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-2 lg:gap-5 cursor-pointer'>
                    {gallery.map((item, index) => (
                        <div key={index} className="relative group  ">
                            <img src={`${apiurl()}/${item.Image}`} alt="Event" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-[#0571BC] bg-opacity-50 opacity-0 rounded-lg group-hover:opacity-100 transition-opacity duration-300">
                                <div className="flex items-center justify-center h-full">
                                    <button className='md:text-4xl text-xl text-[#FFE134] concert-one-regular' >{item.Year.split('-')[0]}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    )
}
export default Gallerys
