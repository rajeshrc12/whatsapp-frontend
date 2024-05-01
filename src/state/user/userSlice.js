import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUser } from "../../service/user";

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
    resetUser: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(updateLastSeen.fulfilled, (state, action) => {
      state.selectedUser.lastSeen = action.payload;
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
export const { setCurrentUser, setSelectedUser, resetUser, updateChats } =
  userSlice.actions;
export default userSlice.reducer;
