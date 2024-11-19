import React, { useCallback, useEffect, useState } from 'react'
import YouthForum from '../../Shared/Components/YouthForum/YouthForum'
import SponsorSwiper from '../../shared/components/SponsorSwiper/SponsorSwiper'
import { getallYouthForum } from '../../Admin/shared/services/apiyouthforum/apiyouthforum';
import AboutUs from '../../shared/components/About/AboutUs';
function YouthPage() {

    const [forum, setForum] = useState([]); 




    
const fetchYouthforum = useCallback(async () => {
      let isMounted = true; 
      try {
        const response = await getallYouthForum(); 
        console.log(response)
        if (isMounted) {  setForum(response);  }
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      }
      return () => {
        isMounted = false; 
      };
}, []);
useEffect(() => { fetchYouthforum();}, [fetchYouthforum]);

    return (
        <>
            <AboutUs title="YOUTH FORUM" />
            <YouthForum forum={forum} />
            <SponsorSwiper />
        </>
    )
}
export default YouthPage
