import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'

class CommentsController {
  async postOne(req, res) {
    try {
      const { text } = req.body
      const userId = req.userId
      const { postId } = req.params

      await PostModel.findByIdAndUpdate(postId, {
        $inc: { commentsCount: 1 },
      })

      const doc = await CommentModel.create({
        text,
        userId,
        postId,
      })

      const comment = await doc.save()

      res.status(201).send(comment)
    } catch (error) {
      res.status(500).send({
        message: 'Could not post a comment',
      })
    }
  }

  async getPostComments(req, res) {
    try {
      const { postId } = req.params

      const comments = await CommentModel.find({
        postId: postId,
      })
        .populate('userId')
        .exec()

      res.status(200).send(comments)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get comments',
      })
    }
  }

  async getAll(req, res) {
    try {
      const comments = await CommentModel.find().populate('userId').exec()

      res.status(200).send(comments)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get comments',
      })
    }
  }

  async getLast(req, res) {
    try {
      const comments = await CommentModel.find()
        .populate('userId')
        .limit(5)
        .exec()

      res.status(200).send(comments)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get last comments',
      })
    }
  }

  async deleteAll(req, res) {
    try {
      await CommentModel.deleteMany()
      res.status(200).send({
        message: 'deleted',
      })
    } catch (error) {
      res.status(500).send({
        message: 'Could not delete',
      })
    }
  }
}

export default new CommentsController()
