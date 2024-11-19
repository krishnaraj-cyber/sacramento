import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";

export const getallGallerys = async(params)=>{
   var res=await axios.get(`${apiurl()}/api/getallgallery`,{params:params });
   return res.data;
}

export const getuniquevaluebyfield = async(params)=>{
   console.log(params)
   var res=await axios.get(`${apiurl()}/api/getgallerybyid`,{params:params});
   return res.data;
}

// export const saveGallerys=async(datas,onUploadProgress)=>{
//    try {
//       const formData = new FormData();
//       for (const key in datas) {
//          if(key== 'Image'){
//             for(let i = 0; i < datas['Image'].length; i++)
//                if (datas['Image'][i] instanceof File)
//                   formData.append(key, datas[key][i]);
//                else
//                   formData.append(key, datas[key]);
//          }
//          else{
//             formData.append(key, datas[key]);
//          }
//       }

//       var res=await axios.post(`${apiurl()}/api/uploadgallry`,formData,{ headers: {"Authorization" : `Bearer ${gettoken()}`},onUploadProgress});
//       return res.data;
//    }
//    catch(err){
//       console.log(err);
//    }
// }

export const saveGallerys = async (datas, onUploadProgress) => {
   try {
       const formData = new FormData();

       for (const key in datas) {
         console.log(`Key: ${key}, Value: `, datas[key]);
         if (key === 'Image') {
             datas[key].forEach(file => {
                 console.log('Appending file: ', file.name);
                 if (file instanceof File) {
                     formData.append('Image[]', file);
                 }
             });
         } else {
             formData.append(key, datas[key]);
         }
     }
     

       const res = await axios.post(
           `${apiurl()}/api/uploadgallery`,
           formData,
           {
               headers: { "Authorization": `Bearer ${gettoken()}` },
               onUploadProgress,
           }
       );

       return res.data;
   } catch (err) {
       console.error(err);
   }
};



// export const updateGallerys = async (datas) => {
//    const formData = new FormData();
//    for (const key in datas) {
//      if (key === "Image" && Array.isArray(datas[key])) {
//        datas[key].forEach((file) => formData.append(key, file));
//      } else {
//        formData.append(key, datas[key]);
//      }
//    }
 
//    try {
//      const res = await axios.post(`${apiurl()}/api/updategallery`, formData, {
//        params: { id: datas.id },
//        headers: { Authorization: `Bearer ${gettoken()}` },
//      });
//      return res.data;
//    } catch (error) {
//      throw new Error(error.response?.data?.error || "API request failed");
//    }
//  };

// export const updateGallerys = async (datas, onUploadProgress) => {
//   try {
//     const formData = new FormData();

//     for (const key in datas) {
//       console.log(`Key: ${key}, Value: `, datas[key]);
//       if (key === "Image") {
//         if (Array.isArray(datas[key])) {
//           datas[key].forEach((file) => {
//             console.log("Appending file: ", file.name || file);
//             if (file instanceof File) {
//               formData.append("Image[]", file); 
//             } else {
//               formData.append("ExistingImages[]", file); 
//             }
//           });
//         }
//       } else {
//         formData.append(key, datas[key]);
//       }
//     }

    
//     const res = await axios.post(
//       `${apiurl()}/api/updategallery`,
//       formData,
//       {
//         params: { id: datas.id }, 
//         headers: { Authorization: `Bearer ${gettoken()}` },
//         onUploadProgress, 
//       }
//     );

//     return res.data;
//   } catch (error) {
//     console.error(error);
//     throw new Error(error.response?.data?.error || "API request failed");
//   }
// };


export const updateGallerys = async (datas, onUploadProgress) => {
  try {
    const formData = new FormData();

    for (const key in datas) {
      console.log(`Key: ${key}, Value: `, datas[key]);
      if (key === "Image") {
        if (Array.isArray(datas[key])) {
          datas[key].forEach((file) => {
            console.log("Processing image: ", file);
            if (file instanceof File) {
              formData.append("Image[]", file); 
            } else {
              formData.append("ExistingImages[]", file); 
            }
          });
        } else if (datas[key]) {
          const image = datas[key];
          if (image instanceof File) {
            formData.append("Image[]", image);
          } else {
            formData.append("ExistingImages[]", image);
          }
        }
      } else {
        formData.append(key, datas[key]);
      }
    }
    const res = await axios.post(
      `${apiurl()}/api/updategallery`,
      formData,
      {
        params: { id: datas.id }, 
        headers: { Authorization: `Bearer ${gettoken()}` },
        onUploadProgress, 
      }
    );

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.error || "API request failed");
  }
};



export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/gallery/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const deleteGallerys=async(id)=>{
   var res=await axios.delete(`${apiurl()}/api/deletegallery`,{params:{id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
