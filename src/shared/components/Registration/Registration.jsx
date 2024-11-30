import React from 'react'
import apiurl from '../../services/apiendpoint/apiendpoint';
import { Link } from 'react-router-dom';

export default function Registration(props) {
    const { EventData, formdata, handlechange, handlesave, loading, type, isLoading, success } = props;

    return (
        <>
            <section className='  relative  max-w-[95rem]  md:mt-20 md:my-0 mt-20 px-5 mx-auto  '>
                <div className='flex items-center flex-wrap justify-center gap-4'>
                    <div>
                        {isLoading ? (
                            <div className="w-52 h-72 bg-gray-300 animate-pulse rounded-xl"></div>
                        ) : (
                            <img className='rounded-xl w-52' src={`${apiurl()}/${EventData?.Image}`} alt="" />
                        )}
                    </div>
                    <div className=' '>
                        <div className="mb-10    mx-auto  flex justify-center items-center   text-black  bg-no-repeat  relative"   >
                            <div className="absolute   rounded-lg"></div>
                            <div className="relative z-10 text-center space-y-2 ">
                                <div className=" md:text-3xl text-base concert-one-regular font-bold ">
                                    {isLoading ? (
                                        <div className="w-52 h-10 bg-gray-300 animate-pulse rounded-xl"></div>
                                    ) : (
                                        <p className='text-[#E91E31]'>{EventData?.Eventname}</p>
                                    )}
                                </div>
                                <div className=" md:text-2xl text-base concert-one-regular font-bold ">
                                    {isLoading ? (
                                        <div className="w-52 h-10 bg-gray-300 animate-pulse rounded-xl"></div>
                                    ) : (
                                        <p className='text-[#0571BC]'>{EventData?.Activities}</p>
                                    )}
                                </div>
                                <div className=" md:text-2xl text-base text-[#0571BC]  flex  flex-wrap  md:gap-3 gap-2 justify-center concert-one-regular font-bold ">
                                    {isLoading ? (
                                        <div className="w-52 h-10 bg-gray-300 animate-pulse rounded-xl"></div>
                                    ) : (
                                        <>     <p>{EventData?.Date}</p>     <p>{EventData?.Event_Time}</p>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='md:max-w-[95rem]   w-full mx-auto px-4'>
                {formdata['Description'] &&
                    <div className='mb-5'>
                        <>
                            <div className='md:text-3xl text-2xl font-bold text-[#0571BC]  concert-one-regular mb-5'>Description :</div>
                            {isLoading ? (
                                <div className="w-52 h-10 bg-gray-300 animate-pulse rounded-xl"></div>
                            ) : (
                                <div dangerouslySetInnerHTML={{ __html: formdata['Description'] }} />
                            )}
                        </>
                    </div>
                }
                <div>
                    <form onSubmit={handlesave} >
                        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>First Name <span className='text-[#ef4444]'>*</span></label>
                                </div>
                                <input type="text" name="First_Name" value={formdata?.First_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Last Name <span className='text-[#ef4444]'>*</span></label>
                                </div>
                                <input type="text" name="Last_Name" value={formdata?.Last_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Email <span className='text-[#ef4444]'>*</span></label>
                                </div>
                                <input type="email" name="Email" value={formdata?.Email} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Phone Number <span className='text-[#ef4444]'>*</span></label>
                                </div>
                                <input type="number" name="Phone_Number" value={formdata?.Phone_Number} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>
                            {formdata?.Poster_Type === "Donation" && type !== "volunteer" && (<>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>How much do you wish to donate? <span className='text-[#ef4444]'>*</span></label>
                                    </div>
                                    <input type="text"
                                        name="Entry_Fees"
                                        value={formdata?.Entry_Fees || ""}
                                        onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                </div>
                            </>)}
                            {formdata?.Poster_Type == "RSVP" && type !== "volunteer" && <>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Will you attend? <span className='text-[#ef4444]'>*</span> </label>
                                    </div>
                                    <select name="Willingness" value={formdata?.Willingness} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                        <option value="">Select Type</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                        <option value="Maybe">Maybe</option>
                                    </select>
                                </div>
                                {formdata?.Guest_Count == "Customizable" && <>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Number of guests <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <input type="text" name="Number_Guests" value={formdata?.Number_Guests} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>
                                </>}
                                {formdata?.Guest_Count == "Age Wise" && <>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Adults <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <select name="Adults" value={formdata?.Adults} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option value="">Select Type</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Kids <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <select name="Kids" value={formdata?.Kids} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option value="">Select Type</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Under 5 yrs <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <select name="Babes" value={formdata?.Babes} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option value="">Select Type</option>
                                            <option value="0">0</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </select>
                                    </div>
                                </>}
                            </>}
                            {isLoading ? (
                                <div className="w-52 h-10 bg-gray-300 animate-pulse rounded-xl"></div>
                            ) :
                                (formdata?.Poster_Type == "Registration Form" && type !== "volunteer" && <>

                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Choice Event <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <select name="Event" value={formdata?.Event} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option key="-1" value="">Select Type</option>
                                            {formdata?.Games.map((items, index) => (
                                                <option role='button' key={index} value={items.Game_Title}>{items.Game_Title}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {formdata?.Participant_Type != "Individual" && <>
                                        <div className="mb-2">
                                            <div className="mb-2">
                                                <label>Team / Participant Name <span className='text-[#ef4444]'>*</span></label>
                                            </div>
                                            <input type="text" name="Team_Name" value={formdata?.Team_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                        </div>
                                     
                                        {formdata?.Participant_Type == "Custom Team" && <>
                                            <div className="mb-2">
                                                <div className="mb-2">
                                                    <label>Team Members Count <span className='text-[#ef4444]'>*</span></label>
                                                </div>
                                                <input type="text" name="Team_Members_Count" value={formdata?.Team_Members_Count} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                            </div>
                                        </>}
                                    </>}
                                    <div className="mb-2 lg:col-span-2">
                                        <div  >
                                            <label className='  text-md font-bold'>Disclaimer :</label>
                                        </div>
                                        {/* <input type="text" name="Disclaimer" value={formdata?.Disclaimer} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required /> */}
                                        <div dangerouslySetInnerHTML={{ __html: formdata['Disclaimer'] }} />
                                        <div className="flex items-center  mt-3">
                                            <input type="checkbox" name='Disclaimer_Acceptance' checked={formdata?.Disclaimer_Acceptance} className="shrink-0   me-2 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox" required />
                                            <label htmlFor="hs-checked-checkbox" className="text-md">I Agree <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                    </div>
                                </>
                                )}
                        </div>
                        <div className="mt-4 text-center my-5">
                            <button type="submit" className=" px-4 py-2 text-white bg-secondary border rounded-md" >
                                {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}
                                Submit
                            </button>
                        </div>
                        {success && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-white rounded-lg shadow-lg p-6 text-center w-80">
                                    <div className="flex justify-center items-center mb-4">
                                        <div className="bg-secondary text-white rounded-full p-3">
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                    </div>
                                    <h2 className="text-lg font-bold text-secondary mb-2">SUCCESS</h2>
                                    <p className="text-gray-700 mb-4">Registered successfully  </p>
                                    <Link to='/'>
                                        <button className="px-4 py-2 bg-secondary text-white rounded-md"   >
                                            Continue
                                        </button>
                                    </Link>
                                </div>
                            </div>)}
                    </form>
                </div>
            </div>
        </>
    )
}
