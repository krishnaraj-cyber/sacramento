import moment from 'moment-timezone';
import React from 'react'

export default function Registration(props) {
    const { EventData, formdata, handlechange, handlesave, loading } = props;
    return (
        <section className='mt-[98px]'>
            
            <div className='h-[20vh] bg-primary flex items-center justify-center'>
                <div className='text-center'>
                    <div className='text-3xl text-white font-bold mb-3'>{EventData?.Title}</div>
                    <div className='text-md text-white '><span className='me-2'>Date / Time :</span> {moment(EventData?.Event_Date).format("YYYY-MM-DD")} / {EventData?.Event_Time} </div>
                </div>
            </div>

            <div className='md:max-w-[95rem] py-16 w-full mx-auto px-4'>
                {formdata['Description']&&
                    <div className='mb-5'>
                        <div className='text-xl font-bold mb-4'>Description</div>
                        <div className='mx-3' dangerouslySetInnerHTML={{ __html: formdata['Description'] }} />
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
                                <input type="text" name="Phone_Number" value={formdata?.Phone_Number} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                            </div>

                            { formdata?.Poster_Type == "Donation" && <>
                                <div className="mb-2">
                                    <div className="mb-2">
                                        <label>How much do you wish to donate? <span className='text-[#ef4444]'>*</span></label>
                                    </div>
                                    <input type="text" name="Entry_Fees" value={formdata?.Entry_Fees} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                </div>
                                </>
                            }

                            { formdata?.Poster_Type == "RSVP" && <>
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

                                { formdata?.Guest_Count == "Customizable" && <>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Number of guests <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <input type="text" name="Number_Guests" value={formdata?.Number_Guests} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>
                                </>}

                                { formdata?.Guest_Count == "Age Wise" && <>
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

                            { formdata?.Poster_Type == "Registration Form" && <>
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
                                
                                { formdata?.Participant_Type != "Individual" && <>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Team / Participant Name <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <input type="text" name="Team_Name" value={formdata?.Team_Name} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>

                                    { formdata?.Participant_Type == "Custom Team" && <>
                                        <div className="mb-2">
                                            <div className="mb-2">
                                                <label>Team Members Count <span className='text-[#ef4444]'>*</span></label>
                                            </div>
                                            <input type="text" name="Team_Members_Count" value={formdata?.Team_Members_Count} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                        </div>
                                    </>}
                                </>}

                                <div className="mb-2 lg:col-span-2">
                                    <div className="mb-2">
                                        <label>Disclaimer</label>
                                    </div>
                                    {/* <input type="text" name="Disclaimer" value={formdata?.Disclaimer} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required /> */}
                                    <div className='mx-3' dangerouslySetInnerHTML={{ __html: formdata['Disclaimer'] }} />
                                    <div className="flex items-center ms-3 mt-3">
                                        <input type="checkbox" name='Disclaimer_Acceptance' checked={formdata?.Disclaimer_Acceptance} className="shrink-0 mt-0.5 me-2 border-gray-200 rounded text-blue-600 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800" id="hs-checked-checkbox" required />
                                        <label htmlFor="hs-checked-checkbox" className="text-md">I Agree <span className='text-[#ef4444]'>*</span></label>
                                    </div>
                                </div>
                            </>
                        }


                        </div>
                        <div className="mt-4 text-center">
                            <button type="submit" className=" px-4 py-2 text-white bg-secondary border rounded-md" >
                                {loading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>} 
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
