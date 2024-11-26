import React, { useEffect, useState } from 'react'
import { Registers } from '../../../assets/Json/Register'
import { useLocation, useNavigate } from 'react-router-dom';

function Form(props) {
    const location = useLocation();
    const [activeSection, setActiveSection] = useState('register');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        event: '',
        participantName: '',
        agree: false,
    });
    const [volunteerData, setVolunteerData] = useState({
        name: '',
        email: '',
        phone: '',
        event: '',
        comments: '',
    });
    useEffect(() => {
        if (location.state && location.state.section) {
            setActiveSection(location.state.section);
        }
    }, [location.state]);
    const handleRegisterChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    const handleVolunteerChange = (e) => {
        const { name, value } = e.target;
        setVolunteerData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/payment-page');
        }, 2000);
    };
    const handleVolunteerSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            alert('Volunteer form submitted successfully!');
            setVolunteerData({
                name: '',
                email: '',
                phone: '',
                event: '',
                comments: '',
            });
        }, 2000);
    };
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
                                            <p className="">    {index + 1}.</p>
                                            <h1>{sponsor.eventName}</h1>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>
                                                Day & Date :
                                            </p>
                                            <p> {sponsor.date}</p>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>
                                                venue :
                                            </p>
                                            <p>{sponsor.venue}</p>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>
                                                Fees:
                                            </p>
                                            <p>{sponsor.fees}</p>
                                        </div>
                                        <div className='flex gap-3'>
                                            <p className='font-bold'>
                                                Prizes :
                                            </p>
                                            <p>{sponsor.prizes}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className='  px-5 border p-4 rounded-xl bg-[#0571BC] col-span-1 text-white'>
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
                                            <button type='submit' className='p-2 border w-fit bg-white text-black rounded-md'  >
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
                    <section className='max-w-[30rem] mx-auto my-10'>
                        <div>
                            <form action="" onSubmit={handleVolunteerSubmit} className='space-y-5'>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-[#0571BC]'>Name *</label>
                                    <input type="text" className='p-2 border border-gray-400 focus:outline-none' placeholder='Name' name='name' onChange={handleVolunteerChange} value={volunteerData.name} />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-[#0571BC]'>Email *</label>
                                    <input type="text" className='p-2 border border-gray-400 focus:outline-none' placeholder='Email' name='email' onChange={handleVolunteerChange} value={volunteerData.email} />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-[#0571BC]'>phone *</label>
                                    <input type="text" className='p-2 border border-gray-400 focus:outline-none' name="phone" placeholder='Phone' value={volunteerData.phone}
                                        onChange={handleVolunteerChange} />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-[#0571BC]'>Event * </label>
                                    <input type="text" className='p-2 border border-gray-400 focus:outline-none' placeholder='Event' name='event' onChange={handleVolunteerChange} value={volunteerData.event} />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="" className='text-[#0571BC]'>Comments</label>
                                    <textarea rows={4} className='p-2 border border-gray-400 focus:outline-none' placeholder='Comments' name='comments' onChange={handleVolunteerChange} value={volunteerData.comments} />
                                </div>
                                <div className='text-center'>
                                    <button type='submit' className='p-2 border'>
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </section>
                )}

            </div>
        </>
    )
}

export default Form
