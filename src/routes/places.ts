import express from "express";
import { upload } from "../middleware/image";
import { places } from "../controllers/place.controller";
import { verifyJWT } from "../middleware/verifyJWT";
import { validate } from "../middleware/validate";
import { placeSchema } from "../../utils/validationSchema";
const router = express.Router();

router.use(verifyJWT);
router.post("/", validate(placeSchema), upload.array("images", 6), places);
