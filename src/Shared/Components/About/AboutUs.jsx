import React from "react";
function AboutUs({ title, Year }) {
  return (
    <>
      <section className="bg-[url('/assets/images/About/About-Board.png')]   bg-no-repeat   bg-cover   flex items-center justify-center  h-[20vh]  mt-10  ">
        <div>
          <div className="concert-one-regular text-white font-bold md:text-6xl text-2xl">
            {title}
          </div>
          {Year && Year != 0 && (
            <div className="translate-y-4 text-center text-white font-semibold text-lg">
              Events of {Year}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
export default AboutUs;
