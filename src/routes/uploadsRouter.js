import express from 'express'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { upload } from '../storage.js'

const router = express.Router()

router.post('/', authMiddleware, upload.single('image'), getImage)

function getImage(req, res) {
  res.send({
    url: `/uploads/${req.file.originalname}`,
  })
}

export default router
