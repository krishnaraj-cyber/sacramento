import React, { useCallback, useEffect, useRef, useState } from 'react'
import HomePage from '../../shared/components/Home/HomePage'
import AboutSection from '../../Shared/Components/Home/AboutSection'
import Feedback from '../../Shared/Components/Home/Feedback'
import Gallery from '../../Shared/Components/Home/Gallery'
import Event from '../../Shared/Components/Home/Event'
import { getallSponsors } from '../../Admin/shared/services/apisponsor/apisponsor'
import { getallBoardmembers } from '../../Admin/shared/services/apiboardmembers/apiboardmembers'
import { getallGallerys } from '../../Admin/shared/services/apigallery/apigallery'
import { getallEvents } from '../../Admin/shared/services/apievent/apievent'

function Home() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const mobilePreviousRef = useRef(null);
  const mobileNextstepRef = useRef(null);
  const mobilePrevRef = useRef(null);
  const mobileNextRef = useRef(null);
  const [activeStatus, setActiveStatus] = useState('$10');
  const statuses = ['$10', '$25', '$50', '$100', '$250', 'Custom Amount'];
  const [sponsors, setSponsors] = useState([]); 
  const [boardmem, setBoardmem] = useState([]); 
  const [gallery, setGallery] = useState([]); 
  const [event, setEvent] = useState([]); 




    
const fetchSponsors = useCallback(async () => {
      let isMounted = true; 
      try {
        const response = await getallSponsors(); 
        console.log(response)
        if (isMounted) {  setSponsors(response);  }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
      return () => {
        isMounted = false; 
      };
}, []);
useEffect(() => { fetchSponsors();}, [fetchSponsors]);

const fetchBoardmem = useCallback(async () => {
      let isMounted = true; 
      try {
        const response = await getallBoardmembers(); 
        console.log(response)
        if (isMounted) {  setBoardmem(response);  }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
      return () => {
        isMounted = false; 
      };
}, []);
    useEffect(() => { fetchBoardmem();}, [fetchBoardmem]);

    const fetchGallery = useCallback(async () => {
      let isMounted = true; 
      try {
        const response = await getallGallerys(); 
        console.log(response)
        if (isMounted) {  setGallery(response);  }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
      return () => {
        isMounted = false; 
      };
}, []);
    useEffect(() => { fetchGallery();}, [fetchGallery]);

    const fetchEvent = useCallback(async () => {
      let isMounted = true; 
      try {
        const response = await getallEvents(); 
        console.log(response)
        if (isMounted) {  setEvent(response);  }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
      return () => {
        isMounted = false; 
      };
}, []);
    useEffect(() => { fetchEvent();}, [fetchEvent]);

  return (
    <>
      <HomePage prevRef={prevRef} nextRef={nextRef} sponsors={sponsors} setSponsors={setSponsors} />
      <AboutSection boardmem={boardmem} />
      <Gallery mobilePreviousRef={mobilePreviousRef} mobileNextstepRef={mobileNextstepRef} gallery={gallery} />
      <Event mobilePrevRef={mobilePrevRef} mobileNextRef={mobileNextRef} event={event} />
      <Feedback activeStatus={activeStatus} setActiveStatus={setActiveStatus} statuses={statuses} />
    </>
  )
}
export default Home
