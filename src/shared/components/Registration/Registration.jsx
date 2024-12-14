import { Link } from 'react-router-dom'; 
import apiurl from '../../services/apiendpoint/apiendpoint'; 

export default function Registration(props) {
    const { EventData, formdata, handlechange, handlesave, loading, type, isLoading, success, handlechangeGames, removeGame, AddGame } = props;

    const indivparticipant = formdata?.Games?.some( game => game.Participant_Type === "Individual" )
    const team = formdata?.Games?.some( game => game.Participant_Type != "Individual" )
    const customteam = formdata?.Games?.some( game => game.Participant_Type == "Custom Team" && game.Payment_Type == "Individual" )
    

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

                            { formdata?.Poster_Type == "Registration Form" && type !== "volunteer" && <>

                            { formdata.Participant && formdata?.Participant.length !=0 && formdata?.Participant.map((items, index) => {
                                const selectedGame = Array.isArray(formdata?.Games) && formdata.Games.find( (game) => game.Game_Title === items?.Selected_Event );
                                return(<>
                            <div className='lg:col-span-2' key={index}>
                                <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'> 

                                    <div className='text-xl font-bold'>
                                        <span className=""> {selectedGame?.Participant_Type == "Individual" ? `Participant ${index + 1}` : `Participant` } </span> 
                                    </div>
                                    <div className='text-end'>
                                        <button type="button" onClick={(e)=> removeGame(e,index)} className={` ${index >= 1 ? 'block' : 'hidden'} px-2 py-1 text-sm text-white bg-danger-600 border rounded-md text-center ml-auto `} > <i className="fa-solid fa-trash"></i></button>
                                    </div> 

                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Choose Event <span className='text-[#ef4444]'>*</span></label>
                                        </div>
                                        <select name="Selected_Event" value={items?.Selected_Event} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                            <option key="-1" value="">Select Type</option>
                                            {formdata?.Games.map((items, index) => (
                                                <option role='button' key={index} value={items.Game_Title}>{items.Game_Title}</option>
                                            ))}
                                        </select>
                                    </div> 

                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label> Participant / Team Name</label>
                                        </div>
                                        <input type="text" name="Participant_Name" value={items?.Participant_Name} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>

                                    {selectedGame?.Participant_Type === "Individual" && ( <>
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label>Age 
                                                <span className='relative group'>{' '}<i class="fa-solid fa-circle-info cursor-pointer"></i>
                                                    <div className={`absolute bottom-5 left-5 *:whitespace-nowrap  rounded-lg hidden group-hover:block bg-white border p-2 select-none`}>
                                                    {formdata?.Games.filter(game => game.Game_Title === items?.Selected_Event).length > 0 ? (
                                                        formdata?.Games.filter(game => game.Game_Title === items?.Selected_Event).map(filteredGame => (
                                                            <div key={filteredGame.id}>
                                                            <p className="text-sm text-gray-600">
                                                                Fees for Under 5: ${filteredGame.Under5_Fees || 'N/A'}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Fees for Kids: ${filteredGame.Kids_Fees || 'N/A'}
                                                            </p>
                                                            <p className="text-sm text-gray-600">
                                                                Fees for Adults: ${filteredGame.Adult_Fees || 'N/A'}
                                                            </p>
                                                            </div>
                                                        ))
                                                        ) : (
                                                        <p className="text-sm text-gray-600">Please select Event to View</p>
                                                    )}
                                                    </div> 
                                                </span>
                                            </label>
                                        </div>
                                        <input type="number" name="Age" value={items?.Age} onChange={(event)=>handlechangeGames(event,index)} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>  
                                    </>)} 

                                    { selectedGame?.Participant_Type == "Custom Team" &&  selectedGame?.Payment_Type == "Individual"  && 
                                    <div className="mb-2">
                                        <div className="mb-2">
                                            <label> Number of Teammates </label>
                                        </div>
                                        <input type="text" name="Team_Members_Count" value={formdata?.Team_Members_Count} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required />
                                    </div>} 
                                    
                                </div>      
                            </div> 

                            { selectedGame?.Participant_Type == "Individual" && (
                            <div className="lg:col-span-2 text-end">
                                <button type="button"  onClick={AddGame}  className="px-4 py-2 text-white bg-secondary border rounded-md text-center"  >
                                <span className="block md:hidden">
                                    <i className="fa-solid fa-plus"></i>
                                </span>
                                <span className="hidden md:block">+ Add Participant</span>
                                </button>
                            </div> )} 
                        </> )

                        })}
                         </> }
                       
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
                            </div>
                        )}
                        
                    </form>
                </div> 
            </div>
        </>
    )
}
