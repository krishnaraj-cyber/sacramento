import React, { useCallback, useEffect, useState } from 'react'
import { getBoardmemByStatus } from '../../Admin/shared/services/apiboardmembers/apiboardmembers';
import Aboutt from '../../Shared/Components/About/Aboutt';
function About() {
  const [boardmem, setBoardmem] = useState([]);
  const[isLoading , setIsLoading] = useState(false);
  const fetchBoardmem = useCallback(async () => {
    let isMounted = true;
    setIsLoading(true);
    try {
      const response = await getBoardmemByStatus();
      if (isMounted) { setBoardmem(response.resdata); }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    } finally{
      if(isMounted){
        setIsLoading(false);
      }
    }
    return () => {
      isMounted = false;
    };
  }, []);
  useEffect(() => { fetchBoardmem(); }, [fetchBoardmem]);

  return (
    <>
      <Aboutt isLoading={isLoading} boardmem={boardmem} />
    </>
  )
}
export default About
