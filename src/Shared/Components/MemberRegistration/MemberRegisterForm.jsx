import React from 'react'
import { Link } from 'react-router-dom';

export default function MemberRegisterForm( props ) {

  const {handlechange, handlesave, formdata, isLoading, success} = props;
  return (
    <>
    <section>
    <div className='max-w-screen-2xl mx-auto p-5'>
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
                            <div className="mb-2">
                                    <div className="mb-2">
                                        <label>Location <span className='text-[#ef4444]'>*</span> </label>
                                    </div>
                                    <select name="Location" value={formdata?.Location} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                        <option value="">Select Type</option>
                                        <option value="Sacramento">Sacramento</option>
                                        <option value="Elk Grove">Elk Grove</option>
                                        <option value="Folsom">Folsom</option>
                                        <option value="Rancho Cordova">Rancho Cordova</option>
                                        <option value="Arden-Arcade">Arden-Arcade</option>
                                        <option value="Citrus Heights">Citrus Heights</option>
                                        <option value="Carmichael">Carmichael</option>
                                        <option value="Fair Oaks">Fair Oaks</option>
                                        <option value="North Highlands">North Highlands</option>
                                        <option value="Antelope">Antelope</option>
                                        <option value="Rio Linda">Rio Linda</option>
                                        <option value="Florin">Florin</option>
                                        <option value="Orangevale">Orangevale</option>
                                        <option value="Galt">Galt</option>
                                        <option value="Rosemont">Rosemont</option>
                                        <option value="Gold River">Gold River</option>
                                        <option value="Isleton">Isleton</option>
                                        <option value="Rancho Murieta">Rancho Murieta</option>
                                        <option value="McClellan Park">McClellan Park</option>
                                        <option value="Walnut Grove">Walnut Grove</option>
                                        <option value="Wilton">Wilton</option>
                                        <option value="Foothill Farms">Foothill Farms</option>
                                        <option value="Vineyard">Vineyard</option>
                                        <option value="La Riviera">La Riviera</option>
                                        <option value="Herald">Herald</option>
                                        <option value="Lemon Hill">Lemon Hill</option>
                                        <option value="Courtland">Courtland</option>
                                        <option value="Franklin">Franklin</option>
                                        <option value="Hood">Hood</option>
                                        <option value="Clay">Clay</option>
                                    </select>
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Register your spouse <span className='text-[#ef4444]'>*</span></label>
                                </div>
                                <select name="Register_spouse" value={formdata?.Register_spouse} onChange={handlechange} className="w-full px-4 py-2 border rounded-md outline-none" required>
                                        <option value="">Select Type</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </select>
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Notify on any updates to STM </label>
                                </div>
                                <label htmlFor="Notify_stm"><input id='Notify_stm' type="checkbox" name="Notify_stm" value={formdata?.Notify_stm} onChange={handlechange} className=" px-4 py-2 border rounded-md outline-none"  /> <span for='Notify_stm' className='text-gray-500 select-none'>Yes</span></label>
                            </div>
                            <div className="mb-2">
                                <div className="mb-2">
                                    <label>Use Your Contact No. For STM whatsapp </label>
                                </div>
                                <label htmlFor="Contact_for_stm"><input id='Contact_for_stm' type="checkbox" name="Contact_for_stm" value={formdata?.Contact_for_stm} onChange={handlechange} className="px-4 py-2 border rounded-md outline-none"  /> <span className='text-gray-500 select-none'>Yes</span></label>
                            </div>
                           
                            
                        </div>
                        <div className="mt-4 text-center my-5">
                            <button type="submit" className=" px-4 py-2 text-white bg-secondary border rounded-md" >
                                {isLoading && <span className="animate-spin text-xl inline-block size-4 border-[3px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading"></span>}
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
                </div>
    </section>
    </>
  )
}
