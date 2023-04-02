import PostModel from '../models/Post.js'

class TagsController {
  async getLastTags(req, res) {
    try {
      const posts = await PostModel.find().limit(5).exec()
      const tags = posts
        .map((post) => post.tags)
        .flat()
        .slice(0, 5)

      res.status(200).send(tags)
    } catch (error) {
      res.status(500).send({
        message: 'Could not get tags',
      })
    }
  }
}

export default new TagsController()
