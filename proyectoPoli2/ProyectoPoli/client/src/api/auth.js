import {apiInstance} from "./axios.js";


export const registerRequest = (user) => apiInstance.post(`/register`, user);
export const loginRequest = (user) => apiInstance.post(`/login`, user);
export const logoutRequest = () => apiInstance.post(`/logout`);
export const verifyToken = () => apiInstance.get(`/verify`);
