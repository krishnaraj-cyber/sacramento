import React, { useCallback, useEffect, useState } from 'react'
import Gallerys from '../../Shared/Components/Gallerys/Gallerys'
import { getallGallerys } from '../../Admin/shared/services/apigallery/apigallery';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import AboutUs from '../../Shared/Components/About/AboutUs';
import moment from 'moment-timezone';
function GalleryPage() {

  const [gallery, setGallery] = useState([]);
  const [years, setYears] = useState([]);
  const [groupedData, setGroupedData] = useState({});

  const fetchGallery = useCallback(async () => {
    const res = await getallGallerys(); 
    var response = res.resdata;
    var images = response?.filter(item => item.Image);  
    var uniqueImage = images.filter((item, index, self) => index === self.findIndex((t) => moment(t.Year).format('YYYY') === moment(item.Year).format('YYYY')) );
    setGallery(uniqueImage)
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
