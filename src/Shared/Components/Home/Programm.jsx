import React from 'react';
function Programm({ EventProgram }) {
    return (
        <div>
            {EventProgram.map((item, index) => (
                <div key={index} className="flex flex-wrap md:flex-nowrap  items-center gap-5">
                    <img src={item.imgSrc} />
                    <div className='space-y-5'>
                        <p className=" concert-one-regular md:text-xl text-base text-[#0470BC]">UPCOMING EVENT</p>
                        <p className="md:text-2xl text-lg text-[#E91E31] font-semibold">சாக்ரமெண்டோ தமிழ் மன்றம்</p>
                        <p className="text-[#0470BC] font-semibold">நடத்தும்</p>
                        <p className=" text-stroke-white  text-blue-50 md:text-3xl text-xl">முதலாம் ஆண்டு
                            விளையாட்டு போட்டி</p>
                        <p className="font-bold text-[#E91E31] ">GAMES-CARROM, CHESS <span className='text-[#0470BC]'> &</span> TABLE TENNIS</p>
                        <p className="concert-one-regular text-[#0470BC]">Registration Deadline: <span className='text-[#E91E31]'> 23-11-24</span></p>
                        <div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export default Programm;
