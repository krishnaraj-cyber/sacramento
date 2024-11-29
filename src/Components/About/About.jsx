import React, { useCallback, useEffect, useState } from 'react'
import { getallBoardmembers } from '../../Admin/shared/services/apiboardmembers/apiboardmembers';
import Aboutt from '../../Shared/Components/About/Aboutt';
function About() {

  const [boardmem, setBoardmem] = useState([]); 

  const fetchBoardmem = useCallback(async () => {
    let isMounted = true; 
    try {
      const response = await getallBoardmembers(); 
      if (isMounted) {  setBoardmem(response.resdata);  }
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
