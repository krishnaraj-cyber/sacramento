import React from 'react'
import { Link } from 'react-router-dom'

export default function PaymentFail() {
  return (
    <section className='min-h-[calc(100vh_-_432px)] flex items-center justify-center mt-[98px] bg-primary'>
      <div className='grid grid-cols-3 justify-center items-center'>
        <div></div>
        <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="p-4 md:p-10">
            <div className='flex justify-center items-center mt-[-80px] mb-3'>
              <div className={`text-6xl text-danger-600 bg-white p-3 rounded-full `}>
                <i className="fa-regular fa-circle-xmark animate-ping animate-once animate-ease-in-out animate-reverse"></i>
              </div>
            </div>
            <h3 className="text-2xl text-gray-800 dark:text-white text-center">
              Fail
            </h3>
            <p className="mt-2 text-gray-500 dark:text-neutral-400">
              Please Try again later
            </p>

            <div className={`text-center mt-4  `}>
              <Link to={'/event'} type="button" className="py-2 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-full border border-danger-600 text-danger-600 hover:bg-danger-600 hover:text-white disabled:opacity-50 disabled:pointer-events-none">
                Ok
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
