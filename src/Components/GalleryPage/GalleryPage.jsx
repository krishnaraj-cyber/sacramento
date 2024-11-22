import React, { useCallback, useEffect, useState } from 'react'
import Gallerys from '../../Shared/Components/Gallerys/Gallerys'
import { getallGallerys } from '../../Admin/shared/services/apigallery/apigallery';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import AboutUs from '../../Shared/Components/About/AboutUs';
function GalleryPage() {

  const [gallery, setGallery] = useState([]);
  const [years, setYears] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  const fetchGallery = useCallback(async () => {
    const response = await getallGallerys();
    if (response?.length > 0) {
      // Extract unique years, sorted in descending order
      const sortedYears = [...new Set(response.map((item) => item.Year.split('-')[0]))].sort((a, b) => b - a);
      setYears(sortedYears);

      // Group data by year and then by event name
      const groupedByYear = sortedYears.reduce((acc, year) => {
        const eventsInYear = response.filter((item) => item.Year.startsWith(year));
        acc[year] = eventsInYear.reduce((events, item) => {
          events[item.EventName] = events[item.EventName] || [];
          events[item.EventName].push(item);
          return events;
        }, {});
        return acc;
      }, {});
      setGroupedData(groupedByYear);
    }
  }, []);

  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);

  
  return (
    <>
      <AboutUs title="GALLERY" />
      <Gallerys gallery={gallery} />
      <SponsorSwiper />
    </>
  )
}
export default GalleryPage
