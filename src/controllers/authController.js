import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'
dotenv.config()

class AuthController {
  async register(req, res) {
    try {
      const { password, email } = req.body

      const existingEmail = await User.findOne({ email })

      if (existingEmail) {
        res.status(500)
        res.send({ message: 'User with this email already exists' })

        return
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      const doc = await User.create({
        ...req.body,
        password: hashedPassword,
      })

      const user = await doc.save()

      const token = jwt.sign(
        {
          _id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      )

      const {
        password: { _ },
        ...userData
      } = user._doc

      res.status(201).send({
        userData,
        token,
      })
    } catch (error) {
      res.status(500)
      res.send({ message: error.message })
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      const foundUser = await User.findOne({ email })

      if (!foundUser) {
        res.status(404).send({
          message: 'User not found',
        })

        return
      }

      const isMatch = await bcrypt.compare(password, foundUser.password)

      if (!isMatch) {
        res.status(404).send({
          message: 'Password do not match',
        })

        return
      }

      const token = jwt.sign(
        {
          _id: foundUser._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '30d',
        }
      )

      const {
        password: { _ },
        ...userData
      } = foundUser._doc

      res.status(200).send({
        userData,
        token,
      })
    } catch (error) {
      res.status(500)
      res.send({ message: 'Failed to log in' })
    }
  }

  async getInfo(req, res) {
    try {
      const user = await User.findById(req.userId)

      if (!user) {
        return res.status(400).send({
          message: 'User not found',
        })
      }

      const {
        password: { _ },
        ...userData
      } = user._doc

      res.status(200).send({ userData })
    } catch (error) {
      res.status(500)
      res.send({ message: 'Error' })
    }
  }
}

export default new AuthController()
