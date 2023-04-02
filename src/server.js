import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import {
  authRouter,
  commentsRouter,
  postRouter,
  uploadsRouter,
} from './routes/index.js'
import tagsRouter from './routes/tagsRouter.js'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4444

app.use(express.json())
startServer()

app.use(cors())

app.use(tagsRouter)
app.use('/uploads', express.static('uploads'))
app.use('/uploads', uploadsRouter)
app.use('/auth', authRouter)
app.use('/posts', postRouter)
app.use('/comments', commentsRouter)

async function startServer() {
  try {
    await mongoose.connect(process.env.MONGODB_URI)

    app.listen(PORT, (err) => {
      if (err) {
        return
      }

      console.log(`running on http://localhost:${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}
