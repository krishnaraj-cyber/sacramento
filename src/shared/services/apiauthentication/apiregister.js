import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

const apisendotp = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apisendotp`,data);
   return res.data;
}

const apiverifyotp = async(data)=>{
   var res = await axios.put(`${apiurl()}/api/apiverifyotp`,data);
   return res.data;
}

const apisendotpforgotpassword = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apisentotpforgotPassword`,data);
   return res.data;
}

const apiverifyotpforgotpassword = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/apiverifyforgotPasswordotp`,data);
   return res.data;
}

const apiupdatepassword = async(data)=>{
   var res = await axios.put(`${apiurl()}/api/apiupdateforgotPassword`,data);
   return res.data;
}
export {apisendotp, apiverifyotp,apisendotpforgotpassword,apiverifyotpforgotpassword, apiupdatepassword };