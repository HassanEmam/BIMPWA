import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const backendURL = "https://bim.constology.com";

export const login = createAsyncThunk(
  "auth/login",

  async (
    loginData: { email: string; password: string },
    { rejectWithValue }
  ) => {
    const { data } = await axios.post(
      `${backendURL}/api/auth/login`,
      loginData
    );
    localStorage.setItem("authToken", data.Authorization);
    localStorage.setItem("id", data.Authorization);
    localStorage.setItem("userID", loginData.email);

    return data;
  }
);
