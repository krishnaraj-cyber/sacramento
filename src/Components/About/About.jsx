import React, { useCallback, useEffect, useState } from 'react'
import Aboutt from '../../shared/components/About/Aboutt'
import { getallBoardmembers } from '../../Admin/shared/services/apiboardmembers/apiboardmembers';
function About() {

  const [boardmem, setBoardmem] = useState([]); 

  const fetchBoardmem = useCallback(async () => {
    let isMounted = true; 
    try {
      const response = await getallBoardmembers(); 
      console.log(response)
      if (isMounted) {  setBoardmem(response);  }
    } catch (error) {
      console.error('Error fetching sponsors:', error);
    }
    return () => {
      isMounted = false; 
    };
}, []);
  useEffect(() => { fetchBoardmem();}, [fetchBoardmem]);

  return (
    <>
      <Aboutt boardmem={boardmem} />
    </>
  )
}
export default About
