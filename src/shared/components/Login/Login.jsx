import React from 'react'
import { Link } from 'react-router-dom';

export default function Login(props) {
    const { handlechange, handlelogin } = props;

    return (
        <section className="relative flex items-center justify-center overflow-hidden h-dvh">
            <div className="absolute top-20 right-20"> <img src="/images/design/icon.png" alt="" className="h-[200px]  " /></div>
            <div className="absolute bottom-20 right-20"> <img src="/images/design/store.png" alt="" className="h-[200px]  " /></div>
            <div className="absolute top-20 left-[8%]"> <img src="/images/design/mobile.png" alt="" className="h-[300px] " /></div>
            <div className="absolute bottom-8 left-[8%] hidden xl:block">  <img className="h-[300px] " src="/images/design/laptop.png" alt=""  /></div>
            <div className="max-w-[30rem] w-full px-4 md:px-6  mx-auto">
                <div className="grid grid-cols-1 px-2 mb-10 2xl:mb-0 ">
                    <div className="relative">
                        <div className="relative z-0 p-10 overflow-hidden border rounded-xl">
                            <div className="mb-10">
                                {/* <h1 className="text-2xl font-semibold text-secondary">Login In</h1> */}
                                <img src="/assets/Images/Logo/logoo.png" />
                            </div>
                            <form className="space-y-5" onSubmit={handlelogin}>
                                <div>
                                    <input type="text" onChange={handlechange} name="Username" id="Username" className="w-full px-4 py-3 border outline-none rounded-xl placeholder-slate-500" placeholder="Email" required/>
                                </div>
                                <div>
                                    <input type="password" onChange={handlechange} name="Password" id="Password" className="w-full px-4 py-3 border outline-none rounded-xl placeholder-slate-500" placeholder="Password" required/>
                                </div>
                                <div>
                                    <button type="submit" className="py-3 px-4  rounded-xl w-full bg-primary hover:bg-secondary text-white">
                                    Login In
                                    </button>
                                </div>
                            </form>
                            {/* <div className="h-32 w-32 bg-[#F64E4E] rounded-full absolute -top-14 -right-14"></div> */}
                        </div>
                        <div className="absolute top-20 -left-14"> <img src="/images/Rectangle 348.svg" alt="" className="h-[100px]" /></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
