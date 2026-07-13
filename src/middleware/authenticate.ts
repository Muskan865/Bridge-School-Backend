import type { Request, Response, NextFunction } from "express";
import { verifyAuth, extractToken } from "../services/auth.service.js";


export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  try {
    const authHeader = req.headers.authorization;
    const token = extractToken(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Missing or invalid Authorization header",
      });
      return;
    }

    const user = verifyAuth(token);
    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error instanceof Error ? error.message : "Authentication failed",
    });
  }
}
