import React from 'react'
import { Registers } from '../../../assets/Json/Register'

function Form(props) {
    const { activeSection, handleRegisterSubmit, formData, handleRegisterChange, handleVolunteerSubmit, handleVolunteerChange, volunteerData, isLoading } = props;
    return (
        <>
            <div>
                {activeSection === 'register' && (
                    <section className='grid lg:grid-cols-3 relative  max-w-[90rem] grid-cols-1 gap-10 md:my-20 my-10 px-5 mx-auto  '>
                        {isLoading && (
                            <div className="absolute inset-0   z-50 flex justify-center items-center">
                                <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
                            </div>
                        )}
                        <section className='  space-y-5  col-span-2 '>
                            <div className=' '>
                                <h1 className='md:text-4xl text-2xl concert-one-regular  text-[#8F000D]'>Description</h1>
                            </div>
                            <div className='space-y-5'>
                                {Registers.map((sponsor, index) => (
                                    <div className='' key={index}>
                                        <div className='flex  gap-1 md:text-2xl text-lg mb-5'>
                                            <p className=""> {index + 1}.</p>
                                            <h1>{sponsor.eventName}</h1>
                                        </div>
                                        <div className='flex gap-3'>    <p className='font-bold'>    Day & Date :  </p>
                                            <p> {sponsor.date}</p>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>   venue : </p>
                                            <p>{sponsor.venue}</p>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>    Fees: </p>
                                            <p>{sponsor.fees}</p>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>    Prizes :  </p>
                                            <p>{sponsor.prizes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className='px-5 border p-4 rounded-xl bg-[#0571BC] col-span-1 text-white'>
                            <div>
                                <form onSubmit={handleRegisterSubmit}>
                                    <div className='space-y-5'>
                                        <div>
                                            <label htmlFor="firstName" className='md:text-lg'>First Name</label>
                                            <input type="text" name="firstName" className='w-full border p-2 focus:outline-none text-black rounded-md' placeholder='First Name' value={formData.firstName} onChange={handleRegisterChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="lastName" className='md:text-lg'>Last Name</label>
                                            <input type="text" name="lastName" className='w-full border p-2 focus:outline-none text-black rounded-md' placeholder='Last Name' value={formData.lastName} onChange={handleRegisterChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className='md:text-lg'>Email</label>
                                            <input type="text" name="email" className='w-full border p-2 focus:outline-none text-black rounded-md' placeholder='Email' value={formData.email} onChange={handleRegisterChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="phoneNumber" className='md:text-lg'>Phone Number</label>
                                            <input type="text" name="phoneNumber" className='w-full border p-2 focus:outline-none text-black rounded-md' placeholder='Phone Number' value={formData.phoneNumber} onChange={handleRegisterChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="event" className='md:text-lg'>Event *</label>
                                            <select id="event" name="event" className="w-full border p-2 focus:outline-none text-black rounded-md" value={formData.event} onChange={handleRegisterChange}  >
                                                <option value="Choose">Select Type</option>
                                                <option value="chess">Chess, Carrom & Painting</option>
                                                <option value="painting">Table Tennis (TT)</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label htmlFor="participantName" className='md:text-lg'>Team / Participant Name *</label>
                                            <input type="text" name="participantName" className='w-full border p-2 focus:outline-none text-black rounded-md' placeholder='Participant Name' value={formData.participantName} onChange={handleRegisterChange} />
                                        </div>
                                        <div>
                                            <label htmlFor="agree" className='md:text-lg'>Disclaimer</label>
                                            <div className='flex items-center gap-2'>
                                                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleRegisterChange} />
                                                <p>I Agree *</p>
                                            </div>
                                        </div>
                                        <div className='text-center col-span-2'>
                                            <button type='submit' className='p-2 border w-fit  bg-white text-black rounded-md'  >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </section>
                )}
                {activeSection === 'volunteer' && (
                    <section className='max-w-[30rem] mx-auto my-10 '>
                        <div>
                            <img src="/assets/images/Volunteer/cccc.jpg" className='w-full' alt="" />
                        </div>
                        <div className='border p-2 rounded-b-xl border-y-red-950'>
                            <div>
                                <form action="" onSubmit={handleVolunteerSubmit} className='space-y-5'>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className='text-[#0571BC]'>Name *</label>
                                        <input type="text" className='p-2 border border-gray-100 focus:outline-none' placeholder='Name' required name='name' onChange={handleVolunteerChange} value={volunteerData.name} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className='text-[#0571BC]'>Email *</label>
                                        <input type="text" className='p-2 border border-gray-100 focus:outline-none' placeholder='Email' required name='email' onChange={handleVolunteerChange} value={volunteerData.email} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className='text-[#0571BC]'>phone *</label>
                                        <input type="text" className='p-2 border border-gray-100 focus:outline-none' name="phone" required placeholder='Phone' value={volunteerData.phone} onChange={handleVolunteerChange} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className='text-[#0571BC]'>Event * </label>
                                        <input type="text" className='p-2 border border-gray-100 focus:outline-none' placeholder='Event' required readOnly name='event' onChange={handleVolunteerChange} value={volunteerData.event} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className='text-[#0571BC]'>Comments</label>
                                        <textarea rows={4} className='p-2 border border-gray-100 focus:outline-none' placeholder='Comments' required name='comments' onChange={handleVolunteerChange} value={volunteerData.comments} />
                                    </div>
                                    <div className='text-center'>
                                        <button type='submit' className='p-2 border text-white rounded-md hover:bg-white hover:text-[#0571BC] duration-200 bg-[#0571BC]'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                )}
            </div>
        </>
    )
}
export default Form
