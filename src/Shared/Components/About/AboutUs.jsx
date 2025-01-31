import React from "react";
function AboutUs({ title, Year }) {
  return (
    <>
      <section className=" bg-no-repeat   bg-cover bg-top   flex items-center justify-center  h-[20vh]  mt-10  " 
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('/assets/images/About/About-Board.png')`,
      }}>
        <div>
          <div className="concert-one-regular text-white font-bold md:text-6xl text-2xl">
            {title}
          </div>
          {Year && Year != 0 && (
            <div className="translate-y-4 text-center text-white font-semibold text-lg">
              Events of {Year.split('-')[0]}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default AboutUs;
