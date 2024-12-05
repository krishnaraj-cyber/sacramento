import axios from "axios";
import { gettoken } from "../../../../shared/services/Token/token";
import apiurl from "../../../../Shared/services/apiendpoint/apiendpoint";

export const getallWhatwedo = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getallwhatwedos`, {
    params: params,
    headers: { Authorization: `Bearer ${gettoken()}` }
  });
  return res.data;
};
export const getWhatwedoByStatus = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getwhatwedobystatus`, {
    params: params,
  });
  return res.data;
};

export const getuniquevaluebyfield = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getwhatwedosbyid`, {
    params: params,
  });
  return res.data;
};

export const saveWhatwedo = async (datas, onUploadProgress) => {
  try {
    const formData = new FormData();
    for (const key in datas) {
      if (key == "Image") {
        for (let i = 0; i < datas["Image"].length; i++)
          if (datas["Image"][i] instanceof File)
            formData.append(key, datas[key][i]);
          else formData.append(key, datas[key]);
      } else {
        formData.append(key, datas[key]);
      }
    }

    var res = await axios.post(`${apiurl()}/api/savewhatwedo`, formData, {
      headers: { Authorization: `Bearer ${gettoken()}` },
      onUploadProgress,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateWhatwedo = async (datas) => {
  const formData = new FormData();
  for (const key in datas) {
    if (key === "Image" && Array.isArray(datas[key])) {
      datas[key].forEach((file) => formData.append(key, file));
    } else {
      formData.append(key, datas[key]);
    }
  }

  try {
    const res = await axios.post(`${apiurl()}/api/editwhatwedo`, formData, {
      params: { id: datas.id },
      headers: { Authorization: `Bearer ${gettoken()}` },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "API request failed");
  }
};

export const getFilterOptions = async (data) => {
  var res = await axios.post(
    `${apiurl()}/api/getallfilterwhatwedo?field=${data}`,
    {
      //  params:{ field: data },
     headers: {Authorization: `Bearer ${gettoken()}` } }
    
  );
  return res.data;
};


export const deleteWhatwedo = async (id) => {
  var res = await axios.delete(`${apiurl()}/api/deletewhatwedo?id=${id}`, {
    headers: { Authorization: `Bearer ${gettoken()}` },
  });
  return res.data;
};
