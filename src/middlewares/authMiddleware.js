import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export function authMiddleware(req, res, next) {
  const [, token] = (req.headers['authorization'] || '').split(' ')

  if (!token) {
    res.status(403).send({
      message: 'No access',
    })

    return
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)

    req.userId = decodedToken._id
    next()
  } catch (error) {
    res.status(403).send({
      message: 'No access',
    })

    return
  }

  return
}
