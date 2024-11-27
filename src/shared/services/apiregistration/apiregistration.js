import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

export const geteventbyid = async(data)=>{
   var res = await axios.get(`${apiurl()}/api/geteventbyid`,{params:data});
   return res.data;
}