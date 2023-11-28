import axios  from "axios";

export const apiInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
})

