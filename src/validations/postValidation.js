import { body } from 'express-validator'

export const createValidation = [
  body('title', 'Title must be at least 3 characters')
    .isLength({ min: 3 })
    .isString(),
  body('text', 'Text must be at least 10 characters')
    .isLength({ min: 10 })
    .isString(),
  body('tags', 'Tags are not valid').optional().isArray(),
  body('imageUrl', 'Url is not valid').optional().isString(),
]

export const registerValidation = [
  body('email', 'Email is not valid').isEmail(),
  body('password', 'Password is too short').isLength({ min: 5 }),
  body('name', 'Too short').isLength({ min: 3 }),
  body('lastName', 'Too short').isLength({ min: 3 }),
  body('avatarUrl', 'Url is not valid').optional().isURL(),
]

export const commentValidation = [
  body('text', 'Comment should be at least 1 characters').isLength({
    min: 1,
  }),
  body('userName', 'User name is missing'),
]
