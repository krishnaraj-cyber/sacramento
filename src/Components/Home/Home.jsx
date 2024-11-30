import React, { useCallback, useEffect, useRef, useState } from 'react'
import HomePage from '../../Shared/Components/Home/HomePage'
import AboutSection from '../../Shared/Components/Home/AboutSection'
import Feedback from '../../Shared/Components/Home/Feedback'
import Gallery from '../../Shared/Components/Home/Gallery'
import Event from '../../Shared/Components/Home/Event'
import { getallSponsors } from '../../Admin/shared/services/apisponsor/apisponsor'
import { getallBoardmembers } from '../../Admin/shared/services/apiboardmembers/apiboardmembers'
import { getallGallerys } from '../../Admin/shared/services/apigallery/apigallery'
import { getallEvents } from '../../Admin/shared/services/apievent/apievent'

function Home() {
  const [sponsors, setSponsors] = useState([]);
  const [boardmem, setBoardmem] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [event, setEvent] = useState([]);
  const [activeStatus, setActiveStatus] = useState('$100');
  const [customAmount, setCustomAmount] = useState('');
  const customInputRef = useRef(null);
  const statuses = ['$10', '$25', '$50', '$100', '$250', 'Custom Amount'];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

  };
  const handleStatusClick = (status) => {
    if (status === 'Custom Amount') {
      setActiveStatus('Custom Amount');
    } else {
      setActiveStatus(status);
      setCustomAmount('');
    }
  };
  const handleCustomAmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setCustomAmount(value);
    }
  };
  useEffect(() => {
    if (activeStatus === 'Custom Amount') {
      customInputRef.current?.focus();
    }
  }, [activeStatus]);
  const fetchData = useCallback(async (apiCall, setter) => {
    let isMounted = true;
    setIsLoading(true);
    try {
      const response = await apiCall();
      if (isMounted) {
        setter(response.resdata);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => {
    fetchData(getallSponsors, setSponsors);
  }, [fetchData]);
  useEffect(() => {
    fetchData(getallBoardmembers, setBoardmem);
  }, [fetchData]);
  useEffect(() => {
    fetchData(getallGallerys, setGallery);
  }, [fetchData]);
  useEffect(() => {
    fetchData(getallEvents, setEvent);
  }, [fetchData]);

  return (
    <>
      <HomePage sponsors={sponsors} isLoading={isLoading} setSponsors={setSponsors} event={event} />
      <AboutSection isLoading={isLoading} boardmem={boardmem} />
      <Gallery gallery={gallery} isLoading={isLoading} />
      <Event event={event} isLoading={isLoading} />
      <Feedback isModalOpen={isModalOpen} event={event} setIsModalOpen={setIsModalOpen} formData={formData} handleSubmit={handleSubmit} handleInputChange={handleInputChange} activeStatus={activeStatus} customInputRef={customInputRef} handleStatusClick={handleStatusClick} handleCustomAmountChange={handleCustomAmountChange} customAmount={customAmount} setActiveStatus={setActiveStatus} statuses={statuses} />
    </>
  )
}
export default Home
