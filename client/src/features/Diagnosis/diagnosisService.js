import axios from "axios";
const API_URL = import.meta.env.VITE_BASEURL;

// start user diagnosis
const startDiagnosis = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}diagnosis/`, data, config);

  return response.data;
};

const authService = {
  startDiagnosis,
};

export default authService;
