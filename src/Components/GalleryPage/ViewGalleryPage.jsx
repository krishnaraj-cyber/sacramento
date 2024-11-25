import React, { useCallback, useEffect, useState } from 'react'
import { getallGallerys, getuniquevaluebyyear } from '../../Admin/shared/services/apigallery/apigallery';
import ViewGallery from '../../Shared/Components/Gallerys/ViewGallery';
import { useParams } from 'react-router-dom';
import AboutUs from '../../Shared/Components/About/AboutUs';
import GalleryModel from '../../Shared/Components/Gallerys/GalleryModel';

export default function ViewGalleryPage() {
    const [Visible, setVisible] = useState(false);
    const [ModelData, setModelData] = useState({});
  
    const [Images, setImages]=useState([]);
    var param = useParams()
    console.log(param.Year)
  
    let isMounted = true;
  
    const getallevent = useCallback(async ()=>{
      const res= await getuniquevaluebyyear(param.Year);
      console.log(res)
      var images = res?.filter(item => item.Image);  
      setImages(images)
      console.log(images)
    },[param.Year]);
  
    useEffect(()=>{
      if(isMounted){
        getallevent();
      }
      return(()=>isMounted = false);
    },[getallevent])
  
  
    const OpenModel = (data)=>{
      setModelData(data);
      setVisible(true)
    }
    console.log(ModelData)
  return (
    <>
    <AboutUs title="GALLERY" Year={param.Year} />
     <ViewGallery Images={Images} OpenModel={OpenModel} />
     {Visible && <GalleryModel ModelData={ModelData} setVisible={setVisible} Visible={Visible} />}
    </>
  )
}

