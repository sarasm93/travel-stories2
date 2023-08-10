import axios from "axios";

axios.defaults.baseURL = "https://travel-stories-api2-af9d4146e908.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();