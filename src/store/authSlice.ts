import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoggedUser {
  username: string;
  id: string;
  authToken: string;
  isLoggedIn?: boolean;
}

const initialState: LoggedUser = {
  username: "",
  id: "",
  authToken: "",
  isLoggedIn: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<LoggedUser>) => {
      console.log("Action", action.payload);
      state.isLoggedIn = true;
      state.username = action.payload.username;
      state.id = action.payload.id;
      state.authToken = action.payload.authToken;
    },
    logout: (state) => {
      state.username = "";
      state.id = "";
      state.authToken = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
