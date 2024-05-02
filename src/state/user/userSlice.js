import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../service/user";
import { downloadFile, getChats } from "../../service/chat";

const initialState = {
  currentUser: {
    email: "",
    contacts: [],
    profileImageUrl: "",
    about: "",
    name: "",
  },
  selectedUser: {
    name: "",
    email: "",
    lastSeen: "",
    profileImageUrl: "",
    chats: [],
  },
  other: {
    chatWindowLoading: false,
  },
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    updateChats: (state, action) => {
      state.selectedUser.chats = [
        ...state.selectedUser.chats,
        ...action.payload,
      ];
    },
    setOther: (state, action) => {
      state.other = action.payload;
    },
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateLastSeen.fulfilled, (state, action) => {
      state.selectedUser.lastSeen = action.payload;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.selectedUser.chats = action.payload;
    });
  },
});
export const updateLastSeen = createAsyncThunk(
  "updateLastSeen",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let lastSeen = state.user.selectedUser.lastSeen;
      if (state.user.selectedUser.email) {
        console.log(state.user.selectedUser.email);
        const result = await getUser({ email: state.user.selectedUser.email });
        lastSeen = result.lastSeen;
      }
      return lastSeen;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchChats = createAsyncThunk(
  "fetchChats",
  async (currentUserEmail, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      let chats = state.user.selectedUser.chats;
      if (currentUserEmail && state.user.selectedUser.email) {
        const resultChats = await getChats({
          from: currentUserEmail,
          to: state.user.selectedUser.email,
        });
        const newChat = [];
        for (const chat of resultChats) {
          if (chat.type !== "text" && chat.type !== "date") {
            const result = await downloadFile(chat.message);
            newChat.push({
              ...chat,
              message: result,
            });
          } else {
            newChat.push(chat);
          }
        }
        chats = newChat;
      }
      return chats;
    } catch (error) {
      console.log(error);
    }
  }
);
export const {
  setCurrentUser,
  setSelectedUser,
  resetUser,
  updateChats,
  setOther,
} = userSlice.actions;
export default userSlice.reducer;
