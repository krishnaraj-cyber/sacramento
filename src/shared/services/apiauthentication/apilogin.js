import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";
const apilogin = async(data)=>{
   var res = await axios.post(`${apiurl()}/api/login`,data);
   return res.data;
}

export { apilogin};