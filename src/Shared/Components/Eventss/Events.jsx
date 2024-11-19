import React from 'react'
import CountdownTimer from '../../../shared/components/Home/CountdownTimer'
function Events() {
    return (
        <>
            <section className='max-w-[60rem] mx-auto my-10 px-5'>
                <div className='  bg-[#0571BC] rounded-lg border-4 py-2 border-[#FFD900] flex items-center flex-wrap justify-around'>
                    <div className='flex gap-4 items-center'>
                        <img src="/assets/images/Main/Calendar.png" alt="" />
                        <div>
                            <p className='concert-one-regular text-white md:text-2xl text-base '>UPCOMING EVENT</p>
                            <p className='concert-one-regular text-[#FFD900] md:text-3xl text-sm'>CHRISTMAS CELEBRATION</p>
                        </div>
                    </div>
                    <div>
                        <CountdownTimer bgColor="#fff" textColor="#E91E31" texColor="#FFD900" />
                    </div>
                </div>
            </section>
        </>
    )
}
export default Events
