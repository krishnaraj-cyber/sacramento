import React, { useState } from 'react'
import { Registers } from '../../../assets/Json/Register'
import { useNavigate } from 'react-router-dom';

function Form(props) {



    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        event: '',
        participantName: '',
        agree: false,
    });

    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);


        setTimeout(() => {
            setIsLoading(false);
            navigate('/payment-page');
        }, 2000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    return (
        <>
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
                            <div className='  ' key={index}>
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
                    <div >

                        <form onSubmit={handleSubmit}>
                            <div className='space-y-5'>
                                <div>
                                    <label htmlFor="firstName" className='md:text-lg'>First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        className='w-full border p-2 focus:outline-none text-black rounded-md'
                                        placeholder='First Name'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="lastName" className='md:text-lg'>Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        className='w-full border p-2 focus:outline-none text-black rounded-md'
                                        placeholder='Last Name'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className='md:text-lg'>Email</label>
                                    <input
                                        type="text"
                                        name="email"
                                        className='w-full border p-2 focus:outline-none text-black rounded-md'
                                        placeholder='Email'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="phoneNumber" className='md:text-lg'>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        className='w-full border p-2 focus:outline-none text-black rounded-md'
                                        placeholder='Phone Number'
                                        value={formData.phoneNumber}
                                        onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="event" className='md:text-lg'>Event *</label>
                                    <select
                                        id="event"
                                        name="event"
                                        className="w-full border p-2 focus:outline-none text-black rounded-md"
                                        value={formData.event}
                                        onChange={handleChange}  >
                                        <option value="Choose">Select Type</option>
                                        <option value="chess">Chess, Carrom & Painting</option>
                                        <option value="painting">Table Tennis (TT)</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="participantName" className='md:text-lg'>Team / Participant Name *</label>
                                    <input
                                        type="text"
                                        name="participantName"
                                        className='w-full border p-2 focus:outline-none text-black rounded-md'
                                        placeholder='Participant Name'
                                        value={formData.participantName}
                                        onChange={handleChange} />
                                </div>
                                <div>
                                    <label htmlFor="agree" className='md:text-lg'>Disclaimer</label>
                                    <div className='flex items-center gap-2'>
                                        <input
                                            type="checkbox"
                                            name="agree"
                                            checked={formData.agree}
                                            onChange={handleChange} />
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
        </>
    )
}

export default Form
