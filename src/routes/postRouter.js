import express from 'express'
import {
  default as postController,
  default as PostController,
} from '../controllers/postController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { validateMiddleware } from '../middlewares/validateMiddleware.js'
import { createValidation } from '../validations/postValidation.js'

const router = express.Router()

router.get('/', PostController.getAll)
router.get('/new', postController.getNew)
router.get('/popular', postController.getPopular)
router.get('/:postId', PostController.getOne)

router.post(
  '/',
  authMiddleware,
  createValidation,
  validateMiddleware,
  PostController.createPost
)
router.delete('/:postId', authMiddleware, PostController.delete)
router.patch(
  '/:postId',
  authMiddleware,
  createValidation,
  validateMiddleware,
  PostController.updateOne
)

export default router
