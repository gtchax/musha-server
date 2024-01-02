import { RequestHandler } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { ObjectId } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      id: ObjectId;
    }
  }
}

export const verifyJWT: RequestHandler = async (req, res, next) => {
  const token = req.cookies["jwt_token"];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  const payload = verify(token, process.env.JWT_SECRET as string) as JwtPayload;
  if (!payload) res.status(401).json({ message: "Unauthorized" });
  req.id = payload.id;
  next()
};
