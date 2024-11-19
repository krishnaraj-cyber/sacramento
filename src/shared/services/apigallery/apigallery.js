import axios from "axios";
import apiurl from "../apiendpoint/apiendpoint";

export const getallGallerys = async(Type,Year)=>{
    var res=await axios.get(`${apiurl()}/gallery/apigetallgallerys`,{params:{Type,Year}});
    return res.data;
 }