import type { IUser } from "../types/user";
import axiosClient from "./axiosClient";

export interface LoginPayload {
  email: string;
  password: string;
}

export const authService = {
  login: async (payload: LoginPayload) =>
    axiosClient.post<{ user: IUser; token: string }>("/auth/login", payload),

    register: async (payload: Partial<IUser> & { password: string }) =>
      axiosClient.post<{ user: IUser; token: string }>("/auth/register", payload),
    me: () => axiosClient.get<IUser>("/auth/me"),
};
