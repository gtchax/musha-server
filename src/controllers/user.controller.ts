import { RequestHandler } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

export const signup: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(403).json({ error: "Email already in use" });

  const user = await User.create({ name, email, password });
  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
  res.cookie("jwt_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000, // 30 Days
  });

  res.send(201).json({message: 'Registered successfully'});
};

export const login: RequestHandler = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({
    email,
  });
  if (!user) return res.status(403).json({ error: "Email/Password mismatch" });

  const matched = await user.comparePassword(password);
  if (!matched)
    return res.status(403).json({ error: "Email/Password mismatch" });

  const accessToken = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  res.cookie("jwt_token", accessToken, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000, // 30 Days
  });

  return res.send(200).json({message: 'Logged in successfully'});
};
export const verifyToken: RequestHandler = async (req, res) => {
  const user = await User.findById(req.id);
  if (!user) throw new Error('Token not verified');
  return res.send(200).json({message: 'Token verified successfully'});
};
