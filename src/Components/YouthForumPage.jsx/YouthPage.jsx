import React, { useCallback, useEffect, useState } from "react";
import YouthForum from "../../Shared/Components/YouthForum/YouthForum";
import { getYouthByStatus } from "../../Admin/shared/services/apiyouthforum/apiyouthforum";
import SponsorSwiper from "../../Shared/Components/SponsorSwiper/SponsorSwiper";
import AboutUs from "../../Shared/Components/About/AboutUs";
function YouthPage() {
  const [forum, setForum] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let isMounted = true;

  const fetchYouthforum = useCallback(async () => {
    setIsLoading(true);
    const response = await getYouthByStatus();
    setForum(response.resdata);
    setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    fetchYouthforum();
  }, [fetchYouthforum]);
  
  return (
    <>
      <AboutUs title="YOUTH FORUM" />
      <YouthForum isLoading={isLoading} forum={forum} />
      <SponsorSwiper />
    </>
  );
}
export default YouthPage;
