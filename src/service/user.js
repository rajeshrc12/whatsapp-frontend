import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const addUser = async ({ email, name, profileImageUrl }) => {
  try {
    const response = await axios.post(`${serverUrl}/user`, {
      email,
      name,
      profileImageUrl,
    });
    // console.log("src/service/user/(addUser)", response);
  } catch (error) {
    console.log("error src/service/user/(addUser)", error);
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${serverUrl}/users`);
    // console.log("src/service/user/(getAllUsers)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(getAllUsers)", error);
  }
};

export const getUser = async ({ email }) => {
  try {
    const response = await axios.get(`${serverUrl}/user/${email}`);
    // console.log("src/service/user/(getUser)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(getUser)", error);
  }
};

export const setOpenProfile = async ({ email, openProfile }) => {
  try {
    const response = await axios.post(`${serverUrl}/openprofile`, {
      email,
      openProfile,
    });
    // console.log("src/service/user/(setOpenProfile)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(setOpenProfile)", error);
  }
};

export const logoutUser = async ({ email }) => {
  try {
    const response = await axios.get(`${serverUrl}/logoutuser/${email}`);
    // console.log("src/service/user/(logoutUser)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(logoutUser)", error);
  }
};

export const updateUser = async ({ email, key, value }) => {
  try {
    const response = await axios.patch(`${serverUrl}/user`, {
      email,
      key,
      value,
    });
    // console.log("src/service/user/(updateuser)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(updateuser)", error);
  }
};

export const updateUserPhoto = async ({ email, photo }) => {
  try {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append(
      "userData",
      JSON.stringify({
        email,
      })
    );
    const response = await axios.post(`${serverUrl}/userphoto`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // console.log("src/service/user/(updateuser)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(updateuser)", error);
  }
};

export const deleteUserPhoto = async ({ email }) => {
  try {
    const response = await axios.delete(`${serverUrl}/userphoto/${email}`);
    // console.log("src/service/user/(updateuser)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/user/(updateuser)", error);
  }
};
