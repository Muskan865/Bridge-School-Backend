import type { UserPayload } from "../types/user.js";
import { generateToken, verifyToken } from "../utils/jwt.service.js";
import type { LoginCredentials, AuthResponse } from "../schemas/auth.schema.js";

export function login(
  credentials: LoginCredentials,
  user: UserPayload,
): AuthResponse {
  if (!credentials.email || !credentials.password) {
    throw new Error("Email and password are required");
  }

  // do: Validate credentials

  const token = generateToken(user);

  return {
    token,
    user,
  };
}

export function verifyAuth(token: string): UserPayload {
  if (!token) {
    throw new Error("Token is required");
  }

  try {
    const user = verifyToken(token);
    return user;
  } catch (error) {
    throw new Error("Authentication failed: Invalid or expired token");
  }
}

export function extractToken(authHeader?: string): string | null {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(" ");
  if (parts.length !== 2 || parts[0]?.toLowerCase() !== "bearer") {
    return null;
  }

  return parts[1] ?? null;
}

export function refreshToken(user: UserPayload): string {
  return generateToken(user);
}
