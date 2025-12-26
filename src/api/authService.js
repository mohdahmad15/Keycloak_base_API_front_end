import axios from "axios";
import axiosInstance from "./axiosConfig.js";
export const registerUser=(formdata)=>{
    return axiosInstance.post("/userApi/register",formdata)
};


export const loginUser = (loginData) => {
  return axiosInstance.post("/auth/login", loginData);
};
