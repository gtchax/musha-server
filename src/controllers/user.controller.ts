import { RequestHandler } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";


export const signup: RequestHandler = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) return res.status(403).json({ error: "Email/Password mismatch" });

  const matched = await user.comparePassword(password);
  if (!matched)
    return res.status(403).json({ error: "Email/Password mismatch" });

  const accessToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: "0.5h",
  });

  res
    .cookie("jwt_token", accessToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 1000, // 30 Days
    })

    return res.sendStatus(201)
};
