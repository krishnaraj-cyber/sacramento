import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { addSubscription } from '../shared/services/apiRegister/apiregister';
import toast from 'react-hot-toast';
import { HashLink } from 'react-router-hash-link';

export default function Footer() {

  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false)

  const onchange = (e)=>{
    setFormData({...formData, [e.target.name]: e.target.value});
  }

  const handlesave = async(e)=>{
    e.preventDefault();
    setLoading(true);
    await addSubscription(formData);
    toast.success("Sucsubscription Added");
    setLoading(false);
    e.target.reset();
    setFormData({})
  }

  return (
    <div className='pb-5 bg-primary' id='contactus'>
      <div className="home-bg py-20"> </div>
      <div className='w-full md:w-[50%] mx-auto mt-[-80px]'>
        <div className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-md p-4 md:p-5 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
          <div className='mx-auto mt-[-40px]'>
              <div className='bg-secondary text-white px-3 py-1 text-2xl font-bold rounded-md'>Join Us</div>
          </div>
          <div className='mt-4'>
            <form onSubmit={ handlesave }>
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="space-y-3">
                  <input type="text" name='First_Name' value={formData?.First_Name} onChange={onchange} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="First Name" required />
                </div>
                <div className="space-y-3">
                  <input type="text" name='Last_Name' value={formData?.Last_Name} onChange={onchange} className="py-3 px-4 block w-full border-2 border-gray-200 rounded-lg text-md focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Last Name" required />
                </div>
              </div>
              <div className="flex rounded-lg shadow-sm">
                <input type="email" name='Email' value={formData?.Email} onChange={onchange} id="hs-trailing-button-add-on" className="py-3 px-4 border-2 block w-full border-gray-200 shadow-sm rounded-s-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Email" required />
                <button type="submit" className="py-2 px-4 inline-flex justify-center items-center gap-x-2 text-xl font-semibold rounded-e-md border border-transparent bg-secondary text-white hover:bg-primary disabled:opacity-50 disabled:pointer-events-none">
                  {loading &&<span className='animate-spin animate-duration-[1200ms]'><i className="fa-solid fa-circle-notch"></i></span>} Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className='py-10 max-w-[90rem] w-full mx-auto px-4'>
          <div className="md:grid md:grid-cols-12 ">
            <div className="md:col-span-3 mb-4 flex justify-center items-start">
              <img src="/assets/Images/Logo/Logo1.png" className='w-[150px]' alt="" srcSet="" />
            </div>

            <div className="md:col-span-3 text-white text-xl font-semibold mb-5 text-center md:text-start">
              <div><Link to={'/'}>Home</Link></div>
              <div><HashLink to='/#aboutus'>About Us</HashLink></div>
              <div><Link to={'/gallery'}>Our Gallery</Link></div>
              <div><Link to={'/event'}>Eventes</Link></div>
              {/* <div><Link>Contact Us</Link></div> */}
            </div>

            <div className="col-span-6 text-white mb-5 text-center md:text-start">
              <div className='text-2xl font-semibold text-[#ffd800] mb-3'>Contact Us</div>
              <div className='text-xl'><span className='text-[#ffd800]'>Phone : </span>+1 916-243-8049</div>
              <div className='text-xl'><span className='text-[#ffd800]'>E-Mail :</span> events.natomasgroup@gmail.com</div>
              <div className='text-xl'><span className='text-[#ffd800]'>Address :</span> 5497 Dunlay Dr, Sacramento, CA 95835</div>
            </div>

            {/* <div className="md:col-span-4 text-white">
              <div className='text-2xl font-semibold text-[#ffd800] mb-3 text-center md:text-start'>Gallery</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2016
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2017
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2018
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2019
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2020
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2021
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2022
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                  <img className="w-full h-auto rounded-t-xl" src="/assets/Images/Gallery/1.jpg" alt="Image Description" />
                  <div className="p-4 md:py-1 text-center">
                    <h3 className="text-base font-bold text-primary dark:text-white">
                      2024
                    </h3>
                  </div>
                </div>
              </div>
              
            </div> */}

          </div>
      </div>

      <div className='bg-primary pb-3'>
        <div className='max-w-[75rem] w-full mx-auto px-4'>
          <div className='text-center text-white'>
            <p>Copyright © Natomas Group | Developed by <span><a href="http://arrowthought.com/" target='_blank'>Arrow Thought</a></span></p>
          </div>
        </div>
      </div>

      
    </div>
  )
}
