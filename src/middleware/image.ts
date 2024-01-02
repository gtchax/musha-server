import { RequestHandler } from "express";
import multer from 'multer'
const sharp = require("sharp");
const fs = require("fs");

// Input and output file paths
const inputFile = "";
const outputFile = "";


export const convertImageToWebp: RequestHandler = async (req, res, next) => {
  sharp(inputFile)
    .webp({ quality: 100 })
    .toFile(outputFile, (err: any) => {
      if (err) {
        console.error(err);
      } else {
        next();
      }
    });
};



const storage = multer.memoryStorage()
export const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    }
})
