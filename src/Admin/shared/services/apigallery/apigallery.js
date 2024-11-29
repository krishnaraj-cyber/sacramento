import axios from "axios";
import { gettoken } from "../../../../shared/services/Token/token";
import apiurl from "../../../../shared/services/apiendpoint/apiendpoint";

export const getallGallerys = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getallgallery`, {
    params: params,
  });
  return res.data;
};

export const getuniquevaluebyfield = async (params) => {
  var res = await axios.get(`${apiurl()}/api/getgallerybyid`, {
    params: params,
  });
  return res.data;
};

export const getuniquevaluebyyear = async (Year) => {
  var res = await axios.get(`${apiurl()}/api/getgallerybyyear`, {
    params: {Year},
  });
  return res.data;
};

export const saveGallerys = async (datas, onUploadProgress) => {
  try {
    const formData = new FormData();

    for (const key in datas) {
      if (key === "Image") {
        datas[key].forEach((file) => {
          if (file instanceof File) {
            formData.append("Image[]", file);
          }
        });
      } else {
        formData.append(key, datas[key]);
      }
    }

    const res = await axios.post(`${apiurl()}/api/uploadgallery`, formData, {
      headers: { Authorization: `Bearer ${gettoken()}` },
      onUploadProgress,
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const updateGallerys = async (datas, onUploadProgress) => {
  try {
    const formData = new FormData();

    for (const key in datas) {
      if (key === "Image") {
        if (Array.isArray(datas[key])) {
          datas[key].forEach((file) => {
            if (file instanceof File) {
              formData.append("Image[]", file);
            } else {
              formData.append("ExistingImages[]", file);
            }
          });
        } else if (datas[key]) {
          const image = datas[key];
          if (image instanceof File) {
            formData.append("Image[]", image);
          } else {
            formData.append("ExistingImages[]", image);
          }
        }
      } else {
        formData.append(key, datas[key]);
      }
    }
    const res = await axios.post(`${apiurl()}/api/updategallery`, formData, {
      params: { id: datas.id },
      headers: { Authorization: `Bearer ${gettoken()}` },
      onUploadProgress,
    });

    return res.data;
  } catch (error) {
    console.error(error);
    throw new Error(error.response?.data?.error || "API request failed");
  }
};

export const getFilterOptions = async (data) => {
  var res = await axios.post(
    `${apiurl()}/api/getallfiltergallery?field=${data}`,
    {
      //  params:{ field: data },
     headers: {Authorization: `Bearer ${gettoken()}` } }
    
  );
  return res.data;
};


export const deleteGallerys = async (id) => {
  var res = await axios.delete(`${apiurl()}/api/deletegallery`, {
    params: { id: id },
    headers: { Authorization: `Bearer ${gettoken()}` },
  });
  return res.data;
};
