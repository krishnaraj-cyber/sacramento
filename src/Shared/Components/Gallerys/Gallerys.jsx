import React from 'react'
// import apiurl from '../../services/apiendpoint/apiendpoint'
import apiurl from '../../../Shared/services/apiendpoint/apiendpoint'
import { Link } from 'react-router-dom'
import moment from 'moment-timezone'
function Gallerys({ gallery }) {
    return (
        <>
            <section className='max-w-[80rem] mx-auto px-5 my-10'>
                <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-2 gap-2 lg:gap-5 cursor-pointer'>
                    {gallery.map((item, index) => (
                        <Link to={`/gallery-view/${moment(item.Year).format('YYYY-MM-DD')}`} key={index} >
                            {console.log(moment(item.Year).format('YYYY'))}
                            <div className="relative group  hover:scale-105  duration-200  rounded-2xl ">
                                <img src={`${apiurl()}/${item.Image}`} alt="Event" className="w-full h-full object-cover rounded-2xl" />
                                <div className="absolute inset-0 bg-[#0571BC] bg-opacity-50 opacity-0   group-hover:opacity-100 transition-opacity duration-300 rounded-2xl">
                                    <div className="flex items-center justify-center h-full">
                                        <button className='md:text-4xl text-xl text-[#FFE134] concert-one-regular' >{item.Year.split('-')[0]}</button>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    )
}
export default Gallerys
