import React, { useCallback, useEffect, useState } from 'react'
import Gallerys from '../../Shared/Components/Gallerys/Gallerys'
import SponsorSwiper from '../../shared/components/SponsorSwiper/SponsorSwiper'
import AboutUs from '../../shared/components/About/AboutUs'
import { getallGallerys } from '../../Admin/shared/services/apigallery/apigallery';
function GalleryPage() {

  const [gallery, setGallery] = useState([]); 

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

  
  return (
    <>
      <AboutUs title="GALLERY" />
      <Gallerys gallery={gallery} />
      <SponsorSwiper />
    </>
  )
}
export default GalleryPage
