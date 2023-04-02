import CommentModel from '../models/Comment.js'
import PostModel from '../models/Post.js'

class PostController {
  async createPost(req, res) {
    try {
      const { title, text, imageUrl, tags } = req.body
      const userId = req.userId

      const doc = new PostModel({
        title,
        text,
        imageUrl,
        tags,
        userId,
      })

      const newPost = await doc.save()

      res.status(201).send(newPost)
    } catch (error) {
      res.status(500).send({
        message: 'Could not create post',
      })
    }
  }

  async getAll(req, res) {
    try {
      const posts = await PostModel.find().populate('userId').exec()

      res.status(200).send(posts)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get posts',
      })
    }
  }

  async getNew(req, res) {
    try {
      const newPosts = await PostModel.find()
        .sort({ createdAt: -1 })
        .populate('userId')
        .exec()

      res.status(200).send(newPosts)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get new posts',
      })
    }
  }

  async getPopular(req, res) {
    try {
      const popularPosts = await PostModel.find()
        .sort({
          viewsCount: 'desc',
        })
        .populate('userId')
        .exec()

      res.status(200).send(popularPosts)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get popular posts',
      })
    }
  }

  async getOne(req, res) {
    try {
      const { postId } = req.params

      const foundPost = await PostModel.findOneAndUpdate(
        {
          _id: postId,
        },
        {
          $inc: { viewsCount: 1 },
        },
        {
          returnDocument: 'after',
        }
      )
        .populate('userId')
        .exec()

      if (!foundPost) {
        res.status(500).send({
          message: 'Could not get post',
        })

        return
      }

      res.send(foundPost)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get post',
      })
    }
  }

  async updateOne(req, res) {
    try {
      const { title, text, imageUrl, tags } = req.body

      const { postId } = req.params

      const updatedPost = await PostModel.updateOne(
        {
          _id: postId,
        },
        {
          title,
          text,
          imageUrl,
          tags,
          userId: req.userId,
        }
      )

      res.status(200).send(updatedPost)
    } catch (error) {
      res.status(500).send({
        message: 'Could not update post',
      })
    }
  }

  async delete(req, res) {
    try {
      const { postId } = req.params

      await CommentModel.deleteMany({
        postId,
      })
      const deletedPost = await PostModel.findOneAndDelete({
        _id: postId,
      })

      if (!deletedPost) {
        res.status(404).send({
          message: 'Could not delete post',
        })

        return
      }

      res.status(200).send(deletedPost)
    } catch (error) {
      res.status(404).send({
        message: 'Could not delete post',
      })
    }
  }
}

export default new PostController()
