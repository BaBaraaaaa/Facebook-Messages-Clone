import type { IUser } from "../types/user";
import axiosClient from "./axiosClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: IUser;
  token: string;
}

export const authService = {
  login: async (payload: LoginPayload) =>
    axiosClient.post<AuthResponse>("/auth/login", payload),

  register: async (payload: Partial<IUser> & { password: string }) =>
    axiosClient.post<AuthResponse>("/auth/register", payload),
  me: () => axiosClient.get<IUser>("/auth/me"),
};
