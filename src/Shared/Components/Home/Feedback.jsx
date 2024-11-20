import React from 'react'
function Feedback(props) {
    const { activeStatus, customInputRef, handleCustomAmountChange, customAmount, statuses, handleStatusClick, } = props;
    return (
        <>
            <section className="bg-[url('/assets/images/Feedback/Feedback.png')] bg-center bg-contain">
                <div className='max-w-[60rem] px-5 mx-auto py-10 pb-52 space-y-4 '>
                    <div>
                        <p className="text-center text-[#E91E31] md:text-4xl text-2xl   concert-one-regular font-bold">FEEDBACK</p>
                    </div>
                    <div className="space-y-5">
                        <form onSubmit={(e) => { e.preventDefault(); const formData = new FormData(e.target); const data = Object.fromEntries(formData.entries()); console.log(data); }}    >
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
                            <div className="grid items-center md:grid-cols-8 md:gap-10">
                                <div className="flex flex-col col-span-7">
                                    <label htmlFor="feedback" className="text-lg">Feedback</label>
                                    <input id="feedback" name="feedback" className=" p-2 rounded-md" />
                                </div>
                                <button type="submit" className="bg-[#E91E31] hover:text-[#E91E31] py-2 px-3 mt-7 concert-one-regular hover:bg-white duration-200 text-white rounded-md"   >
                                    SEND
                                </button>
                            </div>
                        </form>
                    </div>

                </div>
            </section >
            <section className="px-5 lg:h-52 md:h-auto sm:h-auto h-[400px]">
                <div className="relative bottom-36 max-w-[58rem] bg-white border rounded-xl mx-auto">
                    <div className="flex items-center lg:flex-nowrap flex-wrap">
                        <img className="lg:w-96 w-full" src="/assets/images/Feedback/Coin.png" alt="" />
                        <div className="w-full md:space-y-10 space-y-5 lg:my-0 my-5">
                            <div className="flex justify-between items-center flex-wrap px-4">
                                <p className="concert-one-regular md:text-4xl text-lg text-[#0571BC] font-bold">DONATE</p>
                                <div className="flex border items-center rounded-md">
                                    <div className="bg-[#0571BC] p-1 px-3 md:text-4xl text-lg rounded-md">$</div>
                                    <div className="  text-[#0571BC] md:text-4xl text-lg text-center w-20 concert-one-regular">
                                        {activeStatus === 'Custom Amount' ? (
                                            <input ref={customInputRef} className=" w-20  focus:outline-none rounded-md text-center"
                                                value={customAmount}
                                                onChange={handleCustomAmountChange}
                                            />
                                        ) : (
                                            activeStatus.replace('$', '')
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex lg:gap-0 gap-4 mb-4 justify-evenly flex-wrap overflow-x-auto md:overflow-visible scrollbar-hide">
                                {statuses.map((status) => (
                                    <button key={status} onClick={() => handleStatusClick(status)}
                                        className={`px-4 py-2 rounded-md whitespace-nowrap font-semibold text-sm ${activeStatus === status ? 'bg-[#0571BC] text-white' : 'bg-[#FFE134]'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                            <div className="md:text-left text-center">
                                <button className="bg-[#0571BC] text-[#FFE134] md:ml-4 hover:bg-[#FFE134] hover:text-[#0571BC] duration-200 p-2 md:text-xl rounded-md concert-one-regular">
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
