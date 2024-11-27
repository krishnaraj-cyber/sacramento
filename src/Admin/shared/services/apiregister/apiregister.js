import axios from "axios";
import apiurl from "../../../../Shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";


export const getallregister = async(params)=>{
   var res=await axios.get(`${apiurl()}/api/getallregisters`,{params:params , headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getuniquevaluebyfield = async(params)=>{
   var res=await axios.get(`${apiurl()}/api/getregisterbyid` ,{params:params , headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const saveRegisterForm=async(datas)=>{
   try {
      var res=await axios.post(`${apiurl()}/api/uploadregister`,datas
      // ,{ headers: {"Authorization" : `Bearer ${gettoken()}`}}
   );
      return res.data;
   }
   catch(err){
      console.log(err);
   }
}

export const updateregisters=async(datas)=>{
   var res=await axios.put(`${apiurl()}/api/editregister`,datas,{params:{id:datas?.id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/register/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const deleteregister=async(id)=>{
   var res=await axios.delete(`${apiurl()}/api/deleteregister`,{params:{id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
