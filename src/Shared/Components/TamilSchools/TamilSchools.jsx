import React from 'react';
const VideoGallery = (props) => {
    const { currentVideo, TamilSchool, handleVideoClick } = props;
    return (
        <div className="max-w-[70rem] mx-auto px-5 my-10 space-y-5 ">
            <div className="cursor-pointer">
                <video key={currentVideo.id} src={currentVideo.src} controls autoPlay className="w-full  rounded-lg shadow-lg" />
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                {TamilSchool.map((video) => (
                    <div key={video.id} className={`cursor-pointer     border  rounded-lg    ${currentVideo.id === video.id ? ' ' : 'border-gray-300'}`} onClick={() => handleVideoClick(video)}  >
                        <iframe className='w-full h-44 object-cover   rounded-tr-lg rounded-tl-lg ' height="720" src={video.src} title="STM October 2022 - பைந்தமிழ் வாசகர் வட்டம்"></iframe>
                        <p className=" p-3 text-center text-white concert-one-regular bg-gradient-to-l from-[#0571BC] to-[#E91E31] rounded-br-lg rounded-bl-lg"  >{video.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VideoGallery;
