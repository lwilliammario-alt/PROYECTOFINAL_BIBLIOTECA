import axios from "axios";

const API_URL = "http://localhost:5117/api/Auth/login";

export const login = async (data) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};