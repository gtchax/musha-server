import express from 'express'
import { signupSchema } from '../../utils/validationSchema'
import { validate } from '../middleware/validate'
import { signup, login } from '../controllers/user.controller'

const router = express.Router()



router.post('/signup', validate(signupSchema), signup)
router.post('/login', login)


export {router as userRouter}