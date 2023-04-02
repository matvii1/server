import express from 'express'
import commentsController from '../controllers/commentsController.js'
import { authMiddleware } from '../middlewares/authMiddleWare.js'
import { validateMiddleware } from '../middlewares/validateMiddleware.js'
import { commentValidation } from '../validations/postValidation.js'

const router = express.Router()

router.get('/all', commentsController.getAll)
router.get('/last', commentsController.getLast)
router.get('/:postId', commentsController.getPostComments)
router.post(
  '/:postId',
  authMiddleware,
  commentValidation,
  validateMiddleware,
  commentsController.postOne
)
router.delete('/', authMiddleware, commentsController.deleteAll)

export default router
