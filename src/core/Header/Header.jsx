import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Hamburger from 'hamburger-react';
function Header() {
  const [isOpen, setOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const [isHovered, setIsHovered] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const handleLinkClick = () => {
    setOpen(false);
    setIsAboutOpen(false);
  };
  return (
    <>
      <div className="bg-[url('/assets/images/Header/ddd.png')] bg-center bg-white bg-contain z-50 shadow-md fixed w-full top-0  ">
        <header className="max-w-[100rem] mx-auto px-5">
          <div className="flex items-center justify-between">
            <Link to="/">
              <div className="flex gap-5 items-center lg:my-0 my-3">
                <div className="flex items-center gap-2">
                  <img src="/assets/images/Header/Logo (2).png" alt="logo" className="w-20" />
                </div>
                <div>
                  <p className="text-[#5E0000] md:text-xl text-sm font-bold">SACRAMENTO</p>
                  <p className="text-[#0571BC] md:text-base text-sm font-semibold">TAMIL MANDRUM</p>
                </div>
              </div>
            </Link>
            <div className="block lg:hidden">
              <Hamburger toggled={isOpen} toggle={setOpen} />
            </div>
            <div className="text-[#f4e316] lg:block hidden space-x-2">
              <Link to="/" className={`p-3 ps-px sm:px-3 md:py-2 2xl:text-lg text-sm hover:text-white hover:bg-[#0470BC] ${isActive('/') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}  >
                Home
              </Link>
              <Link onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
                className={`p-3 ps-px sm:px-3 md:py-2 2xl:text-lg group text-[#5E0000] text-sm relative hover:text-white hover:bg-[#0470BC] ${isActive('/board-members') || isActive('/goals') || isActive('/laws') || isActive('/financial-summary') || isActive('/youth-forum') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}>
                About Us
                <i className={`fi fi-rr-angle-small-down text-red-500 group-hover:text-white relative top-1  ${isActive('/board-members') || isActive('/goals') || isActive('/laws') || isActive('/financial-summary') || isActive('/youth-forum') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'
                  }${isHovered ? 'rotate-180' : 'rotate-0'}`}
                ></i>
                {isHovered && (
                  <div className="absolute left-0  mt-[6.5px] bg-white border rounded shadow-lg w-60">
                    <Link to="/board-members" className={`block px-4 py-2 text-[#E91E31] hover:bg-[#0470BC] hover:text-white ${isActive('/board-members') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}>
                      Board Members
                    </Link>
                    <Link to="/goals" className={`block px-4 py-2 text-[#E91E31] hover:bg-[#0470BC] hover:text-white ${isActive('/goals') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}>
                      Goals
                    </Link>
                    <Link to="/laws" className={`block px-4 py-2 text-[#E91E31] hover:bg-[#0470BC] hover:text-white ${isActive('/laws') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}>
                      By Laws
                    </Link>
                    <Link to="/financial-summary" className={`block px-4 py-2 text-[#E91E31] hover:bg-[#0470BC] hover:text-white ${isActive('/financial-summary') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}>
                      Financial Summary
                    </Link>
                    <Link to="/youth-forum" className={`block px-4 py-2 text-[#E91E31] hover:bg-[#0470BC] hover:text-white ${isActive('/youth-forum') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}>
                      Youth Forum
                    </Link>
                  </div>
                )}
              </Link>
              <Link to="/gallery" className={`p-3 ps-px sm:px-3 md:py-2 2xl:text-lg text-sm hover:text-white hover:bg-[#0470BC] ${isActive('/gallery') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}  >
                Gallery
              </Link>
              <Link to="/events" className={`p-3 ps-px sm:px-3 md:py-2 2xl:text-lg text-sm hover:text-white hover:bg-[#0470BC] ${isActive('/events') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}  >
                Events
              </Link>
              <Link to="/tamil-schools" className={`p-3 ps-px sm:px-3 md:py-2 2xl:text-lg text-sm hover:text-white hover:bg-[#0470BC] ${isActive('/tamil-schools') ? 'text-white bg-[#0470BC]' : 'text-[#E91E31]'}`}  >
                Tamil Schools
              </Link>
            </div>
            <div className="bg-[#0470BC] px-5 py-7 lg:block hidden text-white font-bold cursor-pointer">Donate</div>
          </div>
        </header>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-[#0571BC]  text-[#f4e316] text-center p-5 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'
          } lg:hidden z-50`}
      >
        <div className="text-left">
          <button onClick={() => setOpen(false)} className="text-white text-3xl">
            &times;
          </button>
        </div>
        <nav className="mt-5 space-y-6">
          <Link to="/" className={`block text-lg hover:underline ${isActive('/') ? 'text-white' : 'text-[#f4e316]'}`} onClick={handleLinkClick} >
            Home
          </Link>
          <div  >
            <button onClick={() => setIsAboutOpen(!isAboutOpen)} className="block text-lg   w-full text-[#f4e316] ">
              About Us
              <i className={`fi fi-rr-angle-small-down text-[#f4e316] group-hover:text-white relative top-1 ${isActive('/about') ? '  bg-[#0470BC]' : 'text-[#E91E31]'}`} ></i>
            </button>
            {isAboutOpen && (
              <div className=" bg-[#59b2f1] mt-3 space-y-4 rounded-lg py-3">
                <Link to="/board-members" className={`block text-[#f4e316] hover:underline ${isActive('/board-members') ? 'text-white' : 'text-[#f4e316]'}`} onClick={() => setOpen(false)}>
                  Board Members
                </Link>
                <Link to="/goals" className={`block text-[#f4e316] hover:underline ${isActive('/goals') ? 'text-white' : 'text-[#f4e316]'}`} onClick={() => setOpen(false)}>
                  Goals
                </Link>
                <Link to="/laws" className={`block text-[#f4e316] hover:underline ${isActive('/laws') ? 'text-white' : 'text-[#f4e316]'}`} onClick={() => setOpen(false)}>
                  By Laws
                </Link>
                <Link to="/financial-summary" className={`block text-[#f4e316] hover:underline ${isActive('/financial-summary') ? 'text-white' : 'text-[#f4e316]'}`} onClick={() => setOpen(false)}>
                  Financial Summary
                </Link>
                <Link to="/youth-forum" className={`block text-[#f4e316] hover:underline ${isActive('/youth-forum') ? 'text-white' : 'text-[#f4e316]'}`} onClick={() => setOpen(false)}>
                  Youth Forum
                </Link>
              </div>
            )}
          </div>
          <Link to="/gallery" className={`block text-lg hover:underline ${isActive('/gallery') ? 'text-white' : 'text-[#f4e316]'}`} onClick={handleLinkClick}  >
            Gallery
          </Link>
          <Link to="/events" className={`block text-lg hover:underline ${isActive('/events') ? 'text-white' : 'text-[#f4e316]'}`} onClick={handleLinkClick}  >
            Events
          </Link>
          <Link to="/tamil-schools" className={`block text-lg hover:underline ${isActive('/tamil-schools') ? 'text-white' : 'text-[#f4e316]'}`} onClick={handleLinkClick}   >
            Tamil Schools
          </Link>
        </nav>
      </div>
      <div className="h-[2.5rem]"></div>
    </>
  );
}
export default Header;
