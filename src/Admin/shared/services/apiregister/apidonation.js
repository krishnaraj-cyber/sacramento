import axios from "axios";
import { gettoken } from "../../../../shared/services/Token/token";
import apiurl from "../../../../Shared/services/apiendpoint/apiendpoint";


export const getallregister = async(params)=>{
   var res=await axios.get(`${apiurl()}/api/getallregisters`,{params:params , headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getfilterdonation = async(params)=>{  //act as get all
   var res=await axios.get(`${apiurl()}/api/getfilterdonation`,{params:params , headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}


export const getFilterOptions = async (data) => {      //act as dashboard filter
   var res = await axios.post(
     `${apiurl()}/api/getallfilterdonations?field=${data}`,
     {
       //  params:{ field: data },
      headers: {Authorization: `Bearer ${gettoken()}` } }
     
   );
   return res.data;
 };
 

export const deletedonation=async(id)=>{
   var res=await axios.delete(`${apiurl()}/api/deletedonation`,{params:{id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
