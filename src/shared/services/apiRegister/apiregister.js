import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

export const saveregister = async(data)=>{
   var res = await axios.post(`${apiurl()}/register/apisaveregistration`,data);
   return res.data;
}

export const addSubscription = async(data)=>{
   var res = await axios.post(`${apiurl()}/register/addsubscription`,data);
   return res.data;
}

export const getRegisterStatusbyid = async(id,data)=>{
   var res = await axios.get(`${apiurl()}/register/getregisterstatusbyid`,{params:{data:data,id:id}});
   return res.data;
}

export const FreeRegisterion = async(data)=>{
   var res = await axios.post(`${apiurl()}/register/apifreeregisterion`,{data:data});
   return res.data;
}