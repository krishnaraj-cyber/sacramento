import React, { useState } from 'react'
import TamilSchools from '../../Shared/Components/TamilSchools/TamilSchools'
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper'
import AboutUs from '../../Shared/Components/About/AboutUs'
import { TamilSchool } from '../../../public/assets/Json/Tamilschool';
function TamilSchoolPage() {
  const [currentVideo, setCurrentVideo] = useState(TamilSchool[0]);
  const handleVideoClick = (video) => {
    setCurrentVideo(video);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <AboutUs title="TAMIL SCHOOLS" />
      <TamilSchools currentVideo={currentVideo} handleVideoClick={handleVideoClick} TamilSchool={TamilSchool} />
      <SponsorSwiper />
    </>
  )
}
export default TamilSchoolPage
