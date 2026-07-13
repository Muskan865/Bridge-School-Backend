import jwt from "jsonwebtoken";
import type { SignOptions, VerifyOptions } from "jsonwebtoken";
import process = require("process");
import type { UserPayload } from "../types/user.js";

const jwtSecret = process.env['JWT_SECRET'];
const jwtExpiry = (process.env['JWT_EXPIRY'] || "1h") as string;

export function generateToken(
  payload: UserPayload,
  options?: SignOptions,
): string {
  const defaultOptions: SignOptions = {
    expiresIn: jwtExpiry as any,
    ...options,
  };
  return jwt.sign(payload, jwtSecret!, defaultOptions);
}

export function verifyToken(
  token: string,
  options?: VerifyOptions,
): UserPayload {
  try {
    const decoded = jwt.verify(token, jwtSecret!, options);
    return decoded as UserPayload;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

