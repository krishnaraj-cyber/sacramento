import apiurl from "../apiendpoint/apiendpoint";
import axios from "axios";

export const sendFeedback = async(data)=>{
    var res = await axios.post(`${apiurl()}/api/sendfeedback`,data);
    return res.data;
 }