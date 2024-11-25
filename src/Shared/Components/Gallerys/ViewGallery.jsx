import React from 'react'
import { useParams } from 'react-router-dom';
import apiurl from '../../../Shared/services/apiendpoint/apiendpoint';

export default function ViewGallery(props) {
    const { OpenModel, Images  } = props;
    
    const param = useParams()
  return (
    <>
         <section className='mt-[67px] md:mt-[79px]'>
            <div className='max-w-[110rem] pt-18 w-full mx-auto px-2 md:px-4 py-16'>
               
                    <div>
                        <div className='text-primary text-center text-xl font-bold mb-4'><i className="fa-regular fa-images"></i> <span className='text-secondary'>Photos</span></div>
                        <div className='mb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3'>
                            {Images.length > 0 && Images.map((items,index)=>(
                                <div role='button' onClick={() =>OpenModel(items)} className='relative z-[1]' key={index}>
                                    <ul className="cards">
                                        <li className="rounded-lg">
                                            <img loading='lazy' src={`${apiurl()}/${items.Image.split(',')[0]}`} />
                                            <div className='absolute bottom-0 end-0 z-[2] bg-primary text-white text-2xl font-bold px-3 mx-0 badge'> {items.EventName}</div>
                                        </li>
                                        {/* {items.Image.split(',')[1] &&
                                        <li className="card card-2"><img loading='lazy' src={`${apiurl()}/${items.Image.split(',')[1]}`}/></li> }
                                         {items.Image.split(',')[2] &&
                                        <li className="card card-3"><img loading='lazy' src={`${apiurl()}/${items.Image.split(',')[2]}`}/></li> } */}
                                    </ul>
                                </div>
                            )) }
                                
                        </div>
                    </div>
                
               
            </div>
        </section>
    </>
  )
}
