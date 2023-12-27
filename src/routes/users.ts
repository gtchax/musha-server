import express from 'express'
import { signupSchema } from '../../utils/validationSchema'
import { validate } from '../middleware/validate'
import { signup, login, verifyToken } from '../controllers/user.controller'
import { verifyJWT } from '../middleware/verifyJWT'

const router = express.Router()



router.post('/signup', validate(signupSchema), signup)
router.post('/login', login)
router.get('/verifyToken', verifyJWT, verifyToken)


export {router as userRouter}