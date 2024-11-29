import React, { useCallback, useEffect, useState } from 'react'
import YouthForum from '../../Shared/Components/YouthForum/YouthForum'
import { getallYouthForum } from '../../Admin/shared/services/apiyouthforum/apiyouthforum';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import AboutUs from '../../Shared/Components/About/AboutUs';
function YouthPage() {

  const [forum, setForum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchYouthforum = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    try {
      const response = await getallYouthForum();
      if (isMounted) { setForum(response.resdata); }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => { fetchYouthforum(); }, [fetchYouthforum]);

  return (
    <>
      <AboutUs title="YOUTH FORUM" />
      <YouthForum isLoading={isLoading} forum={forum} />
      <SponsorSwiper />
    </>
  )
}
export default YouthPage
