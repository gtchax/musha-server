import { RequestHandler } from "express";
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
