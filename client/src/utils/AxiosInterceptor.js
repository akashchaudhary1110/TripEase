import axios from "axios";
import { BaseURL } from "../services/baseURL";



const API = axios.create({
    baseURL: `${BaseURL}`, 
});


API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle token expiration
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.log("Session expired. Redirecting to login...");
            localStorage.removeItem("authToken");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default API;
