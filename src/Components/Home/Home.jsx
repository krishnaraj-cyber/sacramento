import React, { useCallback, useEffect, useRef, useState } from "react";
import HomePage from "../../Shared/Components/Home/HomePage";
import AboutSection from "../../Shared/Components/Home/AboutSection";
import Feedback from "../../Shared/Components/Home/Feedback";
import Gallery from "../../Shared/Components/Home/Gallery";
import Event from "../../Shared/Components/Home/Event";
import { getSponsorByStatus } from "../../Admin/shared/services/apisponsor/apisponsor";
import { getBoardmemByStatus } from "../../Admin/shared/services/apiboardmembers/apiboardmembers";
import { getallGallerys, getGalleryByStatus, } from "../../Admin/shared/services/apigallery/apigallery";
import { getEventByStatus } from "../../Admin/shared/services/apievent/apievent";
import { getWhatwedoByStatus } from "../../Admin/shared/services/Home/apiwhatwedo";

export default function Home() {
  const [sponsors, setSponsors] = useState([]);
  const [boardmem, setBoardmem] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState([]);
  const [about, setAbout] = useState([]);
  const [activeStatus, setActiveStatus] = useState("$100");
  const [customAmount, setCustomAmount] = useState("");
  const customInputRef = useRef(null);
  const statuses = ["$10", "$25", "$50", "$100", "$250", "Custom Amount"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });

  let isMounted = true;

  const fetchSponsors = useCallback(async () => {
  
      setIsLoading(true); 
        const response1 = await getSponsorByStatus(); 
          setSponsors(response1.resdata); 
        const response2 = await getBoardmemByStatus(); 
          setBoardmem(response2.resdata);
        const response3 = await getGalleryByStatus(); 
          setGallery(response3.resdata); 
        const response4 = await getEventByStatus(); 
          setEvent(response4.resdata);
        const response5 = await getWhatwedoByStatus(); 
          setAbout(response5.resdata);
      setIsLoading(false); 

      return () => {
        isMounted = false;
      };
    }, []);
    useEffect(() => {
      fetchSponsors();
    }, [fetchSponsors]); 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleStatusClick = (status) => {
    if (status === "Custom Amount") {
      setActiveStatus("Custom Amount");
    } else {
      setActiveStatus(status);
      setCustomAmount("");
    }
  };
  
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };

  

  return (
    <>
      <HomePage
        sponsors={sponsors}
        isLoading={isLoading}
        setSponsors={setSponsors}
        event={event}
      />
      <AboutSection about={about} isLoading={isLoading} boardmem={boardmem} />
      <Gallery gallery={gallery} isLoading={isLoading} />
      <Event event={event} isLoading={isLoading} />
      <Feedback
        isModalOpen={isModalOpen}
        event={event}
        setIsModalOpen={setIsModalOpen}
        formData={formData}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        activeStatus={activeStatus}
        customInputRef={customInputRef}
        handleStatusClick={handleStatusClick}
        handleCustomAmountChange={handleCustomAmountChange}
        customAmount={customAmount}
        setActiveStatus={setActiveStatus}
        statuses={statuses}
      />
    </>
  );
}
