import { validationResult } from 'express-validator'

export function validateMiddleware(req, res, next) {
  const { errors } = validationResult(req)

  if (errors.length > 0) {
    res.status(404).send(errors)

    return
  }

  next()
}
