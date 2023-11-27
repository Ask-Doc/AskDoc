import axios from "axios";
const API_URL = import.meta.env.VITE_BASEURL;

// create user profile
const createProfile = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}create/user/profile`,
    userData,
    config,
  );

  return response.data;
};

const getUserProfile = async (user, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}profile/get/${user}`, config);

  if (response.data) {
    localStorage.setItem("userData", JSON.stringify(response.data));
  }

  return response.data;
};

const editUserProfile = async (user, data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.patch(
    `${API_URL}profile/update/${user}`,
    data,
    config,
  );

  console.log(response);

  return response.data;
};

const authService = {
  createProfile,
  getUserProfile,
  editUserProfile,
};

export default authService;
