import axios from "axios";

const API_URL = "http://localhost:5117/api/Libro";

export const getLibros = async () => {

  const response = await axios.get(API_URL);

  return response.data;
};

export const addLibro = async (libro) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    API_URL,
    libro,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};