import { configureStore } from "@reduxjs/toolkit";
import panelReducer from "./panel/panelSlice";
import userReducer from "./user/userSlice";

const store = configureStore({
  reducer: {
    panel: panelReducer,
    user: userReducer,
  },
});
export default store;
