import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getRegisterStatusbyid } from '../shared/services/apiRegister/apiregister';
import { Link } from 'react-router-dom';

export default function PaymentSuccess() {

  const param = useParams();
  const [Loding, setLoading] = useState(true)

  const getRegisterStatusbyID = useCallback(async () => {
    var data = localStorage.getItem('registerData')
    const Event = await getRegisterStatusbyid(param.id,JSON.parse(data));
    localStorage.removeItem('registerData')
    setLoading(false)
  }, []);

  var isMounted = true;
  useEffect(()=>{
    if (isMounted) {
      if(param.id != "completed"){
        getRegisterStatusbyID();
      }
      else{
        setLoading(false)
      }
    }
    return () => (isMounted = false);
  },[param.id])

  return (
    <section className='min-h-[calc(100vh_-_432px)] flex items-center justify-center mt-[98px] bg-primary'>
      <div className='grid grid-cols-1 mdgrid-cols-3 justify-center items-center'>
        <div></div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-10">
            <div className='flex justify-center items-center mt-[-80px] mb-3'>
              <div className={`text-3xl text-primary bg-white p-5 rounded-full ${Loding?'block':'hidden'}`}>
                <i className="fa-solid fa-spinner animate-spin animate-duration-[1200ms]"></i>
              </div>

              <div className={`text-6xl text-secondary bg-white p-3 rounded-full ${Loding?'hidden':'block'}`}>
                <i className="fa-regular fa-circle-check animate-ping animate-once animate-ease-in-out animate-reverse"></i>
              </div>
            </div>
            <h3 className="text-2xl text-gray-800 dark:text-white text-center">
              {Loding?'Loading...':'Success'}
            </h3>
            <p className="mt-2 text-gray-500 dark:text-neutral-400">
              {Loding?'Please wait a moment':"We've sent a confirmation to your e-mail for verification."}
            </p>

            <div className={`text-center mt-4 ${Loding?'hidden':'block'}`}>
              <Link to={'/event'} type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-teal-500 text-teal-500 hover:bg-teal-400 hover:text-white disabled:opacity-50 disabled:pointer-events-none">
                Ok
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
