import express from "express";
import path from "path";
import cors from "cors";
import "dotenv/config";
import "express-async-errors";
import { userRouter } from "./routes/users";
import { errorHandler, notFound } from "./middleware/error";
import connectDB from "./config/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});
connectDB();
const app = express();
const PORT = process.env.PORT || 8090;

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use("/api/v1/users", userRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
