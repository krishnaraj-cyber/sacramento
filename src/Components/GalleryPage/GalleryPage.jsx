import React, { useCallback, useEffect, useState } from 'react'
import Gallerys from '../../Shared/Components/Gallerys/Gallerys'
import { getallGallerys, getGalleryByStatus } from '../../Admin/shared/services/apigallery/apigallery';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import AboutUs from '../../Shared/Components/About/AboutUs';
import moment from 'moment-timezone';
function GalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchGallery = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getGalleryByStatus();
      const response = res.resdata;
      const images = response?.filter((item) => item.Image);
      const uniqueImage = images.filter(
        (item, index, self) =>
          index ===
          self.findIndex(
            (t) => moment(t.Year).format('YYYY') === moment(item.Year).format('YYYY')
          )
      );
      setGallery(uniqueImage);
    } catch (error) {
      console.error("Error fetching gallery:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  useEffect(() => {
    fetchGallery();
  }, [fetchGallery]);
  return (
    <>
      <AboutUs title="GALLERY" />
      <Gallerys isLoading={isLoading} gallery={gallery} />
      <SponsorSwiper />
    </>
  )
}
export default GalleryPage
