export interface UserPayload {
  id: string;
  role: "teacher" | "admin" | "observer";
}

declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
      token?: string;
    }
  }
}