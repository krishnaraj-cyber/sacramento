import React from 'react'
function AboutUs({ title }) {
    return (
        <>
            <section className="bg-[url('/assets/images/About/About-Board.png')]   bg-no-repeat   bg-cover   flex items-center justify-center  h-[20vh]  mt-10  ">
                <div>
                    <div className='concert-one-regular text-white font-bold md:text-6xl text-2xl'>
                        {title}
                    </div>
                </div>
            </section>
        </>
    )
}
export default AboutUs
