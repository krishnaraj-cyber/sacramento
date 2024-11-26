import React, { useEffect, useState } from 'react'
import { Registers } from '../../../assets/Json/Register'
import RegistrationPage from '../../../Components/RegistrationPage';
import apiurl from '../../services/apiendpoint/apiendpoint';
import { useParams } from 'react-router-dom';

function Form(props) {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);

    useEffect(() => {
        const fetchEventDetails = async () => {
            const response = await fetch(`${apiurl()}/events/${eventId}`);
            const data = await response.json();
            setEventDetails(data);
        };

        fetchEventDetails();
    }, [eventId]);

    if (!eventDetails) return <div>Loading...</div>;
    const { activeSection, handleVolunteerSubmit, handleVolunteerChange, volunteerData, isLoading, event, eventName, eventActivity, eventDate, eventImag } = props;
    console.log(event)
    return (
        <>
            <div>
                {activeSection === 'register' && (
                    <section className='  relative  max-w-[90rem]   gap-10 md:my-20 my-10 px-5 mx-auto  '>
                        {isLoading && (
                            <div className="absolute inset-0   z-50 flex justify-center items-center">
                                <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
                            </div>
                        )}
                        <div className='  text-center items-center flex-wrap  justify-center flex md:gap-10'>
                            {event.map((sponsor, index) => (
                                <div className="mb-10 w-[790px] h-56   mx-auto rounded-lg shadow-lg flex justify-center items-center  bg-cover  bg-no-repeat  relative" style={{ backgroundImage: `url(${apiurl()}/${sponsor.Image})` }}  >
                                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg"></div>
                                    <div className="relative z-10 text-center">
                                        <div className="mb-5 md:text-2xl text-base concert-one-regular font-bold text-white">
                                            <p>{sponsor.Eventname}</p>
                                        </div>
                                        <div className="mb-5 md:text-2xl text-base concert-one-regular font-bold text-white">
                                            <p>{sponsor.Activities}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <section className='  space-y-5 '>
                            <div className=' '>
                                <h1 className='md:text-4xl text-2xl concert-one-regular  text-[#8F000D]'>Description</h1>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {Registers.map((sponsor, index) => (
                                    <div className="p-4 border border-gray-200 rounded-lg shadow-md" key={index}>
                                        <div className="flex items-center gap-2 mb-4">
                                            <p className="font-semibold text-lg">{index + 1}.</p>
                                            <h1 className="text-xl font-semibold">{sponsor.eventName}</h1>
                                        </div>
                                        <div className="flex mb-2 gap-2">
                                            <p className="font-semibold  ">Day & Date:</p>
                                            <p className='md:text-base text-sm'>{sponsor.date}</p>
                                        </div>
                                        <div className="flex mb-2 gap-2 ">
                                            <p className="font-semibold ">Venue:</p>
                                            <p className='md:text-base text-sm'>{sponsor.venue}</p>
                                        </div>
                                        <div className="flex mb-2 gap-2">
                                            <p className="font-semibold ">Fees:</p>
                                            <p className='md:text-base text-sm'>{sponsor.fees}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <p className="font-semibold  ">Prizes:</p>
                                            <p className='md:text-base text-sm'>{sponsor.prizes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section>
                            <RegistrationPage />
                        </section>
                    </section>
                )}
                {activeSection === 'volunteer' && (
                    <section className='max-w-[30rem] px-5  grid grid-cols-1 mx-auto my-10 '>
                        {eventImag && (
                            <div className="   w-full h-48 mx-auto rounded-t-lg shadow-lg flex justify-center items-center bg-cover  relative" style={{ backgroundImage: `url(${eventImag})` }}  >
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-t-lg"></div>
                            </div>
                        )}
                        <div className='border p-2 rounded-b-xl'>
                            <div>
                                <form action="" onSubmit={handleVolunteerSubmit} className='space-y-5 ' >
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className=''>Name *</label>
                                        <input type="text" className='p-2 border text-black border-gray-100 focus:outline-none' placeholder='Name' required name='name' onChange={handleVolunteerChange} value={volunteerData.name} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className=''>Email *</label>
                                        <input type="text" className='p-2 border border-gray-100 text-black focus:outline-none' placeholder='Email' required name='email' onChange={handleVolunteerChange} value={volunteerData.email} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className=''>phone *</label>
                                        <input type="text" className='p-2 border border-gray-100 text-black focus:outline-none' name="phone" required placeholder='Phone' value={volunteerData.phone} onChange={handleVolunteerChange} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className=''>Event * </label>
                                        <input type="text" className='p-2 border border-gray-100 text-black text-sm focus:outline-none' placeholder='Event' required readOnly name='event' onChange={handleVolunteerChange} value={volunteerData.event} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label htmlFor="" className=''>Comments</label>
                                        <textarea rows={4} className='p-2 border border-gray-100 text-black focus:outline-none' placeholder='Comments' required name='comments' onChange={handleVolunteerChange} value={volunteerData.comments} />
                                    </div>
                                    <div className='text-center'>
                                        <button type='submit' className='p-2 border   rounded-md  text-[#0571BC] duration-200 bg-white'>
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                )}
            </div >
        </>
    )
}
export default Form
