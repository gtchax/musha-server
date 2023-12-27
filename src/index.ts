import express from "express";
import cors from "cors";
import "dotenv/config";
import "express-async-errors";
import { userRouter } from "./routes/users";
import { errorHandler, notFound } from "./middleware/error";

const app = express();
const PORT = process.env.PORT || 8090;

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRouter)
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server running on port ");
});
