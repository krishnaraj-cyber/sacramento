import React, { useCallback, useEffect, useState } from 'react'
import FinancialSummary from '../../Shared/Components/FinancialSummary/FinancialSummary'
import AboutUs from '../../Shared/Components/About/AboutUs';
import SponsorSwiper from '../../Shared/Components/SponsorSwiper/SponsorSwiper';
import { getallFinancialsum } from '../../Admin/shared/services/apifinancialsummary/apifinancialsummary';

function FinancialPage() {
  const [data, setData] = useState([]);
  const [openYear, setOpenYear] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fetchSponsors = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    try {
      const response = await getallFinancialsum();
      if (isMounted) {
        const financialData = response.resdata;
        setData(financialData);
        if (financialData.length > 0) {
          const sortedYears = [...new Set(financialData.map(item => item.Year))].sort((a, b) => b - a);
          setOpenYear(sortedYears[0]);
        }
      }
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
  useEffect(() => { fetchSponsors(); }, [fetchSponsors]);
  const groupedData = data.reduce((acc, item) => {
    acc[item.Year] = acc[item.Year] || [];
    acc[item.Year].push(item);
    return acc;
  }, {});
  const toggleYear = (year) => {
    setOpenYear(openYear === year ? null : year);
  };
  return (
    <>
      <AboutUs title="FINANCIAL SUMMARY" />
      <FinancialSummary data={data} isLoading={isLoading} openYear={openYear} groupedData={groupedData} toggleYear={toggleYear} />
      <SponsorSwiper />
    </>
  )
}
export default FinancialPage
