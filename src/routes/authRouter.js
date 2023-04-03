import express from 'express'
import authController from './src/controllers/authController.js'
import { authMiddleware } from './src/middlewares/authMiddleWare.js'
import { validateMiddleware } from './src/middlewares/validateMiddleware.js'
import { registerValidation } from './src/validations/postValidation.js'

const router = express.Router()

router.post(
  '/register',
  registerValidation,
  validateMiddleware,
  authController.register
)
router.post('/login', authController.login)
router.get('/me', authMiddleware, authController.getInfo)

export default router
