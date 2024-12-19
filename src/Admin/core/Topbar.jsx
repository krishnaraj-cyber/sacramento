import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar } from "@nextui-org/react";
import { getuserdetails, logout } from "../../shared/services/Token/token";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const tokenkey="NOTOMASSECRET";



export default function Topbar() {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem(tokenkey);
    navigate('/login')
  }
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white  text-sm py-2.5 sm:py-4 lg:ps-[17rem] ">
      <nav className="flex items-center w-full px-4 mx-auto basis-full sm:px-6 md:px-8" aria-label="Global">
        {/* <div className="me-5 lg:me-0 lg:hidden">
          <a className="flex-none text-xl font-semibold " href="#" aria-label="Brand">Brand</a>
        </div> */}
        <div className="flex items-center w-full ms-auto justify-between sm:gap-x-3 sm:order-3 lg:rounded-xl lg:border lg:p-5">
          <div>
            <Link to='/' className="lg:block hidden"><i class="fa-solid fa-house text-2xl text-gray-500" ></i></Link>
          <img src="/assets/images/Logo/logoo.png" alt="logo" className="object-cover w-36 block lg:hidden" />
          </div>
          <div className="flex flex-row items-center justify-end gap-2">
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  size="sm"
                  className="transition-transform "
                  src="/assets/images/Header/profile.png"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="gap-2 h-14 ">
                  <div className="flex items-center gap-2">
                     <p className="font-semibold">Signed in as</p>
                  <p className="">{getuserdetails()?.Name?.charAt(0).toUpperCase() + getuserdetails()?.Name?.slice(1).toLowerCase()}</p>
                  </div>
                 
                </DropdownItem>
                <DropdownItem key="logout" onPress={logout} className="text-center hover:!text-white bg-gray-200 hover:!bg-red-600 font-semibold">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      </nav>
    </header>
  )
}