import React, { useRef, useState } from 'react'
import HomePage from '../../Shared/Components/Home/HomePage'
import AboutSection from '../../Shared/Components/Home/AboutSection'
import Feedback from '../../Shared/Components/Home/Feedback'
import Gallery from '../../Shared/Components/Home/Gallery'
import Event from '../../Shared/Components/Home/Event'
function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const mobilePreviousRef = useRef(null);
  const mobileNextstepRef = useRef(null);
  const mobilePrevRef = useRef(null);
  const mobileNextRef = useRef(null);
  const [activeStatus, setActiveStatus] = useState('$10');
  const statuses = ['$10', '$25', '$50', '$100', '$250', 'Custom Amount'];
  return (
    <>
      <HomePage prevRef={prevRef} nextRef={nextRef} />
      <AboutSection />
      <Gallery mobilePreviousRef={mobilePreviousRef} mobileNextstepRef={mobileNextstepRef} />
      <Event mobilePrevRef={mobilePrevRef} mobileNextRef={mobileNextRef} />
      <Feedback activeStatus={activeStatus} setActiveStatus={setActiveStatus} statuses={statuses} />
    </>
  )
}
export default Home
