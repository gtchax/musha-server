import express from 'express'
import { upload } from '../middleware/image'
import { places } from '../controllers/place.controller'
const router = express.Router()



router.post('/', upload.array('images', 6), places)