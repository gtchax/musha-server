import { RequestHandler } from "express";
import User from "../models/user";
import multer from 'multer'

const storage = multer.memoryStorage()
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})
export const places: RequestHandler = async (req, res) => {
  const { email, password, name } = req.body;

  const oldUser = await User.findOne({ email });
  if (oldUser) return res.status(403).json({ error: "Email already in use" });

  const user = await User.create({ name, email, password });


  res.send(201).json({message: 'Registered successfully'});
};