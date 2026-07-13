import type { UserPayload } from "../types/user.js";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: UserPayload;
}