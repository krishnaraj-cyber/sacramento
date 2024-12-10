import axios from "axios";
import { gettoken } from "../../../../shared/services/Token/token";
import apiurl from "../../../../Shared/services/apiendpoint/apiendpoint";

export const getallMemberRegister = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getallregmems`, {
    params: params,
    headers: { Authorization: `Bearer ${gettoken()}` }
  });
  return res.data;
};

export const getMemberRegisterByStatus = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getregmembystatus`, {
    params: params,
  });
  return res.data;
};

export const getuniquevaluebyfield = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getregmembyid`, {
    params: params,
  });
  return res.data;
};

export const saveMemberRegister = async (datas, onUploadProgress) => {
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

    var res = await axios.post(`${apiurl()}/api/uploadregmem`, formData, {
    //   headers: { Authorization: `Bearer ${gettoken()}` },
      onUploadProgress,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

export const updateMemberRegister = async (datas) => {
  const formData = new FormData();
  for (const key in datas) {
    if (key === "Image" && Array.isArray(datas[key])) {
      datas[key].forEach((file) => formData.append(key, file));
    } else {
      formData.append(key, datas[key]);
    }
  }

  try {
    const res = await axios.post(`${apiurl()}/api/editregmem`, formData, {
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
    `${apiurl()}/api/getallfilterregmem?field=${data}`,
    {
      //  params:{ field: data },
     headers: {Authorization: `Bearer ${gettoken()}` } }
    
  );
  return res.data;
};


export const deleteMemberRegister = async (id) => {
  var res = await axios.delete(`${apiurl()}/api/deleteregmem?id=${id}`, {
    headers: { Authorization: `Bearer ${gettoken()}` },
  });
  return res.data;
};
