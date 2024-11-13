import React from 'react'

function Feedback(props) {

    const { statuses, setActiveStatus, activeStatus } = props;

    return (
        <>
            <section className="bg-[url('/assets/images/Feedback/Feedback.png')] bg-center  mt-10     bg-contain">
                <div className='max-w-[90rem] px-5 mx-auto py-10 pb-56 '>
                    <div>
                        <p className="text-center text-[#E91E31] md:text-3xl text-base concert-one-regular font-bold">FEEDBACK</p>
                    </div>
                    <div className='space-y-5'>
                        <div className='grid md:grid-cols-3 gap-4'>
                            <div className=' '>
                                <label htmlFor="" className='text-lg'>Name *</label>
                                <input className='w-full rounded-md p-2' type=" text" />

                            </div>
                            <div>
                                <label htmlFor="" className='text-lg'>Email *</label>
                                <input className='w-full rounded-md p-2' type="text" />
                            </div>
                            <div>
                                <label htmlFor="" className='text-lg'>Event Name *</label>
                                <input className='w-full rounded-md p-2' type="text" />
                                <p className="text-sm mt-2 italic">Enter a event name (Example: Summer Picnic) or type General</p>
                            </div>
                        </div>
                        <div className='grid items-center md:grid-cols-8 md:gap-10  '>

                            <div className='flex flex-col  col-span-7'>
                                <label htmlFor=" " className='text-lg'>Feedback</label>
                                <input type="text" name="" id="" className='p-2 rounded-md' />
                            </div>
                            <button className='bg-[#E91E31] text-white py-2 mt-6 rounded-md'>
                                SEND
                            </button>
                        </div>
                    </div>
                </div>

            </section >
            <section className='px-5   lg:h-80  md:h-auto sm:h-auto h-[500px] '>
                <div className=' relative bottom-40  max-w-[88rem]  bg-white border rounded-xl mx-auto '>
                    <div className='flex items-center  lg:flex-nowrap  flex-wrap '>
                        <img className='lg:w-auto w-full' src="/assets/images/Feedback/Coin.png" alt="" />
                        <div className=' w-full md:space-y-10 space-y-5 lg:my-0 my-5'>
                            <div className='flex justify-between items-center flex-wrap px-11'>

                                <p className="concert-one-regular md:text-4xl text-lg text-[#0571BC] font-bold">DONATE</p>
                                <div className='flex border items-center  rounded-md'>
                                    <div className='bg-[#0571BC] p-1 px-3 md:text-4xl text-lg rounded-md '>
                                        $
                                    </div>
                                    <div className='px-4  text-[#0571BC] md:text-4xl text-lg concert-one-regular '>
                                        100
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 mb-4 justify-evenly flex-wrap overflow-x-auto md:overflow-visible scrollbar-hide">
                                {statuses.map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setActiveStatus(status)}
                                        className={`px-4 py-2 rounded-md  whitespace-nowrap font-semibold text-sm md:text-2xl ${activeStatus === status
                                            ? 'bg-[#0571BC] text-white'
                                            : 'bg-[#FFE134]  '
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                            <div className='md:text-left text-center'>
                                <button className='bg-[#0571BC] text-[#FFE134] md:ml-10  p-2 md:text-xl  rounded-md concert-one-regular'>
                                    DONATE NOW
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Feedback
