import express from 'express'
import tagsController from '../controllers/tagsController.js'

const router = express.Router()

router.get('/posts/tags', tagsController.getLastTags)

export default router
