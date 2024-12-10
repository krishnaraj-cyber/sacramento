import React, { useCallback, useEffect, useState } from "react";
import { getBoardmemByStatus, getUniqueYears } from "../../Admin/shared/services/apiboardmembers/apiboardmembers";
import Aboutt from "../../Shared/Components/About/Aboutt";
function About() {
  const [boardmem, setBoardmem] = useState([]);
  const [year, setYear] = useState([]);
  const [filteredBoardmem, setFilteredBoardmem] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let isMounted = true;
 
  const getYear = useCallback(async () => {
    setIsLoading(true);
    const response = await getUniqueYears();
    const uniqueBoardmemYear = response?.resdata.length > 1 ? response?.resdata.sort((a, b) => parseInt(b.Year) - parseInt(a.Year)) : response?.resdata ;
    setBoardmem(uniqueBoardmemYear);
    setYear(uniqueBoardmemYear[0].Year)
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (isMounted) {
      getYear();
    }
    return () => { isMounted = false;  };
  }, []);

  const handleTabClick = useCallback(async () => {
    setIsLoading(true);
    const response1 = await getBoardmemByStatus({ Year: year});
    setFilteredBoardmem(response1.resdata);
    setIsLoading(false);
  }, [year]);

  useEffect(() => {
    if (isMounted) {
      handleTabClick();
    }
    return () => { isMounted = false;  };
  }, [year]);

  return (
    <>
      <Aboutt
        isLoading={isLoading}
        boardmem={filteredBoardmem}
        uniqueBoardmemYear={boardmem}
        setYear={setYear}
        year={year}
      />
    </>
  );
}
export default About;
