'use strict'

import httpErrors from 'http-errors'

function notFound(req, res, next) {
  const error = new httpErrors.NotFound(`Not Found - ${req.originalUrl}`)
  next(error)
}

// eslint-disable-next-line no-unused-vars
function errorHandler(error, req, res, next) {
  error?.statusCode ? res.status(error.statusCode) : res.status(500)

  res.json({
    error: error.message,
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  })
}

export { notFound, errorHandler }
