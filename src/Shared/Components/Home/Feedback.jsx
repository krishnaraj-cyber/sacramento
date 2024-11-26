import React from 'react'
function Feedback(props) {

    const { activeStatus, customInputRef, handleCustomAmountChange, handleInputChange, isModalOpen, formData, handleSubmit, customAmount, statuses, handleDonateNow, handleModalClose, setIsModalOpen, handleStatusClick, } = props;
    return (
        <>
            <section className="bg-[url('/assets/images/Feedback/Feedback.png')] bg-center bg-contain">
                <div className='max-w-[60rem] px-5 mx-auto py-10 pb-52 space-y-4 '>
                    <div>
                        <p className="text-center text-[#E91E31] md:text-4xl text-2xl   concert-one-regular font-bold">FEEDBACK</p>
                    </div>
                    <div className="space-y-5">
                        <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.target); const data = Object.fromEntries(formData.entries()); }}    >
                            <div className="grid md:grid-cols-3 gap-4">
                                <div>
                                    <label htmlFor="name" className="text-lg">Name *</label>
                                    <input id="name" name="name" className="w-full rounded-md p-2" type="text" required />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-lg">Email *</label>
                                    <input id="email" name="email" className="w-full rounded-md p-2" type="email" required />
                                </div>
                                <div>
                                    <label htmlFor="eventName" className="text-lg">Event Name *</label>
                                    <input id="eventName" name="eventName" className="w-full rounded-md p-2" type="text" required />
                                    <p className="text-sm mt-2 italic">Enter an event name (Example: Summer Picnic) or type General</p>
                                </div>
                            </div>
                            <div className="grid items-center md:grid-cols-8 grid-cols-1  ">
                                <div className="flex flex-col md:col-span-7 ">
                                    <label htmlFor="feedback" className="text-lg">Feedback</label>
                                    <input id="feedback" name="feedback" className=" p-2 rounded-md" />
                                </div>
                                <div className='md:ml-auto  md:col-span-1  text-center'>
                                    <button type="submit" className="bg-[#E91E31] hover:text-[#E91E31] mt-7 py-2 px-5    concert-one-regular hover:bg-white duration-200 text-white rounded-md"   >
                                        SEND
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section >
            <section className="px-5 lg:h-52 md:h-auto sm:h-auto fit h-[400px]">
                <div className="relative bottom-36 max-w-[58rem] bg-white border rounded-xl mx-auto">
                    <div className="flex items-center lg:flex-nowrap flex-wrap">
                        <img className="lg:w-96 w-full" src="/assets/images/Feedback/Coin.png" alt="" />
                        <div className="w-full md:space-y-10 space-y-5 lg:my-0 my-5">
                            <div className="flex justify-between items-center flex-wrap px-4">
                                <p className="concert-one-regular md:text-4xl text-lg text-[#0571BC] font-bold">DONATE</p>
                                <div className="flex border items-center rounded-md">
                                    <div className="bg-[#0571BC] p-1 px-3 md:text-5xl text-lg rounded-md text-white font-bold concert-one-regular">$</div>
                                    <div className="  text-[#0571BC] md:text-4xl text-lg text-center w-20 concert-one-regular">
                                        {activeStatus === 'Custom Amount' ? (
                                            <input ref={customInputRef} className=" w-20  focus:outline-none rounded-md text-center" value={customAmount} onChange={handleCustomAmountChange} />
                                        ) : (
                                            activeStatus.replace('$', '')
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:gap-0 gap-4 mb-4 justify-evenly flex-wrap overflow-x-auto md:overflow-visible scrollbar-hide">
                                {statuses.map((status) => (
                                    <button key={status} onClick={() => handleStatusClick(status)}
                                        className={`px-4 py-2 rounded-md whitespace-nowrap font-semibold hover:bg-[#0571BC] hover:text-white text-sm ${activeStatus === status ? 'bg-[#0571BC] text-white' : 'bg-[#FFE134]'}`} >
                                        {status}
                                    </button>
                                ))}
                            </div>
                            <div className="md:text-left text-center">
                                <button onClick={() => setIsModalOpen(true)} className="bg-[#0571BC] text-[#FFE134] md:ml-4 hover:bg-[#FFE134] hover:text-[#0571BC] duration-200 p-2 md:text-xl rounded-md concert-one-regular">
                                    DONATE NOW
                                </button>
                            </div>
                            {isModalOpen && (
                                <div className="fixed right-0 left-0 bottom-0 -top-20  bg-black bg-opacity-50 flex px-5 items-center justify-center z-50">
                                    <form onSubmit={handleSubmit} className="bg-white   rounded-lg    max-w-[60rem] bg-[url('/assets/images/Feedback/Coin.png')] bg-cover   text-white ">
                                        <div className='bg-black bg-opacity-50 p-6 rounded-lg'>
                                            <h2 className="text-xl font-bold text-white  mb-4">Confirm Donation</h2>
                                            <div className='flex gap-10 items-center '>
                                                <div className='my-5 space-y-5'>
                                                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required className='w-full border focus:outline-none p-2 text-black' placeholder='Name' />
                                                    <input type="text" id="email" name="email" value={formData.email} onChange={handleInputChange} required className='w-full border focus:outline-none p-2 text-black' placeholder='Email' />
                                                    <div className='text-end'>
                                                        Total :
                                                        <span className="font-bold ml-1">${activeStatus === 'Custom Amount' ? customAmount || '0' : activeStatus.replace('$', '')}</span>
                                                        <div className='flex gap-3 justify-end'>
                                                            <p className="">Hide Name</p>
                                                            <input type="checkbox" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-4">
                                                <button className="px-4 py-2 bg-red-400 rounded-md  md:text-base text-sm " onClick={() => setIsModalOpen(false)}>
                                                    Cancel
                                                </button>
                                                <button type="submit" className="px-4 py-2 bg-[#0571BC] md:text-base text-sm text-white rounded-md hover:bg-[#045a96]" onClick={() => { setIsModalOpen(false); }}   >
                                                    Make Your Donation
                                                </button>
                                            </div>

                                        </div>

                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Feedback
