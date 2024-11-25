import React from 'react'
import apiurl from '../../../shared/services/apiendpoint/apiendpoint'
function YouthForum(props) {
    const { forum } = props;
    return (
        <>
            <section className='max-w-[80rem] mx-auto px-5 my-10'>
                <div>
                    <div className='grid lg:grid-cols-5 md:grid-cols-3 justify-items-center items-center justify-self-center   grid-cols-2 gap-10' >
                        {forum && forum?.map((item, index) => (
                            <div key={index} className=" relative overflow-hidden rounded-xl shadow-lg bg-white group hover:bg-gradient-to-t hover:from-blue-700 hover:to-blue-300 transition-all duration-300 ease-out mx-auto">
                                <img src={`${apiurl()}/${item.Image}`} alt="Profile" className="w-full h-full object-cover opacity-80" />
                                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-blue-700 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
                                    <p className="text-white font-bold text-center">{item.Name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
export default YouthForum
