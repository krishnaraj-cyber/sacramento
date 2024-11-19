import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <>
    <div className="sticky inset-x-0 top-0 z-20 px-4 bg-white border-y sm:px-6 md:px-8 lg:hidden">
      <div className="flex items-center py-4">
        <button type="button" className="text-gray-500 hover:text-gray-600" data-hs-overlay="#application-sidebar" aria-controls="application-sidebar" aria-label="Toggle navigation">
          <span className="sr-only">Toggle Navigation</span>
          <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6" /><line x1="3" x2="21" y1="12" y2="12" /><line x1="3" x2="21" y1="18" y2="18" /></svg>
        </button>

        <ol className="flex items-center ms-3 whitespace-nowrap" aria-label="Breadcrumb">
          <li className="flex items-center text-sm text-gray-800">
            Application Layout
            <svg className="flex-shrink-0 mx-3 overflow-visible size-2.5 text-gray-400" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 1L10.6869 7.16086C10.8637 7.35239 10.8637 7.64761 10.6869 7.83914L5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </li>
          <li className="text-sm font-semibold text-gray-800 truncate" aria-current="page">
            Dashboard
          </li>
        </ol>
      </div>
    </div>
      <div id="application-sidebar" className="hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white rounded-xl m-3  border pt-7 pb-10 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300">
        <div className="px-6">
          <a className="flex text-xl font-semibold" href="/" aria-label="Brand">
            <img src="/assets/Images/Logo/logoo.png" alt="logo" className="object-cover " />
          </a>
        </div>
        <nav className="flex flex-col flex-wrap w-full p-6 hs-accordion-group" data-hs-accordion-always-open>
          <ul className="space-y-2">
            <li>
              <NavLink to={'/admin/dashboard'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? 'bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm text-slate-700 rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-rr-dashboard"></i>
                Dashboard
              </NavLink>
            </li>
           
            {/* <li>
              <NavLink to={'/admin/register'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-rr-box-open-full"></i> Register
              </NavLink>
            </li> */}
           
           
            <li>
              <NavLink to={'/admin/boardmembers'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Board Members
              </NavLink>
            </li>
             <li>
              <NavLink to={'/admin/youthforum'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Youth Forum
              </NavLink>
            </li>
              <li>
              <NavLink to={'/admin/sponsors'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Sponsors
              </NavLink>
            </li> 
            <li>
              <NavLink to={'/admin/event'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Event
              </NavLink>
            </li>
           
            <li>
              <NavLink to={'/admin/financial'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Financial Summary
              </NavLink>
            </li> 
            <li>
              <NavLink to={'/admin/gallery'} className={({ isActive }) => (`flex items-center gap-x-3.5 py-2.5 px-2.5 ${isActive ? ' bg-gradient-to-tr from-primary to-primary text-white shadow' : 'bg-white shadow'} text-sm rounded-lg hover:bg-[#19569326] hover:shadow`)}>
                <i className="fi fi-sr-users-alt"></i> Gallery
              </NavLink>
            </li>
           
          </ul>
        </nav>
      </div>
      </>
  )
}