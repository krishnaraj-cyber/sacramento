import React, { useState } from 'react'
import { HashRouter, Link, useLocation } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link';

export default function Header() {

  const [isCollapsed, setIsCollapsed] = useState(true);
  const location = useLocation();

  const scrolltoTop = ()=>{
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
  return (
    <>
      <header className="flex flex-wrap lg:justify-start lg:flex-nowrap w-full bg-white text-sm py-4 fixed top-0 z-[15]">
        <nav className="max-w-[95rem] w-full mx-auto px-4 lg:flex lg:items-center lg:justify-between" aria-label="Global">
          <div className="flex items-center justify-between">
            <a className="flex-none" href="/">
              <img src="/assets/Images/Logo/logo.png" className='md-w-[270px] w-[200px]' alt="" />
            </a>
            <div className="lg:hidden">
              <button type="button" onClick={() => isCollapsed ?setIsCollapsed(false): setIsCollapsed(true)} className="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-x-2 rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none" data-hs-collapse="#navbar-image-1" aria-controls="navbar-image-1" aria-label="Toggle navigation">
              {isCollapsed ? 
                (<svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>):
                (<svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>)}
              </button>
            </div>
          </div>
          <div id="navbar-image-1" className={`hs-collapse overflow-hidden basis-full grow lg:block animate-fade-down animate-once ${isCollapsed ? 'hidden' : 'block'}`} aria-hidden={isCollapsed}>
            <div className="flex flex-col gap-5 mt-5 lg:flex-row lg:items-center lg:justify-end lg:mt-0 lg:ps-5 font-bold text-md">
              <Link to={'/'} onClick={scrolltoTop} className={`text-dark ${location.pathname === '/' && location.hash ==''? 'bg-primary text-white' : ''} px-2 py-1 rounded hover:bg-primary hover:text-white`} >HOME</Link>
              <HashLink to='/#aboutus' scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} onClick={() => setIsCollapsed(!isCollapsed)} className={`text-dark ${location.hash == "#aboutus" ? 'bg-primary text-white' : ''} px-2 py-1 rounded hover:bg-primary hover:text-white`} >ABOUT US</HashLink>
              <Link to={'/gallery'} onClick={() => setIsCollapsed(!isCollapsed)} className={`text-dark ${location.pathname === '/gallery' ? 'bg-primary text-white' : ''} px-2 py-1 rounded hover:bg-primary hover:text-white`} >GALLERY</Link>
              <Link to={'/event'} onClick={() => setIsCollapsed(!isCollapsed)} className={`text-dark ${location.pathname === '/event' ? 'bg-primary text-white' : ''} px-2 py-1 rounded hover:bg-primary hover:text-white`} >EVENTS</Link>
              <a href={'#contactus'} onClick={() => setIsCollapsed(!isCollapsed)} scroll={(el) => el.scrollIntoView({ behavior: 'smooth', block: 'start' })} className={`text-dark ${location.hash == "#contactus" ?  'bg-primary text-white' : ''} px-2 py-1 rounded hover:bg-primary hover:text-white`} >CONTACT US</a>
              <div className='flex'>
                <a href='https://www.facebook.com/natomasgroup' target='_blank' className='text-2xl text-secondary me-2'><i className="fa-brands fa-square-facebook"></i></a>
                <a href='' target='_blank' className='text-2xl text-secondary me-2'><i className="fa-brands fa-square-instagram"></i></a>
                <a href='https://www.youtube.com/natomasgroup' target='_blank' className='text-2xl text-secondary'><i className="fa-brands fa-youtube"></i></a>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
