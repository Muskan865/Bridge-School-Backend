import type { Request, Response, NextFunction } from "express";

type UserRole = "teacher" | "admin" | "observer";

export function requireRole(...requiredRoles: UserRole[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    if (!requiredRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `User role '${req.user.role}' does not have access to this resource`,
      });
      return;
    }

    next();
  };
}