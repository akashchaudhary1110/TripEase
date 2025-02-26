
import axios from "axios";
import { BaseURL } from "./baseURL";

// Fetch API URL from environment variables
const API_URL = `${BaseURL}/api/auth`;

export const loginfunction = async (formData) => { // Corrected parameter destructuring
  try {
    console.log("login api ", API_URL);
    console.log("login api ", formData);

    const response = await axios.post(`${API_URL}/login`, formData);
    console.log(response, "response of the login api");
    
    return response;
  } catch (error) {
    return error;
  }
};


export const signUpFunction = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response;
    } catch (error) {
      return error;
    }
  };
