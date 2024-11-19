import axios from "axios";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";
import { gettoken } from "../../../../shared/services/Token/token";


export const getallregister = async(params)=>{
   var res=await axios.get(`${apiurl()}/register/apigetallregistrations`,{params:params , headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getuniquevaluebyfield = async(params)=>{
   console.log(params)
   var res=await axios.get(`${apiurl()}/register/apigetuniquevaluebyfield` ,{params:params , headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const saveregister=async(datas)=>{
   try {
      var res=await axios.post(`${apiurl()}/register/apisaveregistration`,datas,{ headers: {"Authorization" : `Bearer ${gettoken()}`}});
      return res.data;
   }
   catch(err){
      console.log(err);
   }
}

export const updateregisters=async(datas)=>{
   var res=await axios.put(`${apiurl()}/register/apiupdateregistration`,datas,{params:{_id:datas?._id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const getFilterOptions = async(data)=>{
   var res=await axios.post(`${apiurl()}/register/getfilteroptions`,{field:data},{headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}

export const deleteregister=async(id)=>{
   var res=await axios.delete(`${apiurl()}/register/apideleteregistration`,{params:{_id:id}, headers: {"Authorization" : `Bearer ${gettoken()}`}});
   return res.data;
}
