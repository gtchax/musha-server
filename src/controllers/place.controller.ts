import { RequestHandler } from "express";
import Place from "../models/place";
import cloudinary from "cloudinary";

export const places: RequestHandler = async (req, res) => {
  const imageFiles = req.files as Express.Multer.File[];
  const newPlace = req.body;
  const upload = imageFiles.map(async (img) => {
    const base64 = Buffer.from(img.buffer).toString("base64");
    let dataURI = `data:${img.mimetype};base64${base64}`;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url
  });

  const imageUrls = await Promise.all(upload)
};
