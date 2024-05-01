import axios from "axios";
const serverUrl = import.meta.env.VITE_SERVER_URL;

export const sendChats = async (chat) => {
  try {
    const response = await axios.post(`${serverUrl}/chat`, chat);
    // console.log("src/service/chat/(addUser)", response.data);
    return response.data.chats;
  } catch (error) {
    console.log("error src/service/chat/(addUser)", error);
  }
};

export const getChats = async ({ from, to }) => {
  try {
    const response = await axios.get(`${serverUrl}/chat/${from}/${to}`);
    // console.log("src/service/chat/(getChats)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/chat/(getChats)", error);
  }
};

export const getContacts = async (email) => {
  try {
    const response = await axios.get(`${serverUrl}/contact/${email}`);
    // console.log("src/service/chat/(getContacts)", response.data);
    return response.data;
  } catch (error) {
    console.log("error src/service/chat/(getContacts)", error);
  }
};

export const readChats = async ({ from, to }) => {
  try {
    const response = await axios.patch(`${serverUrl}/chat`, {
      from,
      to,
    });
    // console.log("src/service/chat/(readChats)", response.data);
    return response.data.chats;
  } catch (error) {
    console.log("error src/service/chat/(readChats)", error);
  }
};
