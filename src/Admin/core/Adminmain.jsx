import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";

export default function Adminmain () {
  return (
    <>
      <Topbar />
      <Sidebar />
      <main className="w-full pt-10 lg:pt-5 px-4 sm:px-6 md:px-8 lg:ps-[19rem]  ">
        <Outlet />
      </main>
    </>
  );
};