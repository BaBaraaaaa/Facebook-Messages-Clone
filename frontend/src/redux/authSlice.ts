import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { IUser } from "../types/user";
import { authService, type AuthResponse } from "../services/authService";

interface AuthState {
  user: IUser | null;
  token: string | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}
const initialState: AuthState = {
  user: null,
  token: null,
  status: "idle",
  error: null,
};

//Đăng nhập
export const login = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }) => {
    const { data } = await authService.login(payload);
    return data;
  }
);
//Đăng ký
export const registerDispatch = createAsyncThunk(
  "auth/register",
  async (payload: { name: string; email: string; password: string }) => {
    const { data } = await authService.register(payload);
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setUserFromStorage: (
      state,
      action: PayloadAction<{ user: IUser; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          localStorage.setItem("token", action.payload.token);
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Login failed";
      })
      .addCase(registerDispatch.pending, (s) => {
        s.status = "loading";
      })
      .addCase(
        registerDispatch.fulfilled,
        (state, action: PayloadAction<AuthResponse>) => {
          state.status = "idle";
          state.user = action.payload.user;
          state.token = action.payload.token;
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        }
      )
      .addCase(registerDispatch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Registration failed";
      });
  },
});

export const { logout, setUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
